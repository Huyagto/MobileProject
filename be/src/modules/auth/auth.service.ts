import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "@/infra/redis/redis.service";
import { UserService } from "@/modules/users/user.service";
import { ProfileService } from "@/modules/profile/profile.service";
import { normalizePhone } from "@/utils/phone.util";
import { OnboardingInput } from "./dto/onboarding.input";
import { AuthPayload } from "./dto/auth.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  /* ===== SEND OTP (CHUNG) ===== */
 async sendOtp(phone: string): Promise<{ userExists: boolean }> {
  const normalized = normalizePhone(phone);

  const user = await this.userService.findByPhone(normalized);
  const userExists = !!user;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await this.redisService.setOtp(normalized, otp);

  console.log(`🔥 OTP ${normalized}: ${otp}`);

  return { userExists };
}


  /* ===== SIGNUP OTP ===== */
  async verifySignupOtp(phone: string, otp: string) {
    const normalized = normalizePhone(phone);

    const savedOtp = await this.redisService.getOtp(normalized);
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP invalid");
    }

    await this.redisService.deleteOtp(normalized);

    return {
      signupToken: this.jwtService.sign(
        { phone: normalized },
        { expiresIn: "15m" },
      ),
    };
  }

  /* ===== LOGIN OTP ===== */
  async verifyLoginOtp(phone: string, otp: string): Promise<AuthPayload> {
    const normalized = normalizePhone(phone);

    const savedOtp = await this.redisService.getOtp(normalized);
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP invalid");
    }

    await this.redisService.deleteOtp(normalized);

    const user = await this.userService.findByPhone(normalized);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const accessToken = this.jwtService.sign(
      { sub: user._id.toString(), phone: normalized },
      { expiresIn: "7d" },
    );

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        phone: user.phone,
      },
    };
  }

  /* ===== SUBMIT ONBOARDING ===== */
  async submitOnboarding(
    signupToken: string,
    input: OnboardingInput,
  ): Promise<AuthPayload> {
    const payload = this.jwtService.verify(signupToken);
    const phone = payload.phone;

    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create({ phone });
    }

    await this.profileService.createOrUpdate({
      userId: user._id,
      ...input,
    });

    const accessToken = this.jwtService.sign(
      { sub: user._id.toString(), phone },
      { expiresIn: "7d" },
    );

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        phone: user.phone,
      },
    };
  }
}
