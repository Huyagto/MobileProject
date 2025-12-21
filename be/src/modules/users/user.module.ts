// src/modules/users/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
// TẠM BỎ UserResolver
// import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService], // Tạm bỏ UserResolver
  exports: [UserService],
})
export class UsersModule {}