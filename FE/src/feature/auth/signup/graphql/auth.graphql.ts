import { gql } from "@apollo/client";

export const SEND_OTP = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($phone: String!, $otp: String!) {
    verifyOtp(phone: $phone, otp: $otp) {
      signupToken
    }
  }
`;
export const SUBMIT_ONBOARDING = gql`
  mutation SubmitOnboarding($input: OnboardingInput!) {
    submitOnboarding(input: $input) {
      id
    }
  }
`;
