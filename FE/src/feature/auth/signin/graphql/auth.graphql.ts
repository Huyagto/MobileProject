import { gql } from "@apollo/client";

/* ===== SEND OTP (DÙNG CHUNG) ===== */
export const SEND_OTP = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      userExists
    }
  }
`;


/* ===== VERIFY OTP LOGIN ===== */
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
