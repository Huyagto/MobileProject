import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";

import { ChatModule } from "./modules/chat/chat.module";
import { LikesModule } from "./modules/likes/likes.module";
import { MatchesModule } from "./modules/matches/matches.module";
import { PubSubModule } from "./common/pubsub/pubsub.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UploadModule } from "../uploads/upload.module";

@Module({
  imports: [
    AuthModule,
    UploadModule,
    PubSubModule,

    MongooseModule.forRoot(
      "mongodb://127.0.0.1:27017/dating-app",
    ),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      subscriptions: {
        "graphql-ws": true,
      },
      context: ({ req, connectionParams }) => {
        if (connectionParams?.authorization) {
          return {
            req: {
              headers: {
                authorization: connectionParams.authorization,
              },
            },
          };
        }
        return { req };
      },
    }),

    ChatModule,
    LikesModule,
    MatchesModule,
  ],
})
export class AppModule {}
