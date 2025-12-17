import { useQuery } from "@apollo/client";
import { GET_MY_MATCHES } from "../graphql/match.graphql";

export function useMyMatches() {
  const { data, loading, error, refetch } = useQuery(
    GET_MY_MATCHES,
    {
      fetchPolicy: "network-only",
    }
  );

  return {
    matches: data?.myMatches ?? [],
    loading,
    error,
    refetch,
  };
}
