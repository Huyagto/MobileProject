// src/components/ui/button/Button.tsx

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ⚠️ KIỂM TRA PATH NÀY CHO ĐÚNG CẤU TRÚC CỦA BẠN
import { ButtonTheme } from "../themes/components/button";

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: keyof typeof ButtonTheme.variants;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = "primary",
  style,
  textStyle,
}) => {
  const config = ButtonTheme.variants[variant];

  /** ============================
   *  GRADIENT BUTTON
   * ============================ */
  if (config.type === "gradient") {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore: suppress expo-linear-gradient type overload mismatch */}
        <LinearGradient
          // cast trực tiếp prop `colors` sang any để TS không kiểm tra overload
          colors={(config.colors ?? ["#000", "#444"]) as unknown as any}
          style={[
            ButtonTheme.base,
            config.shadow,
            style,
          ]}
        >
          <Text
            style={[
              ButtonTheme.text,
              { color: config.textColor },
              textStyle,
            ]}
          >
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }


  /** ============================
   *  SOLID / OUTLINE / GHOST
   * ============================ */

  const solidStyle =
    config.type === "solid"
      ? { backgroundColor: config.backgroundColor }
      : {};

  const outlineStyle =
    config.type === "outline"
      ? {
          borderWidth: config.borderWidth ?? 1,
          borderColor: config.borderColor ?? "#000",
          backgroundColor: "transparent",
        }
      : {};

  const ghostStyle =
    config.type === "ghost"
      ? { backgroundColor: "transparent" }
      : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        ButtonTheme.base,
        solidStyle,
        outlineStyle,
        ghostStyle,
        config.shadow,
        style,
      ]}
    >
      <Text
        style={[
          ButtonTheme.text,
          { color: config.textColor },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
