import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";

import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
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

/* =======================
   UPLOAD API (FIXED)
======================= */
const uploadImage = async (localUri: string): Promise<string> => {
  const formData = new FormData();

  formData.append("file", {
    uri: localUri,
    name: "photo.jpg",
    type: "image/jpeg",
  } as any);

  // ⚠️ Android emulator: 10.0.2.2
  // ⚠️ Máy thật: IP LAN (vd: 192.168.1.5)
  const res = await fetch("http://10.0.2.2:3000/upload", {
    method: "POST",
    body: formData, // ❗ KHÔNG set Content-Type
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("UPLOAD FAIL:", res.status, text);
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.url; // ✅ URL public
};

/* =======================
   COMPONENT
======================= */
const UploadPhotosScreen = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();

  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const { update } = useOnboarding();

  /* ✅ Lưu URL ảnh vào onboarding context */
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
        "Vui lòng cho phép truy cập thư viện ảnh",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      setUploading(true);

      const localUri = result.assets[0].uri;
      const uploadedUrl = await uploadImage(localUri); // 🔥 UPLOAD

      setPhotos((prev) => {
        const next = [...prev];
        next[index] = uploadedUrl;
        return next.filter(Boolean).slice(0, MAX_PHOTOS);
      });
    } catch (e) {
      Alert.alert("Lỗi", "Không thể tải ảnh lên");
    } finally {
      setUploading(false);
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
          current={4}
          total={ONBOARDING_TOTAL_STEPS}
        />
      }
      footer={
        <Button
          title={uploading ? "Đang tải ảnh..." : "Tiếp tục"}
          onPress={() =>
            navigation.navigate("PreferenceGender")
          }
          disabled={!hasPhoto || uploading}
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
              disabled={uploading}
            >
              {uri ? (
                <>
                  <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
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
