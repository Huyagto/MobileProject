// src/profiles/profile.type.ts
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ProfilePhoto } from "./models/profile-photo.model";
import { Location } from "./models/location.model";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  // KHÔNG CÓ userId field ở đây
  // Thay vào đó có user field

  @Field()
  name: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field(() => [String], { nullable: true })
  preferenceGender?: string[];

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Location, { nullable: true })
  location?: Location;

  @Field(() => [ProfilePhoto], { nullable: true })
  photos?: ProfilePhoto[];

  @Field(() => Int, { defaultValue: 0 })
  photoCount: number;

  @Field({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  education?: string;

  @Field(() => [String], { nullable: true })
  languages?: string[];

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  distance?: number;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field()
  lastActive: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

// UserType sẽ được import và dùng trong resolver
// KHÔNG import ở đây để tránh circular dependency