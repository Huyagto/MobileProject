import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/infra/redis/redis.service';
import { SmsService } from '@/infra/sms/sms.service';
import { UserService } from '@/modules/users/user.service';
import { normalizePhone } from '@/utils/phone.util';
import { OnboardingInput } from './dto/onboarding.input';
import { AuthPayload } from './dto/auth.payload';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 📲 Gửi OTP
  async sendOtp(phone: string): Promise<boolean> {
    const normalized = normalizePhone(phone);
  console.log("🔥 sendOtp called with phone:", phone);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`🔥 DEV OTP for ${phone}: ${otp}`);
  await this.redisService.setOtp(normalized, otp);
  return true;
}
async verifyOtp(phone: string, otp: string) {
  const normalized = normalizePhone(phone);

  const savedOtp = await this.redisService.getOtp(normalized);
  if (!savedOtp || savedOtp !== otp) {
    throw new UnauthorizedException("OTP invalid");
  }

  await this.redisService.deleteOtp(normalized);

  return {
    signupToken: this.jwtService.sign(
      { phone: normalized },   // ✅ CHUẨN
      { expiresIn: "15m" }
    ),
  };
}
async submitOnboarding(
  signupToken: string,
  input: OnboardingInput,
): Promise<AuthPayload> {
  // 1️⃣ Verify signupToken
  const payload = this.jwtService.verify(signupToken);
  const phone = payload.phone;

  // 2️⃣ Find or create user
  let user = await this.userService.findByPhone(phone);
  if (!user) {
    user = await this.userService.create({ phone });
  }

  // 3️⃣ Create / update profile
  await this.profileService.createOrUpdate({
  userId: user._id,
  name: input.name,
  gender: input.gender,
  birthday: input.birthday,
  preferenceGender: input.preferenceGender,
  interests: input.interests,
  habit: input.habit,
  location: input.location, // 🔥 FIX QUAN TRỌNG NHẤT
});


  // 4️⃣ Create REAL access token
  const accessToken = this.jwtService.sign(
    {
      sub: user._id.toString(),
      phone,
    },
    { expiresIn: "7d" },
  );

  // 5️⃣ Return payload
  return {
  accessToken,
  user: {
    id: user._id.toString(),
    phone: user.phone,
  },
};
}


}

