// src/profiles/models/profile-photo.model.ts
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class ProfilePhoto {
  @Field()
  url: string;

  @Field({ nullable: true })
  publicId?: string;

  @Field(() => Int)
  order: number;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field({ nullable: true })
  caption?: string;

  @Field()
  uploadedAt: Date;
}