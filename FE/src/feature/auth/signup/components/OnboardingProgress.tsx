import React from "react";
import { View } from "react-native";
import { createStyles } from "@/themes/helper/createStyles";
import { Text } from "@/ui/Text";

type Props = {
  current: number;
  total: number;
};

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.sm,
  },

  barBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },

  label: {
    marginBottom: theme.spacing.xs,
  },
}));

const OnboardingProgress = ({ current, total }: Props) => {
  const styles = useStyles();
  const percent = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      <Text variant="caption" style={styles.label}>
        Bước {current} / {total}
      </Text>

      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

export default OnboardingProgress;
