import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/themes/themeContext";
import styles from "@/feature/auth/signup/style/upload.style";

const UploadPhotosScreen = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Tải ảnh lên</Text>

      <View style={styles.grid}>
        {/* photo boxes */}
        <View
          style={[
            styles.photoBox,
            { backgroundColor: colors.neutral50 }
          ]}
        >
          <Text style={{ color: colors.textMuted }}>+</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.uploadBtn,
          { backgroundColor: colors.primary }
        ]}
      >
        <Text style={[styles.uploadTxt, { color: colors.neutral0 }]}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPhotosScreen;
