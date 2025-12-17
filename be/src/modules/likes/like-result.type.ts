// src/modules/likes/like-result.type.ts
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class LikeResult {
  @Field()
  matched: boolean;

  @Field(() => ID, { nullable: true })
  matchId?: string;
}
