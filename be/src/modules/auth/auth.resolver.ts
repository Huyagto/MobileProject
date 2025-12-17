import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth-response.type";
import { AuthPayload } from "./dto/auth.payload";
import { OnboardingInput } from "./dto/onboarding.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /* ======================
     HEALTH CHECK
  ====================== */
  @Query(() => String)
  healthCheck() {
    return "OK";
  }

  /* ======================
     SIGNUP – SEND OTP
  ====================== */
  @Mutation(() => Boolean)
  sendSignupOtp(
    @Args("phone") phone: string,
  ): Promise<boolean> {
    return this.authService.sendSignupOtp(phone);
  }

  /* ======================
     SIGNUP – VERIFY OTP
     → trả signupToken
  ====================== */
  @Mutation(() => AuthResponse)
  verifySignupOtp(
    @Args("phone") phone: string,
    @Args("otp") otp: string,
  ): Promise<AuthResponse> {
    return this.authService.verifySignupOtp(phone, otp);
  }

  /* ======================
     SUBMIT ONBOARDING
     → tạo user + profile
     → trả accessToken
  ====================== */
  @Mutation(() => AuthPayload)
  submitOnboarding(
    @Args("signupToken") signupToken: string,
    @Args("input") input: OnboardingInput,
  ): Promise<AuthPayload> {
    return this.authService.submitOnboarding(
      signupToken,
      input,
    );
  }

  /* ======================
     LOGIN – SEND OTP
  ====================== */
  @Mutation(() => Boolean)
  sendLoginOtp(
    @Args("phone") phone: string,
  ): Promise<boolean> {
    return this.authService.sendLoginOtp(phone);
  }

  /* ======================
     LOGIN – VERIFY OTP
     → trả accessToken
  ====================== */
  @Mutation(() => AuthPayload)
  verifyLoginOtp(
    @Args("phone") phone: string,
    @Args("otp") otp: string,
  ): Promise<AuthPayload> {
    return this.authService.verifyLoginOtp(phone, otp);
  }
}
