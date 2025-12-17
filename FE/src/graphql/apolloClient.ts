import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { fromPromise } from "@apollo/client/link/utils";
import * as SecureStore from "expo-secure-store";

/* ======================
   HTTP LINK
====================== */
const httpLink = new HttpLink({
  uri: "https://panicled-chia-mustached.ngrok-free.dev/graphql",
});

/* ======================
   AUTH LINK (ACCESS TOKEN)
====================== */
const authLink = setContext(async (_, { headers }) => {
  const accessToken = await SecureStore.getItemAsync("access_token");

  return {
    headers: {
      ...headers,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`, // 🔥 PHẢI VIẾT HOA
      }),
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
   ERROR LINK (AUTO REFRESH)
====================== */
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const isUnauthenticated =
      graphQLErrors?.some(
        (err) =>
          err.extensions?.code === "UNAUTHENTICATED" &&
          operation.operationName !== "RefreshToken"
      ) ||
      (networkError as any)?.statusCode === 401;

    if (!isUnauthenticated) return;

    return fromPromise(
      SecureStore.getItemAsync("refresh_token")
    ).flatMap((refreshToken) => {
      // ❌ Không có refresh token → cho request fail
      if (!refreshToken) {
        return forward(operation);
      }

      // 🔁 Client riêng để refresh (KHÔNG dùng authLink)
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

            if (!newAccessToken) return null;

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

        // 🔥 GẮN TOKEN MỚI RỒI GỬI LẠI REQUEST
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        }));

        return forward(operation);
      });
    });
  }
);

/* ======================
   APOLLO CLIENT
====================== */
const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
