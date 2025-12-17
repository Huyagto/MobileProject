import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Like {
  @Field(() => ID)
  id: string;

  @Field()
  fromUser: string;

  @Field()
  toUser: string;

  @Field()
  createdAt: Date;
}
