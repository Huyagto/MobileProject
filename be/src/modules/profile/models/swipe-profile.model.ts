// src/profiles/models/swipe-profile.model.ts
import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import { ProfilePhoto } from "./profile-photo.model";

@ObjectType()
export class SwipeProfile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [ProfilePhoto])
  photos: ProfilePhoto[];

  @Field(() => Float, { nullable: true })
  distance?: number; // km

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];
}