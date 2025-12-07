import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/themes/themeContext";
import styles from "@/feature/auth/signup/style/birthday.style";

const BirthdayScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Ngày sinh của bạn?
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Hãy nhập thông tin thật để mọi người tin tưởng hơn.
      </Text>

      <View style={styles.dateBox}>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          maxLength={2}
          placeholder="DD"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          maxLength={2}
          placeholder="MM"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={month}
          onChangeText={setMonth}
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          maxLength={4}
          placeholder="YYYY"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.nextBtn,
          { backgroundColor: colors.primary },
        ]}
        onPress={() => navigation.navigate("Gender")}
      >
        <Text style={[styles.nextTxt, { color: colors.neutral0 }]}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BirthdayScreen;
