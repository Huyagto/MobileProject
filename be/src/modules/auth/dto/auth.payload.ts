import { ObjectType, Field } from "@nestjs/graphql";
import { UserType } from "@/modules/users/user.type";

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => UserType)
  user: UserType;
}
