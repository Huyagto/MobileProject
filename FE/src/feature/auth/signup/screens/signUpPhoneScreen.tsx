// src/features/auth/signup/screens/SignUpPhoneScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useDetectCountry from "../hooks/useDetectCountry";
import PhoneInput from "@/feature/auth/signup/components/phoneInput";
import CountryPicker from "@/feature/auth/signup/components/countryPicker";
import styles from "@/feature/auth/signup/style/signUpPhone.styles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/type";

type Nav = NativeStackScreenProps<RootStackParamList, "SignUpPhone">;

const SignUpPhoneScreen = ({ navigation }: Nav) => {
  const { country, setCountry } = useDetectCountry();
  const [phone, setPhone] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const isValid = phone.replace(/\D/g, "").length >= 8;

  const onNext = () => {
    navigation.navigate("OTPVerify", { phone: `${country.dial}${phone}` });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Bạn có thể chia sẻ số điện thoại không?</Text>
      <Text style={styles.desc}>Chúng tôi sẽ gửi mã xác thực cho bạn.</Text>

      <PhoneInput phone={phone} setPhone={setPhone} country={country} openPicker={() => setOpenPicker(true)} />

      <TouchableOpacity style={[styles.nextBtn, { opacity: isValid ? 1 : 0.45 }]} onPress={onNext} disabled={!isValid}>
        <Text style={styles.nextTxt}>Tiếp theo</Text>
      </TouchableOpacity>

      <CountryPicker visible={openPicker} onClose={() => setOpenPicker(false)} setCountry={setCountry} />
    </View>
  );
};

export default SignUpPhoneScreen;
