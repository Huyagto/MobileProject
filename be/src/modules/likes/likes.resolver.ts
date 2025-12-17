import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { LikeService } from "./likes.service";
import { LikeResult } from "./like-result.type";

import { GqlAuthGuard } from "@/common/guards/gql-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@UseGuards(GqlAuthGuard)
@Resolver()
export class LikesResolver {
  constructor(private readonly likeService: LikeService) {}

  /* ======================
     SWIPE RIGHT (LIKE)
     RETURN: { matched, matchId }
  ====================== */
  @Mutation(() => LikeResult)
  async likeUser(
    @CurrentUser() user: { id: string },
    @Args("toUserId") toUserId: string,
  ): Promise<LikeResult> {
    return this.likeService.likeUser(user.id, toUserId);
  }

  /* ======================
     SWIPE LEFT (DISLIKE)
     (hiện tại không lưu)
  ====================== */
  @Mutation(() => Boolean)
  async dislikeUser(
    @CurrentUser() user: { id: string },
    @Args("toUserId") toUserId: string,
  ): Promise<boolean> {
    return this.likeService.dislikeUser(user.id, toUserId);
  }
}
