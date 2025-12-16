import { ObjectType, Field, ID } from "@nestjs/graphql";

/* ======================
   LOCATION TYPE
====================== */
@ObjectType()
export class LocationType {
  @Field()
  type: "Point"; // "Point"

  @Field(() => [Number])
  coordinates: number[]; // [lng, lat]
}

/* ======================
   PROFILE TYPE
====================== */
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

  // ✅ FIX: ARRAY
  @Field(() => [String], { nullable: true })
  preferenceGender?: string[];

  // ✅ FIX: ARRAY
  @Field(() => [String], { nullable: true })
  interests?: string[];

  // ✅ FIX: ARRAY
  @Field(() => [String], { nullable: true })
  habit?: string[];

  @Field({ nullable: true })
  bio?: string;

  // ✅ ADD LOCATION
  @Field(() => LocationType, { nullable: true })
  location?: LocationType;
}
