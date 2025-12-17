import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import {
  SEND_LOGIN_OTP,
  VERIFY_LOGIN_OTP,
} from "../graphql/auth.graphql";

export function useLogin() {
  const [sendLoginOtpMutation, sendState] =
    useMutation(SEND_LOGIN_OTP);

  const [verifyOtpMutation, verifyState] =
    useMutation(VERIFY_LOGIN_OTP);

  // 📲 gửi OTP login
  const sendOtp = async (phone: string) => {
    try {
      console.log("SEND LOGIN OTP:", phone);

      await sendLoginOtpMutation({
        variables: { phone },
      });

      return true;
    } catch (err) {
      console.log("SEND LOGIN OTP ERROR:", err);
      throw err;
    }
  };

  // 🔐 verify OTP login
  const verifyOtp = async (phone: string, otp: string) => {
    try {
      console.log("VERIFY LOGIN OTP:", phone, otp);

      const res = await verifyOtpMutation({
        variables: { phone, otp },
      });

      const accessToken =
        res.data?.verifyLoginOtp?.accessToken;

      if (!accessToken) {
        throw new Error("VERIFY_LOGIN_FAILED");
      }

      await SecureStore.setItemAsync(
        "access_token",
        accessToken
      );

      return res.data.verifyLoginOtp;
    } catch (err) {
      console.log("VERIFY LOGIN OTP ERROR:", err);
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
