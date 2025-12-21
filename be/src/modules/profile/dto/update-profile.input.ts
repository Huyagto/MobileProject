// src/profiles/dto/update-profile.input.ts
import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  education?: string;

  @Field(() => [String], { nullable: true })
  languages?: string[];

  @Field(() => [Float], { nullable: true })
  coordinates?: number[];
}