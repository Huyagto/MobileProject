import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });
  }

  async setOtp(phone: string, otp: string) {
    await this.redis.set(`otp:${phone}`, otp, 'EX', 300); // 5 phút
  }

  async getOtp(phone: string) {
    return this.redis.get(`otp:${phone}`);
  }

  async deleteOtp(phone: string) {
    await this.redis.del(`otp:${phone}`);
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
