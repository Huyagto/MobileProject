import { Injectable } from '@nestjs/common';
import Twilio from 'twilio';

@Injectable()
export class SmsService {
  private client: ReturnType<typeof Twilio>;

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string,
    );
  }

  sendOtp(phone: string, otp: string) {
    return this.client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE as string,
      to: phone,
    });
  }
}
