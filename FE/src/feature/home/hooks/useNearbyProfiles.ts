import { useQuery } from "@apollo/client";
import { GET_NEARBY_PROFILES } from "../graphql/home.graphql";

export function useNearbyProfiles(distance = 2000000) {
  const { data, loading, error, refetch } = useQuery(
    GET_NEARBY_PROFILES,
    {
      variables: { distance },
      fetchPolicy: "network-only",
    }
  );

  return {
    profiles: data?.nearbyProfiles ?? [],
    loading,
    error,
    refetch,
  };
}
