import { Spacing, Radius, Typography } from "@/themes";
import type { AppTheme } from "@/themes/themeContext";

export const InputTheme = {
  container: {
    width: "100%",
  },

  input: (theme: AppTheme) => ({
    backgroundColor: theme.colors.neutral50,
    borderRadius: Radius.md,
    padding: Spacing.md,

    // ❌ textPrimary không tồn tại
    // color: theme.colors.textPrimary

    // ✅ sửa đúng
    color: theme.colors.text,

    fontSize: Typography.body.fontSize,
  }),

  label: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,

    // thay màu label hợp lý hơn
    color: "#777", // hoặc theme.colors.textSecondary trong Input.tsx
  },
} as const;
