import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.5:3000/graphql", // ⚠️ IP + PORT backend
  }),
  cache: new InMemoryCache(),
});

export default client;
