// src/profiles/dto/create-profile.input.ts
import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  birthday: Date;

  @Field(() => [String])
  preferenceGender: string[];

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Float])
  coordinates: number[]; // [lng, lat]
}