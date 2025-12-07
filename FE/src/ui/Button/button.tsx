import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/themes/themeContext";
import { ButtonTheme, ButtonVariant } from "./button.theme";
import { useButton } from "./useButton";
import type { ColorValue } from "react-native";

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  style?: any;
  onPress?: () => void;
};

export const Button = ({
  title,
  variant = "primary",
  style,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme(); // ✔ FIX
  const { handlePress } = useButton(props);

  // ✔ Lấy variant đúng kiểu
  const v = ButtonTheme.variants[variant](theme);

  const textStyle = {
    ...(ButtonTheme.text as any),
    color: v.textColor,
  };

  const containerStyle = [ButtonTheme.base, v.container, style];

  const isGradient = Array.isArray(v.gradient);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={!isGradient ? (containerStyle as any) : undefined}
    >
      {isGradient ? (
                <LinearGradient
          colors={v.gradient as unknown as [ColorValue, ColorValue, ColorValue]}
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
