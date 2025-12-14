import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OnboardingInput {
  @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  birthday: string;

  @Field()
  preferenceGender: string;

  @Field(() => [String])
  interests: string[];

  @Field()
  habit: string;
}
