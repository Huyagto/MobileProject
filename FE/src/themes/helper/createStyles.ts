// src/themes/helper/createStyles.ts
import { useTheme } from "@/themes/themeContext";
import type { AppTheme } from "@/themes/themeContext";

export const createStyles = (
  styles: (theme: AppTheme) => Record<string, any>
) => {
  return () => {
    const { theme } = useTheme();
    return styles(theme);
  };
};
