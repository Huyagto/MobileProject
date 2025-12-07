import React from "react";
import { View, TextInput, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../themes/themeContext";

type Props = {
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  label,
  style,
  secureTextEntry,
}: Props) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={[{ width: "100%" }, style]}>
      {label ? (
        <Text
          style={[
            typography.body,
            {
              color: colors.textSecondary,
              marginBottom: spacing.xs,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: colors.neutral50,
            color: colors.text,
            padding: spacing.md,
            borderRadius: radius.md,
            borderColor: colors.border,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});

export default Input;
