import { gql } from "@apollo/client";

/* ======================
   SEND OTP (DÙNG CHUNG)
====================== */
export const SEND_OTP = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      userExists
    }
  }
`;


/* ======================
   SIGNUP – VERIFY OTP
====================== */
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
