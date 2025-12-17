import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Match, MatchSchema } from "./matches.schema";
import { MatchService } from "./matches.service";
import { MatchesResolver } from "./matches.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
    ]),
  ],
  providers: [MatchService, MatchesResolver],
  exports: [
    MatchService,
    MongooseModule, // 🔥 BẮT BUỘC
  ],
})
export class MatchesModule {}
