// src/modules/users/user.type.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  phone: string;

  @Field({ nullable: true }) // Thêm nullable
  createdAt?: Date;

  @Field({ nullable: true }) // Thêm nullable
  updatedAt?: Date;
}