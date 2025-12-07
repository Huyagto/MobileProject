// src/features/auth/signup/components/PhoneInput.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "@/feature/auth/signup/style/signUpPhone.styles";
import { Country } from "@/utils/countries";

type Props = {
  phone: string;
  setPhone: (v: string) => void;
  country: Country;          // ✅ nhận country từ parent
  openPicker: () => void;
};

const PhoneInput = ({ phone, setPhone, country, openPicker }: Props) => {
  return (
    <>
      <View style={styles.phoneRow}>
        <TouchableOpacity onPress={openPicker} style={styles.countrySelect}>
          <Text style={styles.countryText}>
            {country.flag} {country.dial} ▼
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
          placeholder="Số điện thoại"
        />
      </View>

      <View style={styles.underline} />
    </>
  );
};

export default PhoneInput;
