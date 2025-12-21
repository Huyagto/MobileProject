// src/modules/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileService } from './profile.service';
// TẠM BỎ ProfileResolver
import { ProfileResolver } from './profile.resolver';
import { CloudinaryModule } from '@/common/cloud/cloudinary.module';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
    ]),
    CloudinaryModule,
    UsersModule
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService],
})
export class ProfileModule {}