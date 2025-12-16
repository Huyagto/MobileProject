import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { useTheme } from "@/themes/themeContext";

type Props = {
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;

  // ✅ thêm
  keyboardType?: TextInputProps["keyboardType"];
  autoFocus?: boolean;
  returnKeyType?: TextInputProps["returnKeyType"];
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  label,
  style,
  secureTextEntry,
  keyboardType,
  autoFocus,
  returnKeyType,
}: Props) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={[{ width: "100%" }, style]}>
      {label && (
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
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
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
