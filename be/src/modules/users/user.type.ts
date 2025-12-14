import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  phone: string;
}
