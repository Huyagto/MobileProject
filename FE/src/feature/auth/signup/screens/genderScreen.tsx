import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";

const OPTIONS = ["Nam", "Nữ", "Khác"] as const;

/* =======================
   STYLES (SCREEN-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },

  option: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    alignItems: "center",
  },
}));

const GenderScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
  const { update } = useOnboarding();
    const [selected, setSelected] = useState<string>("");
   const mapGender = (g: string): "male" | "female" | "other" => {
    if (g === "Nam") return "male";
    if (g === "Nữ") return "female";
    return "other";
  };


  return (
    <OnboardingLayout
    progress={
    <OnboardingProgress
      current={4}
      total={ONBOARDING_TOTAL_STEPS}
    />
  }
      footer={
        <Button
          title="Tiếp tục"
           onPress={() => {
            update({ gender: mapGender(selected) });// 🔥 CHỖ QUYẾT ĐỊNH
            navigation.navigate("UploadPhotos");
          }}
          disabled={!selected}
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
      <Text variant="h1">Giới tính của bạn?</Text>

      <Text variant="body">
        Thông tin này giúp chúng tôi gợi ý phù hợp hơn.
      </Text>

      {/* OPTIONS */}
      <View style={{ marginTop: theme.spacing.xl }}>
        {OPTIONS.map((g) => {
          const isActive = selected === g;

          return (
            <View
              key={g}
              style={[
                styles.option,
                {
                  borderColor: isActive
                    ? theme.colors.primary
                    : theme.colors.border,
                  backgroundColor: isActive
                    ? theme.colors.background2
                    : theme.colors.background,
                },
              ]}
              onTouchEnd={() => setSelected(g)}
            >
              <Text
                variant="body"
                style={{
                  color: isActive
                    ? theme.colors.primary
                    : theme.colors.text,
                }}
              >
                {g}
              </Text>
            </View>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

export default GenderScreen;
