import { useMutation } from "@apollo/client";
import { LIKE_USER } from "../graphql/swipe.graphql";

type LikeResult = {
  matched: boolean;
  matchId?: string;
};

export function useSwipeActions() {
  const [likeUser] = useMutation<{ likeUser: LikeResult }>(LIKE_USER);

  const swipeRight = async (toUserId: string) => {
    const res = await likeUser({
      variables: { toUserId },
    });

    const result = res.data?.likeUser;

    return result; // 🔥 TRẢ KẾT QUẢ CHO HOME
  };

  const swipeLeft = async (_toUserId: string) => {
    return;
  };

  return { swipeRight, swipeLeft };
}
