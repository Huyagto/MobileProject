import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import {
  SEND_OTP,
  VERIFY_SIGNUP_OTP,
} from "../graphql/auth.graphql";

export function useSignup() {
  const [sendOtpMutation, sendState] =
    useMutation(SEND_OTP);

  const [verifyOtpMutation, verifyState] =
    useMutation(VERIFY_SIGNUP_OTP);

  // 📲 gửi OTP signup
  const sendOtp = async (phone: string) => {
    try {
      console.log("SEND SIGNUP OTP:", phone);

      const res = await sendOtpMutation({
        variables: { phone },
      });

      console.log("SEND SIGNUP OTP RES:", res.data);

      // 🔑 LẤY userExists TỪ BACKEND
      return res.data?.sendOtp as {
        userExists: boolean;
      };
    } catch (err) {
      console.log("SEND OTP ERROR:", err);
      throw err;
    }
  };

  // 🔐 verify OTP signup
  const verifyOtp = async (phone: string, otp: string) => {
    try {
      console.log("VERIFY SIGNUP OTP:", phone, otp);

      const res = await verifyOtpMutation({
        variables: { phone, otp },
      });

      const signupToken =
        res.data?.verifySignupOtp?.signupToken;

      if (!signupToken) {
        throw new Error("VERIFY_SIGNUP_FAILED");
      }

      await SecureStore.setItemAsync(
        "signup_token",
        signupToken
      );

      return signupToken;
    } catch (err) {
      console.log("VERIFY OTP ERROR:", err);
      throw err;
    }
  };

  return {
    sendOtp,
    verifyOtp,
    loading: sendState.loading || verifyState.loading,
    error: sendState.error || verifyState.error,
  };
}
