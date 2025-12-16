// src/features/auth/signin/screens/LoginPhoneScreen.tsx
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    const res = await sendOtp(normalizedPhone);

    // ❌ SĐT CHƯA TỒN TẠI → KHÔNG CHO LOGIN
    if (!res.userExists) {
      Alert.alert(
        "Tài khoản chưa tồn tại",
        "Vui lòng đăng ký trước"
      );
      return;
    }

    // ✅ SĐT ĐÃ TỒN TẠI → SANG OTP
    navigation.navigate("OTPVerify", {
      phone: normalizedPhone,
      flow: "signin",
    });
  } catch {
    Alert.alert(
      "Không gửi được OTP",
      "Vui lòng thử lại"
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
