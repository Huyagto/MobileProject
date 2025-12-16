import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/themes/themeContext";
import { ButtonTheme, ButtonVariant } from "./button.theme";
import { useButton } from "./useButton";
import type { ColorValue } from "react-native";

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  style?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean; // ✅ thêm
  onPress?: () => void | Promise<void>;
};

export const Button = ({
  title,
  variant = "primary",
  style,
  disabled = false,
  fullWidth = false,
  loading = false,
  onPress,
}: ButtonProps) => {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;
  const { handlePress } = useButton({
    onPress,
    disabled: isDisabled,
  });

  const v = ButtonTheme.variants[variant](theme);

  const textStyle = {
    ...(ButtonTheme.text as any),
    color: v.textColor,
    opacity: isDisabled ? 0.6 : 1,
  };

  const containerStyle = [
    ButtonTheme.base,
    v.container,
    fullWidth && { width: "100%" },
    isDisabled && { opacity: 0.6 },
    style,
  ];

  const isGradient = Array.isArray(v.gradient);

  const content = loading ? (
    <ActivityIndicator color={v.textColor} />
  ) : (
    <Text style={textStyle}>{title}</Text>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      disabled={isDisabled}
      style={!isGradient ? (containerStyle as any) : undefined}
    >
      {isGradient ? (
        <LinearGradient
          colors={v.gradient as [ColorValue, ColorValue, ColorValue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={containerStyle as any}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};

export default Button;
