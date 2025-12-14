import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";

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

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const isValid =
    day.length === 2 &&
    month.length === 2 &&
    year.length === 4;

  return (
    <OnboardingLayout
    progress={
    <OnboardingProgress
      current={3}
      total={ONBOARDING_TOTAL_STEPS}
    />
  }
      footer={
        <Button
          title="Tiếp tục"
          onPress={() => navigation.navigate("Gender")}
          disabled={!isValid}
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
      <Text variant="h1">Ngày sinh của bạn?</Text>

      <Text variant="body">
        Hãy nhập thông tin thật để mọi người tin tưởng hơn.
      </Text>

      {/* DATE INPUTS */}
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
