import React, { useRef, useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";

import { useAuth } from "@/feature/auth/signup/hooks/useAuth";

const OTP_LENGTH = 6;

/* =======================
   STYLES (SCREEN-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.neutral50,
    textAlign: "center",
    fontSize: 20,
    color: theme.colors.text,
  },

  resendBtn: {
    marginTop: theme.spacing.lg,
    alignItems: "center",
  },
}));

const OTPVerifyScreen = ({ navigation, route }: any) => {
  const styles = useStyles();
  const theme = useTheme();

  const { phone } = route.params;
  const { verifyOtp, loading } = useAuth();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const inputs = useRef<Array<TextInput | null>>([]);

  const isValid = otp.join("").length === OTP_LENGTH;

  /* =======================
     OTP INPUT LOGIC
  ======================= */
  const handleChange = (text: string, index: number) => {
    const value = text.replace(/\D/g, "");
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* =======================
     VERIFY
  ======================= */
  const onVerify = async () => {
    if (!isValid || loading) return;

    try {
      await verifyOtp(phone, otp.join(""));
      navigation.replace("CreateName");
    } catch (err) {
      Alert.alert("Mã xác thực không đúng", "Vui lòng kiểm tra lại mã OTP");

      setOtp(Array(OTP_LENGTH).fill(""));
      inputs.current[0]?.focus();
    }
  };

  return (
    <OnboardingLayout
      footer={
        <Button
          title={loading ? "Đang xác thực..." : "Xác nhận"}
          onPress={onVerify}
          disabled={!isValid || loading}
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

      {/* HEADER */}
      <Text variant="h1">Nhập mã xác thực</Text>

      <Text variant="body">Mã OTP đã được gửi đến số điện thoại của bạn</Text>

      {/* OTP INPUTS */}
      <View style={styles.otpRow}>
        {otp.map((value, i) => (
          <TextInput
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, i)}
          />
        ))}
      </View>

      {/* RESEND */}
      <View style={styles.resendBtn}>
        <Text variant="caption">Gửi lại mã</Text>
      </View>
    </OnboardingLayout>
  );
};

export default OTPVerifyScreen;
