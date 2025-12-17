import { InputType, Field, Float } from "@nestjs/graphql";

/* ======================
   LOCATION INPUT
====================== */
@InputType()
export class LocationInput {
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
  birthday: string; // ISO string

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field(() => [String], { nullable: true })
  preferenceGender?: string[];

  @Field(() => [String])
  photos: string[]; // 🔥 URL ảnh (bắt buộc)

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;
}
