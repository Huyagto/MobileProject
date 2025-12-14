// src/features/auth/signup/screens/SignUpPhoneScreen.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/type";
import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";
import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import useDetectCountry from "@/feature/auth/signup/hooks/useDetectCountry";
import { useAuth } from "@/feature/auth/signup/hooks/useAuth";
import { normalizePhone } from "@/utils/phone";
import PhoneInput from "@/feature/auth/signup/components/phoneInput";
import CountryPicker from "@/feature/auth/signup/components/countryPicker";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";

type Nav = NativeStackScreenProps<RootStackParamList, "SignUpPhone">;
/* =======================
   STYLES (SCREEN-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },

  inputBlock: {
    marginTop: theme.spacing.xl,
  },
}));

const SignUpPhoneScreen = ({ navigation }: Nav) => {
  const styles = useStyles();
  const theme = useTheme();

  const { country, setCountry } = useDetectCountry();
  const { sendOtp, loading } = useAuth();

  const [phone, setPhone] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const isValid = phone.replace(/\D/g, "").length >= 8;
  const { update } = useOnboarding();
  const onNext = async () => {
    if (loading || !isValid) return;

    const normalizedPhone = normalizePhone(country.dial, phone);
    console.log("📱 FE normalizedPhone:", normalizedPhone);

    await sendOtp(normalizedPhone);
    update({ phone: normalizedPhone });
    navigation.navigate("OTPVerify", {
      phone: normalizedPhone,
    });
  };

  return (
    <OnboardingLayout
      footer={
        <Button
      title="Tiếp theo"
      onPress={onNext}
      disabled={!isValid || loading}
      fullWidth
    />
      }
    >
      {/* BACK BUTTON */}
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />

      {/* HEADER */}
      <Text variant="h1">
        Bạn có thể chia sẻ số điện thoại không?
      </Text>

      <Text variant="body">
        Chúng tôi sẽ gửi mã xác thực cho bạn.
      </Text>

      {/* PHONE INPUT */}
      <View style={styles.inputBlock}>
        <PhoneInput
          phone={phone}
          setPhone={setPhone}
          country={country}
          openPicker={() => setOpenPicker(true)}
        />
      </View>

      {/* COUNTRY PICKER */}
      <CountryPicker
        visible={openPicker}
        onClose={() => setOpenPicker(false)}
        setCountry={setCountry}
      />
    </OnboardingLayout>
  );
};

export default SignUpPhoneScreen;
