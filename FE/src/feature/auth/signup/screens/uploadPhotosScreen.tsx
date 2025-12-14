import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import OnboardingProgress from "../components/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "../constants";

const MAX_PHOTOS = 6;

/* =======================
   STYLES
======================= */
const useStyles = createStyles((theme) => ({
  backBtn: {
    marginBottom: theme.spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing.xl,
    justifyContent: "space-between",
  },

  photoBox: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 4,
  },
}));

const UploadPhotosScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();

  const [photos, setPhotos] = useState<string[]>([]);
  const { update } = useOnboarding();
  useEffect(() => {
  if (photos.length > 0) {
    update({ photos });
  }
}, [photos]);
  const hasPhoto = photos.length > 0;

  /* =======================
     PICK IMAGE
  ======================= */
  const pickImage = async (index: number) => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Cần quyền truy cập",
        "Vui lòng cho phép truy cập thư viện ảnh"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPhotos((prev) => {
        const next = [...prev];
        next[index] = uri;
        return next.filter(Boolean).slice(0, MAX_PHOTOS);
      });
    }
  };

  /* =======================
     REMOVE IMAGE
  ======================= */
  const removeImage = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <OnboardingLayout
    progress={
    <OnboardingProgress
      current={5}
      total={ONBOARDING_TOTAL_STEPS}
    />
  }
      footer={
        <Button
          title="Tiếp tục"
          onPress={() => navigation.navigate("PreferenceGender")}
          disabled={!hasPhoto}
          fullWidth
        />
      }
    >
      {/* BACK */}
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />

      {/* HEADER */}
      <Text variant="h1">Tải ảnh lên</Text>

      <Text variant="body">
        Hãy thêm ít nhất một ảnh để mọi người có thể nhận ra bạn.
      </Text>

      {/* GRID */}
      <View style={styles.grid}>
        {Array.from({ length: MAX_PHOTOS }).map((_, i) => {
          const uri = photos[i];

          return (
            <Pressable
              key={i}
              style={styles.photoBox}
              onPress={() => pickImage(i)}
            >
              {uri ? (
                <>
                  <Image source={{ uri }} style={styles.image} />
                  <Pressable
                    style={styles.removeBtn}
                    onPress={() => removeImage(i)}
                  >
                    <Ionicons
                      name="close"
                      size={16}
                      color="#fff"
                    />
                  </Pressable>
                </>
              ) : (
                <Ionicons
                  name="add"
                  size={32}
                  color={theme.colors.textMuted}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

export default UploadPhotosScreen;
