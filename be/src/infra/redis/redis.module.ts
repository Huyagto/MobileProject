import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService], // 👈 CỰC KỲ QUAN TRỌNG
})
export class RedisModule {}
