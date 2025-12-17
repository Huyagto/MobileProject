import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
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

  /* ======================================================
     SIGNUP – SEND OTP
  ====================================================== */
  async sendSignupOtp(phone: string): Promise<boolean> {
    const normalized = normalizePhone(phone);

    const user = await this.userService.findByPhone(normalized);
    if (user) {
      throw new BadRequestException("PHONE_ALREADY_EXISTS");
    }

    const otp = this.generateOtp();
    await this.redisService.setOtp(`signup:${normalized}`, otp);

    console.log(`🔥 SIGNUP OTP ${normalized}: ${otp}`);
    return true;
  }

  /* ======================================================
     SIGNUP – VERIFY OTP
     → trả signupToken (15 phút)
  ====================================================== */
  async verifySignupOtp(phone: string, otp: string) {
    const normalized = normalizePhone(phone);

    const savedOtp = await this.redisService.getOtp(
      `signup:${normalized}`,
    );
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP_INVALID");
    }

    await this.redisService.deleteOtp(`signup:${normalized}`);

    return {
      signupToken: this.jwtService.sign(
        { phone: normalized, type: "signup" },
        { expiresIn: "15m" },
      ),
    };
  }

  /* ======================================================
     SUBMIT ONBOARDING
     → tạo user + profile
     → trả accessToken
  ====================================================== */
  async submitOnboarding(
    signupToken: string,
    onboardingData: OnboardingInput,
  ): Promise<AuthPayload> {
    let payload: { phone: string; type: string };

    try {
      payload = this.jwtService.verify(signupToken);
    } catch {
      throw new UnauthorizedException("SIGNUP_TOKEN_INVALID");
    }

    if (payload.type !== "signup") {
      throw new UnauthorizedException("INVALID_TOKEN_TYPE");
    }

    const phone = payload.phone;

    // 1️⃣ TẠO USER
    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create({ phone });
    }

    // 2️⃣ TẠO / UPDATE PROFILE
 await this.profileService.createOrUpdate({
  userId: user._id,
  name: onboardingData.name,
  gender: onboardingData.gender,
  birthday: onboardingData.birthday,
  preferenceGender: onboardingData.preferenceGender,
  interests: onboardingData.interests,
  habits: onboardingData.habits,
  photos: onboardingData.photos ?? [],
  location: onboardingData.location
    ? {
        type: "Point",
        coordinates: onboardingData.location.coordinates,
      }
    : undefined,
});



    // 3️⃣ LOGIN LUÔN
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

  /* ======================================================
     LOGIN – SEND OTP
  ====================================================== */
  async sendLoginOtp(phone: string): Promise<boolean> {
    const normalized = normalizePhone(phone);

    const user = await this.userService.findByPhone(normalized);
    if (!user) {
      throw new NotFoundException("USER_NOT_FOUND");
    }

    const otp = this.generateOtp();
    await this.redisService.setOtp(`login:${normalized}`, otp);

    console.log(`🔥 LOGIN OTP ${normalized}: ${otp}`);
    return true;
  }

  /* ======================================================
     LOGIN – VERIFY OTP
     → trả accessToken
  ====================================================== */
  async verifyLoginOtp(
    phone: string,
    otp: string,
  ): Promise<AuthPayload> {
    const normalized = normalizePhone(phone);

    const user = await this.userService.findByPhone(normalized);
    if (!user) {
      throw new NotFoundException("USER_NOT_FOUND");
    }

    const savedOtp = await this.redisService.getOtp(
      `login:${normalized}`,
    );
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP_INVALID");
    }

    await this.redisService.deleteOtp(`login:${normalized}`);

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

  /* ======================================================
     PRIVATE
  ====================================================== */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
