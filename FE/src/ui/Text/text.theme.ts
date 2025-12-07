import { Typography } from "@/themes";
import type { AppTheme } from "@/themes/themeContext";

export const TextTheme = {
  variants: {
    h1: (theme: AppTheme) => ({
      ...Typography.h1,
      color: theme.colors.text,
    }),

    h2: (theme: AppTheme) => ({
      ...Typography.h2,
      color: theme.colors.text,
    }),

    body: (theme: AppTheme) => ({
      ...Typography.body,
      color: theme.colors.text,
    }),

    caption: (theme: AppTheme) => ({
      ...Typography.subtitle,
      color: theme.colors.textSecondary,
    }),
  },
} as const;

// ⭐ EXPORT TYPE CHUẨN CHO "variant"
export type TextVariant = keyof typeof TextTheme.variants;
