// src/profiles/models/profile.model.ts
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ProfilePhoto } from "./profile-photo.model";
import { Location } from "./location.model";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

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

  @Field(() => Location, { nullable: true })
  location?: Location;

  @Field(() => [ProfilePhoto])
  photos: ProfilePhoto[];

  @Field(() => Int)
  photoCount: number;

  @Field(() => Int)
  age: number;

  @Field()
  isActive: boolean;

  @Field()
  isVerified: boolean;

  @Field()
  lastActive: Date;

  @Field()
  hasPremium: boolean;

  @Field({ nullable: true })
  premiumUntil?: Date;

  @Field(() => Int)
  popularityScore: number;

  @Field({ nullable: true })
  distance?: number;
}