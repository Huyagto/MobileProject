// src/profiles/models/location.model.ts
import { ObjectType, Field, Float } from "@nestjs/graphql";

@ObjectType()
export class Location {
  @Field()
  type: "Point";

  @Field(() => [Float])
  coordinates: number[]; // [lng, lat]
}