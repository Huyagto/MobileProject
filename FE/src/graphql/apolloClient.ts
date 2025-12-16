import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

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
  const token = await SecureStore.getItemAsync("access_token"); // ✅ ĐÚNG TOKEN

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // ✅ lowercase
    },
  };
});

/* ======================
   APOLLO CLIENT
====================== */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
