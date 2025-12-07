// src/themes/createStyles.ts
import { useTheme } from "@/themes/themeContext";

export const createStyles = (styles: (theme: any) => any) => {
  return () => {
    const  theme  = useTheme();
    return styles(theme);
  };
};
