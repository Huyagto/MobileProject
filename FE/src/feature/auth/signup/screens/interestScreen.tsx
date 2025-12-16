import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";

const TAGS = [
  "Du lịch", "Âm nhạc", "Gym", "Nấu ăn",
  "Xem phim", "Game", "Cà phê", "Chụp ảnh",
];

const useStyles = createStyles((theme) => ({
  tag: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    margin: theme.spacing.xs,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing.lg,
  },
}));

const InterestScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
const { update } = useOnboarding();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

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
          disabled={selected.length === 0}
          onPress={() => {
  update({ interests: selected });
  navigation.navigate("Habit");
}}

        />
      }
    >
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
      />

      <Text variant="h1">Sở thích của bạn</Text>
      <Text variant="body">Chọn ít nhất 1 sở thích</Text>

      <View style={styles.row}>
        {TAGS.map((t) => {
          const active = selected.includes(t);
          return (
            <View
              key={t}
              style={[
                styles.tag,
                {
                  borderColor: active
                    ? theme.colors.primary
                    : theme.colors.border,
                  backgroundColor: active
                    ? theme.colors.background2
                    : theme.colors.background,
                },
              ]}
              onTouchEnd={() => toggle(t)}
            >
              <Text variant="caption">{t}</Text>
            </View>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

export default InterestScreen;
