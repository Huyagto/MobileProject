import React, { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AuthLayout from "@/feature/auth/layouts/AuthLayout";
import OTPInput from "@/feature/auth/components/OTPInput";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";

import { useTheme } from "@/themes/themeContext";
import { createStyles } from "@/themes/helper/createStyles";

import { useLogin } from "@/feature/auth/signin/hooks/useLogin";
import { useSignup } from "@/feature/auth/signup/hooks/useSignup";

const OTP_LENGTH = 6;
const RESEND_TIME = 60;

const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },
  resend: {
    marginTop: theme.spacing.lg,
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "600",
  },
  muted: {
    opacity: 0.5,
  },
}));

const OTPVerifyScreen = ({ navigation, route }: any) => {
  const styles = useStyles();
  const theme = useTheme();

  const { phone, flow } = route.params as {
    phone: string;
    flow: "signin" | "signup";
  };

  if (!phone || !flow) {
    Alert.alert("Lỗi", "Thiếu thông tin xác thực");
    navigation.goBack();
    return null;
  }

  // chọn đúng hook theo flow
  const auth = flow === "signin" ? useLogin() : useSignup();
  const { verifyOtp, sendOtp, loading } = auth;

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [counter, setCounter] = useState(RESEND_TIME);

  const otpValue = otp.join("");
  const isComplete = otpValue.length === OTP_LENGTH;

  /* ===== Countdown resend ===== */
  useEffect(() => {
    if (counter === 0) return;
    const t = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [counter]);

  /* ===== Auto submit ===== */
  useEffect(() => {
    if (isComplete && !loading) {
      Keyboard.dismiss();
      handleVerify();
    }
  }, [isComplete]);

  const handleVerify = async () => {
  try {
    await verifyOtp(phone, otpValue);

    if (flow === "signup") {
      Alert.alert(
        "Đăng ký thành công 🎉",
        "Hãy hoàn tất hồ sơ của bạn",
        [
          {
            text: "Tiếp tục",
            onPress: () =>
              navigation.replace("CreateName"),
          },
        ]
      );
    } else {
      Alert.alert(
        "Đăng nhập thành công 🎉",
        "Chào mừng bạn quay trở lại!",
        [
          {
            text: "Vào ứng dụng",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              }),
          },
        ]
      );
    }
  } catch {
    Alert.alert("Mã OTP không đúng", "Vui lòng thử lại");
    setOtp(Array(OTP_LENGTH).fill(""));
  }
};


  const handleResend = async () => {
    if (counter > 0 || loading) return;

    try {
      await sendOtp(phone);
      setCounter(RESEND_TIME);
      Alert.alert("Đã gửi lại mã OTP");
    } catch {
      Alert.alert(
        "Không thể gửi OTP",
        "Vui lòng thử lại sau"
      );
    }
  };

  return (
    <AuthLayout
      footer={
        <Button
          title={loading ? "Đang xác thực..." : "Xác nhận"}
          onPress={handleVerify}
          disabled={!isComplete || loading}
          fullWidth
        />
      }
    >
      {/* BACK */}
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />

      <Text variant="h1">Nhập mã xác thực</Text>
      <Text variant="body">
        Mã OTP đã được gửi đến ****{phone.slice(-3)}
      </Text>

      <OTPInput
        length={OTP_LENGTH}
        value={otp}
        onChange={setOtp}
        autoFocus
      />

      <Text
        style={[
          styles.resend,
          counter > 0 && styles.muted,
        ]}
        onPress={handleResend}
      >
        {counter > 0
          ? `Gửi lại sau ${counter}s`
          : "Gửi lại mã OTP"}
      </Text>
    </AuthLayout>
  );
};

export default OTPVerifyScreen;
