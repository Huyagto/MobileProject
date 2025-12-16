import { InputType, Field, Float } from "@nestjs/graphql";

/* ======================
   LOCATION INPUT
====================== */
@InputType()
export class LocationInput {
  @Field()
  type: "Point"; // "Point"

   @Field(() => [Float])
  coordinates: [number, number]; // [lng, lat]
}

/* ======================
   ONBOARDING INPUT
====================== */
@InputType()
export class OnboardingInput {
  @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  birthday: string;

  @Field(() => [String])
  interests: string[];

  @Field(() => [String])
  habit: string[];

  @Field(() => [String])
  preferenceGender: string[];

  @Field(() => LocationInput)
  location: LocationInput;
}
