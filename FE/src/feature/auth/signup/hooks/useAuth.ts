import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { SEND_OTP, VERIFY_OTP } from "@/feature/auth/signup/graphql/auth.graphql";

export function useAuth() {
  const [sendOtpMutation, sendState] = useMutation(SEND_OTP);
  const [verifyOtpMutation, verifyState] = useMutation(VERIFY_OTP);

  // 📲 gửi OTP
  const sendOtp = async (phone: string) => {
    await sendOtpMutation({
      variables: { phone },
    });
  };

  // 🔐 verify OTP
  const verifyOtp = async (phone: string, otp: string) => {
    const res = await verifyOtpMutation({
      variables: { phone, otp },
    });

    if (!res.data?.verifyOtp?.signupToken) {
      throw new Error("OTP verification failed");
    }

    const { signupToken } = res.data.verifyOtp;

    // 🔐 lưu token signup tạm
    await SecureStore.setItemAsync("signup_token", signupToken);

    return {
      signupToken,
    };
  };

  return {
    sendOtp,
    verifyOtp,
    loading: sendState.loading || verifyState.loading,
    error: sendState.error || verifyState.error,
  };
}
