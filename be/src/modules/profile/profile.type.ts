import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  preferenceGender?: string;

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field({ nullable: true })
  habit?: string;

  @Field({ nullable: true })
  bio?: string;
}
