// src/modules/auth/dto/auth.payload.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '@/modules/users/user.type';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => UserType) // Sử dụng UserType thay vì tạo type mới
  user: UserType;
}