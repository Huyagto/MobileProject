import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

import { buildTheme } from "./helper/buildTheme";

export type ThemeMode = "light" | "dark";
export type AppTheme = ReturnType<typeof buildTheme>;

export type ThemeContextType = {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: buildTheme("light"),
  mode: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";

  const [mode, setMode] = useState<ThemeMode>(systemMode);

  const theme = buildTheme(mode);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener((pref) => {
      setMode(pref.colorScheme === "dark" ? "dark" : "light");
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 🔥 Hook này trả về token của theme
export const useTheme = () => {
  const { theme, mode, toggleTheme } = useContext(ThemeContext);

  return {
    theme,
    mode,
    toggleTheme,

    // expose token trực tiếp cho dễ dùng
    colors: theme.colors,
    spacing: theme.spacing,
    radius: theme.radius,
    typography: theme.typography,
    size: theme.size,
    shadows: theme.shadows,
    opacity: theme.opacity,
  };
};

