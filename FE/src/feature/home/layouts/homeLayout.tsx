import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useTheme } from "@/themes/themeContext";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: colors.neutral50, // ✅ Gen Z – giống Tinder
      }}
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default HomeLayout;
