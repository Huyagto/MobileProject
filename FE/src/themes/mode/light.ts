import { ColorTokens } from "../tokens/colors";
import { Spacing } from "../tokens/spacing";
import { Radius } from "../tokens/radius";
import { Size } from "../tokens/size";
import { Shadows } from "../tokens/shadows";
import { Typography } from "../tokens/typography";
import { ZIndex } from "../tokens/zindex";
import { Opacity } from "../tokens/opacity";
import { Layout } from "../tokens/layout";

export const LightTheme = {
  mode: "light",
  colors: ColorTokens,
  spacing: Spacing,
  radius: Radius,
  size: Size,
  shadows: Shadows,
  typography: Typography,
  zindex: ZIndex,
  opacity: Opacity,
  layout: Layout,
} as const;
