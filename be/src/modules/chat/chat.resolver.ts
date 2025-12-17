import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ChatService } from "./chat.service";
import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

import { Conversation } from "./conversation.type";
import { Message } from "./message.type";

@UseGuards(GqlAuthGuard)
@Resolver()
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query(() => [Conversation])
  myConversations(@CurrentUser() user) {
    return this.chatService.getMyConversations(user.id);
  }

  @Mutation(() => Conversation)
  getOrCreateConversation(
    @CurrentUser() user,
    @Args("otherUserId") otherUserId: string,
  ) {
    return this.chatService.getOrCreateConversation(
      user.id,
      otherUserId,
    );
  }

  @Query(() => [Message])
  messages(@Args("conversationId") conversationId: string) {
    return this.chatService.getMessages(conversationId);
  }

  @Mutation(() => Message)
  sendMessage(
    @CurrentUser() user,
    @Args("conversationId") conversationId: string,
    @Args("content") content: string,
  ) {
    return this.chatService.sendMessage(
      conversationId,
      user.id,
      content,
    );
  }
}
