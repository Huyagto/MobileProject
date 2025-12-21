// src/modules/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth-response.type";
import { AuthPayload } from "./dto/auth.payload";
import { OnboardingInput } from "./dto/onboarding.input";
import { SendOtpResponse } from "./dto/send-otp.response";
import { UploadScalar } from "@/common/scalars/upload.scalar";

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  healthCheck() {
    return "OK";
  }

  /* ===== SEND OTP (CHECK USER EXISTS) ===== */
  @Mutation(() => SendOtpResponse)
  sendOtp(@Args("phone") phone: string) {
    return this.authService.sendOtp(phone);
  }

  /* ===== SIGNUP VERIFY OTP ===== */
  @Mutation(() => AuthResponse)
  verifySignupOtp(
    @Args("phone") phone: string,
    @Args("otp") otp: string,
  ) {
    return this.authService.verifySignupOtp(phone, otp);
  }

  /* ===== LOGIN VERIFY OTP ===== */
  @Mutation(() => AuthPayload)
  verifyLoginOtp(
    @Args("phone") phone: string,
    @Args("otp") otp: string,
  ) {
    return this.authService.verifyLoginOtp(phone, otp);
  }

  /* ===== SUBMIT ONBOARDING ===== */
  @Mutation(() => AuthPayload)
  async submitOnboarding(
    @Args("signupToken") signupToken: string,
    @Args("input") input: OnboardingInput,
  ) {
    return this.authService.submitOnboarding(signupToken, input);
  }

  /* ===== TEST UPLOAD (Optional) ===== */
  @Mutation(() => String)
  async testUpload(
    @Args({ name: 'file', type: () => UploadScalar }) file: Promise<FileUpload>,
  ) {
    const { filename, mimetype, encoding } = await file;
    return `File ${filename} uploaded successfully! Type: ${mimetype}, Encoding: ${encoding}`;
  }
}