import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useOnboarding } from "../context/OnboardingContext";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";

/* =======================
   STYLES (SCREEN-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },

  input: {
    height: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.xl,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.neutral50,
  },
}));

const CreateNameScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();

  const [name, setName] = useState("");

  const isValid = name.trim().length > 0;
  const { update } = useOnboarding();
  return (
    <OnboardingLayout
      progress={
    <OnboardingProgress
      current={1}
      total={ONBOARDING_TOTAL_STEPS}
    />
  }
      footer={
        <Button
          title="Tiếp theo"
          onPress={() => {
  update({ name });        // ✅ LƯU VÀO CONTEXT
  navigation.navigate("Birthday");
}}
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
      <Text variant="h1">Tên của bạn là gì?</Text>

      <Text variant="body">
        Đây sẽ là cách mọi người nhìn thấy bạn trên ứng dụng.
      </Text>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên..."
        placeholderTextColor={theme.colors.textMuted}
        value={name}
        onChangeText={setName}
      />
    </OnboardingLayout>
  );
};

export default CreateNameScreen;
