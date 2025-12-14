import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";

const OPTIONS = ["Nam", "Nữ", "Tất cả"] as const;

const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },
  option: {
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    alignItems: "center",
  },
}));

const PreferenceGenderScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
    const { update } = useOnboarding();
  const [selected, setSelected] = useState<string>("");

  return (
    <OnboardingLayout
    progress={
    <OnboardingProgress
      current={6}
      total={ONBOARDING_TOTAL_STEPS}
    />
  }
      footer={
        <Button
          title="Tiếp tục"
          fullWidth
          disabled={!selected}
          onPress={() => {
  update({ preferenceGender: [selected] });
  navigation.navigate("Interest");
}}
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

      <Text variant="h1">Bạn quan tâm đến ai?</Text>
      <Text variant="body">Điều này giúp gợi ý phù hợp hơn.</Text>

      <View style={{ marginTop: theme.spacing.xl }}>
        {OPTIONS.map((o) => {
          const active = selected === o;
          return (
            <View
              key={o}
              style={[
                styles.option,
                {
                  borderColor: active
                    ? theme.colors.primary
                    : theme.colors.border,
                  backgroundColor: active
                    ? theme.colors.background2
                    : theme.colors.background,
                },
              ]}
              onTouchEnd={() => setSelected(o)}
            >
              <Text variant="body">{o}</Text>
            </View>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

export default PreferenceGenderScreen;
