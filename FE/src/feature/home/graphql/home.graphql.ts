import { gql } from "@apollo/client";

export const GET_NEARBY_PROFILES = gql`
  query NearbyProfiles($distance: Int) {
    nearbyProfiles(distance: $distance) {
      userId
      name
      gender
      birthday
      distance
      location {
        coordinates
      }
    }
  }
`;
