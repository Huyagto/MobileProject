import { Colors } from "../tokens/colors";
import { ColorTokens } from "../tokens/colors";
import { Spacing } from "../tokens/spacing";
import { Radius } from "../tokens/radius";
import { Typography } from "../tokens/typography";
import { Shadows } from "../tokens/shadows";
import { Size } from "../tokens/size";
import { Opacity } from "../tokens/opacity";
import { Layout } from "../tokens/layout";
import { ZIndex } from "../tokens/zindex";

export const buildTheme = (mode: "light" | "dark") => {
  const palette = mode === "light" ? Colors.light : Colors.dark;

  return {
    mode,
    colors: {
      ...palette,       // text, textSecondary, background, ...
      ...ColorTokens,   // neutral, primary, etc.
    },

    spacing: Spacing,
    radius: Radius,
    size: Size,
    shadows: Shadows,
    typography: Typography,
    opacity: Opacity,
    layout: Layout,
    zindex: ZIndex,
  } as const;
};
