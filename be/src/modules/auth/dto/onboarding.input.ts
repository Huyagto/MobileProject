// src/modules/auth/dto/onboarding.input.ts
import { UploadScalar } from "@/common/scalars/upload.scalar";
import { InputType, Field, Float } from "@nestjs/graphql";

// Interface cho FileUpload
export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

@InputType()
export class OnboardingInput {
  @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  birthday: string;

  @Field()
  preferenceGender: string;

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => [String], { nullable: true })
  habits?: string[];

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Float], { nullable: true })
  coordinates?: number[];

  // CHO MẢNG FILES
  @Field(() => [UploadScalar])
  photos: Promise<FileUpload>[];
}