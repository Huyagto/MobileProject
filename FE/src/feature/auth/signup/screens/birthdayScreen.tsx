import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";

const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
  },
  input: {
    width: "30%",
    height: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    textAlign: "center",
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.neutral50,
  },
}));

const BirthdayScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
  const { update } = useOnboarding(); // 🔥 QUAN TRỌNG

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const isValid =
    day.length === 2 &&
    month.length === 2 &&
    year.length === 4;

  const onNext = () => {
  const d = Number(day);
  const m = Number(month) - 1;
  const y = Number(year);

  // 1️⃣ Validate basic
  if (
    d < 1 || d > 31 ||
    m < 0 || m > 11 ||
    y < 1900 || y > new Date().getFullYear()
  ) {
    Alert.alert("Ngày sinh không hợp lệ");
    return;
  }

  const date = new Date(y, m, d);

  // 2️⃣ Validate future date
  if (date > new Date()) {
    Alert.alert("Ngày sinh không thể ở tương lai");
    return;
  }

  // 3️⃣ (Optional) Validate age >= 18
  const age =
    new Date().getFullYear() - date.getFullYear();
  if (age < 18) {
    Alert.alert("Bạn phải đủ 18 tuổi");
    return;
  }

  update({
    birthday: date.toISOString(), // ✅ CHỈ LÚC NÀY MỚI UPDATE
  });

  navigation.navigate("Gender");
};
  return (
    <OnboardingLayout
      progress={
        <OnboardingProgress
          current={2}
          total={ONBOARDING_TOTAL_STEPS}
        />
      }
      footer={
        <Button
          title="Tiếp tục"
          onPress={onNext}
          disabled={!isValid}
          fullWidth
        />
      }
    >
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />

      <Text variant="h1">Ngày sinh của bạn?</Text>
      <Text variant="body">
        Hãy nhập thông tin thật để mọi người tin tưởng hơn.
      </Text>

      <View style={styles.dateRow}>
        <TextInput
          style={styles.input}
          maxLength={2}
          placeholder="DD"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="number-pad"
          value={day}
          onChangeText={setDay}
        />
        <TextInput
          style={styles.input}
          maxLength={2}
          placeholder="MM"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="number-pad"
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          style={styles.input}
          maxLength={4}
          placeholder="YYYY"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="number-pad"
          value={year}
          onChangeText={setYear}
        />
      </View>
    </OnboardingLayout>
  );
};

export default BirthdayScreen;
