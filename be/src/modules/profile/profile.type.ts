import { ObjectType, Field, ID, Float } from "@nestjs/graphql";

/* ======================
   LOCATION TYPE
====================== */
@ObjectType()
export class LocationType {
  @Field()
  type: string; // "Point"

  @Field(() => [Float])
  coordinates: number[]; // [lng, lat]
}

/* ======================
   PROFILE TYPE
====================== */
@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field(() => [String], { nullable: true })
  preferenceGender?: string[];

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field(() => [String], { nullable: true })
  photos?: string[];

  @Field({ nullable: true })
  bio?: string;

  @Field(() => LocationType, { nullable: true })
  location?: LocationType;

  @Field(() => Float, { nullable: true })
  distance?: number;
}
