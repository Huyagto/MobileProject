import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";

const HABITS = ["Không hút thuốc", "Uống rượu", "Tập thể thao", "Ngủ sớm"];

const useStyles = createStyles((theme) => ({
  item: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
  },
}));

const HabitScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
    const { update } = useOnboarding();
  const [selected, setSelected] = useState<string>("");

  return (
    <OnboardingLayout
      footer={
        <Button
          title="Tiếp tục"
          fullWidth
          disabled={!selected}
          onPress={() => {
  update({ habits: [selected] });
  navigation.navigate("Summary");
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

      <Text variant="h1">Thói quen sinh hoạt</Text>
      <Text variant="body">Chọn 1 thói quen nổi bật</Text>

      <View style={{ marginTop: theme.spacing.xl }}>
        {HABITS.map((h) => {
          const active = selected === h;
          return (
            <View
              key={h}
              style={[
                styles.item,
                {
                  borderColor: active
                    ? theme.colors.primary
                    : theme.colors.border,
                },
              ]}
              onTouchEnd={() => setSelected(h)}
            >
              <Text variant="body">{h}</Text>
            </View>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

export default HabitScreen;
