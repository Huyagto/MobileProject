import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/themes/themeContext";
import { ButtonTheme, ButtonVariant } from "./button.theme";
import { useButton } from "./useButton";
import type { ColorValue } from "react-native";

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  style?: any;
  disabled?: boolean;          // ✅ thêm
  fullWidth?: boolean;         // ✅ thêm
  onPress?: () => void | Promise<void>;
};

export const Button = ({
  title,
  variant = "primary",
  style,
  disabled = false,
  fullWidth = false,
  onPress,
}: ButtonProps) => {
  const { theme } = useTheme();
  const { handlePress } = useButton({ onPress, disabled });

  const v = ButtonTheme.variants[variant](theme);

  const textStyle = {
    ...(ButtonTheme.text as any),
    color: v.textColor,
    opacity: disabled ? 0.6 : 1,
  };

  const containerStyle = [
    ButtonTheme.base,
    v.container,
    fullWidth && { width: "100%" },   // ✅ full width
    disabled && { opacity: 0.6 },      // ✅ disabled
    style,
  ];

  const isGradient = Array.isArray(v.gradient);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      disabled={disabled}
      style={!isGradient ? (containerStyle as any) : undefined}
    >
      {isGradient ? (
        <LinearGradient
          colors={v.gradient as [ColorValue, ColorValue, ColorValue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={containerStyle as any}
        >
          <Text style={textStyle}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
