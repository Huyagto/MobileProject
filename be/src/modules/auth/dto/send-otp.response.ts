import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SendOtpResponse {
  @Field()
  userExists: boolean;
}
