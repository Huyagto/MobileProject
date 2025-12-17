// src/features/auth/signin/screens/LoginPhoneScreen.tsx
import React, { useState } from "react";
import { View, Alert } from "react-native";

import AuthLayout from "@/feature/auth/layouts/AuthLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useTheme } from "@/themes/themeContext";

import PhoneInput from "@/feature/auth/components/phoneInput";
import CountryPicker from "@/feature/auth/components/countryPicker";
import useDetectCountry from "@/feature/auth/hooks/useDetectCountry";
import { normalizePhone } from "@/utils/phone";
import { useLogin } from "../hooks/useLogin";

const LoginPhoneScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const { country, setCountry } = useDetectCountry();
  const { sendOtp, loading } = useLogin();

  const [phone, setPhone] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const isValid = phone.replace(/\D/g, "").length >= 8;

  const onNext = async () => {
    if (!isValid || loading) return;

    const normalizedPhone = normalizePhone(
  country.dial,
  phone
);

    try {
      // ✅ Backend tự kiểm tra user tồn tại
      await sendOtp(normalizedPhone);

      // ✅ Thành công → sang màn OTP
      navigation.navigate("OTPVerify", {
        phone: normalizedPhone,
        flow: "signin",
      });
    } catch (err: any) {
      // ❌ USER_NOT_FOUND → backend throw
      Alert.alert(
        "Không đăng nhập được",
        "Số điện thoại chưa được đăng ký"
      );
    }
  };

  return (
    <AuthLayout
      footer={
        <Button
          title="Continue"
          onPress={onNext}
          disabled={!isValid || loading}
          fullWidth
        />
      }
    >
      {/* HEADER */}
      <Text variant="h1">Welcome back 👋</Text>
      <Text
        variant="body"
        style={{ marginTop: 4, color: colors.textMuted }}
      >
        Log in with your phone number
      </Text>

      {/* PHONE INPUT */}
      <View style={{ marginTop: 32 }}>
        <PhoneInput
          phone={phone}
          setPhone={setPhone}
          country={country}
          openPicker={() => setOpenPicker(true)}
        />
      </View>

      {/* SIGNUP CTA */}
      <Text
        variant="caption"
        style={{
          textAlign: "center",
          marginTop: 24,
          color: colors.textMuted,
        }}
      >
        Don’t have an account?
      </Text>

      <Button
        title="Create account"
        variant="ghost"
        onPress={() => navigation.navigate("SignUpPhone")}
        fullWidth
        style={{ marginTop: 8 }}
      />

      {/* COUNTRY PICKER */}
      <CountryPicker
        visible={openPicker}
        onClose={() => setOpenPicker(false)}
        setCountry={setCountry}
      />
    </AuthLayout>
  );
};

export default LoginPhoneScreen;
