import { gql } from "@apollo/client";

/* ===== LIKE (SWIPE RIGHT) ===== */
export const LIKE_USER = gql`
  mutation LikeUser($toUserId: String!) {
    likeUser(toUserId: $toUserId)
  }
`;

/* ===== DISLIKE (SWIPE LEFT) ===== */
export const DISLIKE_USER = gql`
  mutation DislikeUser($toUserId: String!) {
    unlikeUser(toUserId: $toUserId)
  }
`;
