// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy'; // Import JwtStrategy
import { UsersModule } from '../users/user.module';
import { ProfileModule } from '../profile/profile.module';
import { RedisModule } from '@/infra/redis/redis.module';
import { CloudinaryModule } from '@/common/cloud/cloudinary.module';

@Module({
  imports: [
    // Passport Module
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // JWT Module
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'DEV_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
    
    // Other modules
    UsersModule,
    ProfileModule,
    RedisModule,
    CloudinaryModule,
  ],
  providers: [
    AuthService, 
    AuthResolver, 
    JwtStrategy, // Thêm JwtStrategy vào providers
  ],
  exports: [AuthService],
})
export class AuthModule {}