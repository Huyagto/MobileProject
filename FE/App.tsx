// App.tsx
import React from "react";
import AppNavigator from "@/navigation/appNavigator";
import { ThemeProvider } from "@/themes/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator/>
    </ThemeProvider>
  )
}
