// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/user.module';
import { ProfileModule } from '@/modules/profile/profile.module';

@Module({
  imports: [UsersModule, ProfileModule],
  exports: [UsersModule, ProfileModule],
})
export class SharedModule {}