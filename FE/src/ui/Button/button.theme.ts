import { Spacing, Radius, Typography } from "@/themes";
import type { AppTheme } from "@/themes/themeContext";

/**  
 * Output chuẩn để Button.tsx sử dụng mà không báo lỗi 
 */
export interface ButtonVariantOutput {
  container: any;
  textColor: string;
  gradient?: string[];
}

export const ButtonTheme = {
  base: {
    height: 52,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    ...Typography.h3,
    letterSpacing: 0.3,
    fontWeight: "700",
  },

  variants: {
    /** 🌈 BASIC SOLID BUTTON */
    primary: (theme: AppTheme): ButtonVariantOutput => ({
      container: {
        backgroundColor: theme.colors.primary,
      },
      textColor: theme.colors.neutral0,
    }),

    secondary: (theme: AppTheme): ButtonVariantOutput => ({
      container: {
        backgroundColor: theme.colors.secondary,
      },
      textColor: theme.colors.neutral0,
    }),

    ghost: (theme: AppTheme): ButtonVariantOutput => ({
      container: {
        backgroundColor: "transparent",
      },
      textColor: theme.colors.primary,
    }),

    /** ✨ BEAUTIFUL GLOW BUTTON — dùng cho StartScreen */
    primaryGlow: (theme: AppTheme): ButtonVariantOutput => ({
      container: {
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.accent,
        shadowOpacity: 0.45,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
      },
      textColor: theme.colors.neutral0,
    }),

    /** 🌈 GRADIENT BUTTON — cực đẹp */
    primaryGradient: (theme: AppTheme) => ({
      gradient: [
        theme.colors.secondary,
        theme.colors.accent,
        theme.colors.primary,
      ]as unknown as readonly string[],
      textColor: theme.colors.neutral0,
      container: {
        borderRadius: Radius.xl,
        overflow: "hidden",
      },
    }),

    /** 🔲 OUTLINE BUTTON */
    outline: (theme: AppTheme): ButtonVariantOutput => ({
      container: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
      },
      textColor: theme.colors.primary,
    }),
  },
} as const;

export type ButtonVariant = keyof typeof ButtonTheme.variants;
