import { gql } from "@apollo/client";

/* ===== LOGIN: SEND OTP ===== */
export const SEND_LOGIN_OTP = gql`
  mutation SendLoginOtp($phone: String!) {
    sendLoginOtp(phone: $phone)
  }
`;

/* ===== LOGIN: VERIFY OTP ===== */
export const VERIFY_LOGIN_OTP = gql`
  mutation VerifyLoginOtp($phone: String!, $otp: String!) {
    verifyLoginOtp(phone: $phone, otp: $otp) {
      accessToken
      user {
        id
        phone
      }
    }
  }
`;
