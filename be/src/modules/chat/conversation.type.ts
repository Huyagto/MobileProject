import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  users: string[]; // [userA, userB]

  @Field({ nullable: true })
  lastMessage?: string;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
