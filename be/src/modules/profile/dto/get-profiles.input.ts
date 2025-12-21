import { InputType, Field, Int, Float } from "@nestjs/graphql";

@InputType()
export class GetProfilesInput {
  @Field(() => Int, { defaultValue: 20 })
  limit: number;

  @Field(() => Float, { defaultValue: 50 })
  distance: number; // km

  @Field(() => Int, { nullable: true })
  minAge?: number;

  @Field(() => Int, { nullable: true })
  maxAge?: number;
  // Không có gender filter vì sẽ dùng preference của user
}