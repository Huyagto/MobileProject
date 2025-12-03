// src/themes/components/button.ts
import { ViewStyle, TextStyle } from "react-native";
import { Colors, Shadows, Radius, Spacing } from "../index";

export type ButtonVariantType = "solid" | "gradient" | "outline" | "ghost";

export interface ButtonVariant {
  type: ButtonVariantType;
  // gradient
  colors?: string[];
  // solid / outline
  backgroundColor?: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
  // style-like shadow (ViewStyle so can be spread into style array)
  shadow?: ViewStyle;
}

export const ButtonTheme: {
  base: ViewStyle;
  text: TextStyle;
  variants: Record<string, ButtonVariant>;
} = {
  base: {
    height: 55,
    borderRadius: Radius.round,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },

  text: {
    fontSize: 18,
    fontWeight: "800" as TextStyle["fontWeight"],
    letterSpacing: 0.3,
  },

  variants: {
    /** START SCREEN BUTTONS */
    createAccount: {
      type: "solid",
      backgroundColor: Colors.accent,
      textColor: "#000",
      shadow: Shadows.neon,
    },

    loginStart: {
      type: "gradient",
      colors: [Colors.primary, Colors.secondary],
      textColor: Colors.text,
      shadow: Shadows.neon,
    },

    /** COMMON BUTTONS */
    primary: {
      type: "solid",
      backgroundColor: Colors.primary,
      textColor: Colors.text,
      shadow: Shadows.soft,
    },

    secondary: {
      type: "solid",
      backgroundColor: Colors.accent,
      textColor: "#000",
      shadow: Shadows.soft,
    },

    outline: {
      type: "outline",
      borderWidth: 2,
      borderColor: Colors.primary,
      textColor: Colors.primary,
      shadow: Shadows.none,
    },

    ghost: {
      type: "ghost",
      textColor: Colors.text,
      shadow: Shadows.none,
    },
  },
};
