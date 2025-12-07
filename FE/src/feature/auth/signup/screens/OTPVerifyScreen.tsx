import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/themes/themeContext";
import styles from "@/feature/auth/signup/style/otp.style";

const OTPVerifyScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={colors.text} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        Nhập mã xác thực
      </Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Mã OTP đã được gửi đến số điện thoại của bạn
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpRow}>
        {[1, 2, 3, 4].map((_, i) => (
          <TextInput
            key={i}
            style={[
              styles.otpInput,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.neutral50,
              },
            ]}
            maxLength={1}
          />
        ))}
      </View>

      {/* Resend */}
      <TouchableOpacity style={styles.resendBtn}>
        <Text style={[styles.resendText, { color: colors.primary }]}>
          Gửi lại mã
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerifyScreen;
