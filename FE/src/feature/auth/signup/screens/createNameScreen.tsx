import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/themes/themeContext";
import styles from "@/feature/auth/signup/style/name.style";

const CreateNameScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const [name, setName] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Tên của bạn là gì?
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Đây sẽ là cách mọi người nhìn thấy bạn trên ứng dụng.
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="Nhập tên..."
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={[
          styles.nextBtn,
          { backgroundColor: colors.primary },
        ]}
        onPress={() => navigation.navigate("Birthday")}
      >
        <Text style={[styles.nextTxt, { color: colors.neutral0 }]}>
          Tiếp theo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNameScreen;
