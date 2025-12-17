import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { MatchService } from "./matches.service";
import { Match } from "./match.type";
import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@UseGuards(GqlAuthGuard)
@Resolver(() => Match)
export class MatchesResolver {
  constructor(private readonly matchService: MatchService) {}

  /* ======================
     DANH SÁCH MATCH (TAB MATCH)
  ====================== */
  @Query(() => [Match])
  myMatches(@CurrentUser() user) {
    return this.matchService.getMyMatches(user.id);
  }

  /* ======================
     CHECK 2 USER MATCH CHƯA
  ====================== */
  @Query(() => Boolean)
  isMatched(
    @CurrentUser() user,
    @Args("otherUserId") otherUserId: string,
  ) {
    return this.matchService.isMatched(user.id, otherUserId);
  }

  /* ======================
     BLOCK / UNMATCH
  ====================== */
  @Mutation(() => Match)
  blockMatch(
    @CurrentUser() user,
    @Args("matchId") matchId: string,
  ) {
    return this.matchService.blockMatch(matchId, user.id);
  }
}
