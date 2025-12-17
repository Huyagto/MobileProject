import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LikesResolver } from "./likes.resolver";
import { LikeService } from "./likes.service";

import { Like, LikeSchema } from "./likes.schema";
import { Match, MatchSchema } from "@/modules/matches/matches.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Match.name, schema: MatchSchema },
    ]),
  ],
  providers: [LikesResolver, LikeService],
  exports: [LikeService],
})
export class LikesModule {}
