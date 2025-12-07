import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/themes/themeContext";
import styles from "@/feature/auth/signup/style/gender.style";

const GenderScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const [selected, setSelected] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Giới tính của bạn?
      </Text>

      {["Nam", "Nữ", "Khác"].map((g) => {
        const isActive = selected === g;

        return (
          <TouchableOpacity
            key={g}
            onPress={() => setSelected(g)}
            style={[
              styles.option,
              {
                borderColor: isActive ? colors.primary : colors.border,
                backgroundColor: isActive ? colors.background2 : colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                { color: isActive ? colors.primary : colors.text },
              ]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.nextBtn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("UploadPhotos")}
      >
        <Text style={[styles.nextTxt, { color: colors.neutral0 }]}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
