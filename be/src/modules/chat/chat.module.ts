import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ChatService } from "./chat.service";
import { ChatResolver } from "./chat.resolver";
import { Conversation, ConversationSchema } from "./conversation.schema";
import { Message, MessageSchema } from "./message.schema";
import { MatchesModule } from "../matches/matches.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),

    MatchesModule, // 🔥 IMPORT VÀO ĐÂY
  ],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
