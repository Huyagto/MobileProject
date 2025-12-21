// src/profiles/dto/upload-photo.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UploadPhotoInput {
  @Field({ nullable: true })
  caption?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}