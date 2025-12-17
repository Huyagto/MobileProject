import { ObjectType, Field, ID } from "@nestjs/graphql";
import { UserType } from "@/modules/users/user.type";

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field(() => [UserType])
  users: UserType[];

  @Field()
  isBlocked: boolean;

  @Field()
  createdAt: Date;
}
