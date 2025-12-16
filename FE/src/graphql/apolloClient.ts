import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import { gql } from "@apollo/client";
import { fromPromise } from "@apollo/client/link/utils";


/* ======================
   HTTP LINK
====================== */
const httpLink = new HttpLink({
  uri: "https://panicled-chia-mustached.ngrok-free.dev/graphql",
});

/* ======================
   AUTH LINK
====================== */
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("access_token");

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

/* ======================
   REFRESH TOKEN MUTATION
====================== */
const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

/* ======================
   ERROR LINK
====================== */

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const isUnauthenticated = graphQLErrors?.some(
    (e) =>
      e.extensions?.code === "UNAUTHENTICATED" &&
      operation.operationName !== "RefreshToken"
  );

  if (!isUnauthenticated) return;

  return fromPromise(
    SecureStore.getItemAsync("refresh_token")
  ).flatMap((refreshToken) => {
    // ❌ Chưa login → không refresh → cho request fail
    if (!refreshToken) {
      return forward(operation);
    }

    const refreshClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    return fromPromise(
      refreshClient
        .mutate({
          mutation: REFRESH_TOKEN,
          variables: { refreshToken },
        })
        .then(async (res) => {
          const newAccessToken =
            res.data?.refreshToken?.accessToken;
          const newRefreshToken =
            res.data?.refreshToken?.refreshToken;

          if (!newAccessToken) {
            return null;
          }

          await SecureStore.setItemAsync(
            "access_token",
            newAccessToken
          );
          await SecureStore.setItemAsync(
            "refresh_token",
            newRefreshToken
          );

          return newAccessToken;
        })
    ).flatMap((newAccessToken) => {
      if (!newAccessToken) {
        return forward(operation);
      }

      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${newAccessToken}`,
        },
      }));

      return forward(operation);
    });
  });
});




/* ======================
   APOLLO CLIENT
====================== */
const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
