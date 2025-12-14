import { UsersModule } from '@/modules/users/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@/infra/redis/redis.module';
import { SmsModule } from '@/infra/sms/sms.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    RedisModule,        
    UsersModule,      
    SmsModule,  
    PassportModule,
    ProfileModule,
    JwtModule.register({
      secret: 'DEV_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, 
              AuthResolver,
              JwtStrategy]

})
export class AuthModule {}
