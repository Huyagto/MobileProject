import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  conversationId: string;

  @Field(() => ID)
  sender: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
}
