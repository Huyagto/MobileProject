import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
} from "react-native";

import { useTheme } from "@/themes/themeContext";
import { TextTheme, TextVariant } from "./text.theme";

type Props = RNTextProps & {
  variant?: TextVariant;
};

export const Text = ({
  variant = "body",
  style,
  children,
  ...rest
}: Props) => {
  const { theme }= useTheme();

  const v = TextTheme.variants[variant](theme);

  return (
    <RNText
      {...rest}
      style={[v, style]}
    >
      {children}
    </RNText>
  );
};

export default Text;
