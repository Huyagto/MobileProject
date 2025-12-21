// src/features/auth/signup/screens/SignUpPhoneScreen.tsx
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/navigation/type";
import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";
import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";

import { useSignup } from "@/feature/auth/signup/hooks/useSignup";
import { normalizePhone } from "@/utils/phone";
import PhoneInput from "@/feature/auth/components/phoneInput";
import CountryPicker from "@/feature/auth/components/countryPicker";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import useDetectCountry from "@/feature/auth/hooks/useDetectCountry";

type Nav = NativeStackScreenProps<RootStackParamList, "SignUpPhone">;

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
  const { sendOtp, loading } = useSignup();
  const { update } = useOnboarding();

  const [phone, setPhone] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const isValid = phone.replace(/\D/g, "").length >= 8;

  const onNext = async () => {
  console.log("CLICK NEXT");

  if (!isValid || loading) return;

  const normalizedPhone = normalizePhone(
    country.dial,
    phone
  );
  console.log("NORMALIZED PHONE:", normalizedPhone);

  try {
    const res = await sendOtp(normalizedPhone);

    // ❌ ĐÃ TỒN TẠI → KHÔNG CHO SIGNUP
    if (res.userExists) {
      Alert.alert(
        "Số điện thoại đã tồn tại",
        "Vui lòng đăng nhập"
      );
      return;
    }

    // ✅ CHƯA TỒN TẠI → TIẾP TỤC SIGNUP
    update({ phone: normalizedPhone });

    navigation.navigate("OTPVerify", {
      phone: normalizedPhone,
      flow: "signup",
    });
  } catch (e) {
    Alert.alert(
      "Không gửi được OTP",
      "Vui lòng thử lại"
    );
  }
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
      {/* BACK */}
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />

      {/* TEXT */}
      <Text variant="h1">Bạn có thể chia sẻ số điện thoại không?</Text>
      <Text variant="body">Chúng tôi sẽ gửi mã xác thực cho bạn.</Text>

      {/* PHONE INPUT */}
      <View style={styles.inputBlock}>
        <PhoneInput
          phone={phone}
          setPhone={setPhone}
          country={country}
          openPicker={() => setOpenPicker(true)}
        />
      </View>

      {/* COUNTRY PICKER MODAL */}
      <CountryPicker
        visible={openPicker}
        onClose={() => setOpenPicker(false)}
        setCountry={setCountry}
      />
    </OnboardingLayout>
  );
};

export default SignUpPhoneScreen;
