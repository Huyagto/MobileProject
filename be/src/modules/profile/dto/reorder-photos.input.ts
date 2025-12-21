// src/profiles/dto/reorder-photos.input.ts
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ReorderPhotosInput {
  @Field(() => [String])
  photoPublicIds: string[];
}