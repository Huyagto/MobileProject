import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth-response.type";
import { AuthPayload } from "./dto/auth.payload";
import { OnboardingInput } from "./dto/onboarding.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  healthCheck() {
    return "OK";
  }

  /* ======================
     SEND OTP
  ====================== */
  @Mutation(() => Boolean)
  sendOtp(@Args("phone") phone: string) {
    return this.authService.sendOtp(phone);
  }

  /* ======================
     VERIFY OTP
     → trả signupToken
  ====================== */
  @Mutation(() => AuthResponse)
  verifyOtp(
    @Args("phone") phone: string,
    @Args("otp") otp: string,
  ) {
    return this.authService.verifyOtp(phone, otp);
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
    return this.authService.submitOnboarding(signupToken, input);
  }
}
