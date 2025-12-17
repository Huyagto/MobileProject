import { gql } from "@apollo/client";

export const GET_MY_MATCHES = gql`
  query MyMatches {
    myMatches {
      id
      users
      createdAt
    }
  }
`;
