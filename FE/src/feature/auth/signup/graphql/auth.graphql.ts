import { gql } from "@apollo/client";

/* ======================
   SEND OTP (DÙNG CHUNG)
====================== */
/* ===== SIGNUP: SEND OTP ===== */
export const SEND_SIGNUP_OTP = gql`
  mutation SendSignupOtp($phone: String!) {
    sendSignupOtp(phone: $phone)
  }
`;

/* ===== SIGNUP: VERIFY OTP ===== */
export const VERIFY_SIGNUP_OTP = gql`
  mutation VerifySignupOtp($phone: String!, $otp: String!) {
    verifySignupOtp(phone: $phone, otp: $otp) {
      signupToken
    }
  }
`;


/* ======================
   SUBMIT ONBOARDING
====================== */
export const SUBMIT_ONBOARDING = gql`
  mutation SubmitOnboarding(
    $signupToken: String!
    $input: OnboardingInput!
  ) {
    submitOnboarding(
      signupToken: $signupToken
      input: $input
    ) {
      accessToken
      user {
        id
        phone
      }
    }
  }
`;
