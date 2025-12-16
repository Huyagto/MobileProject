import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

import { Button, Text } from "@/ui";
import OnboardingLayout from "@/feature/auth/layouts/AuthLayout";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import { useSubmitOnboarding } from "@/feature/auth/signup/hooks/useSubmitOnboarding";

const SummaryScreen = ({ navigation }: any) => {
  const { data, reset } = useOnboarding();
  const { submitOnboarding, loading } = useSubmitOnboarding();

  /* ======================
     GET CURRENT LOCATION
  ====================== */
  const getCurrentLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Location permission denied");
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
  };

  /* ======================
     SUBMIT ONBOARDING
  ====================== */
  const onFinish = async () => {
    try {
      // 🔥 LẤY GPS
      const { latitude, longitude } =
        await getCurrentLocation();

      // 🔥 MAP DATA + GEOJSON
      const input = {
        name: data.name,
        gender: data.gender,
        birthday: data.birthday,
        preferenceGender: data.preferenceGender,
        interests: data.interests,
        habit: data.habits,

        // ✅ GEOJSON CHUẨN (Mongo 2dsphere)
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // lng, lat
        },
      };

      console.log("📤 submitOnboarding input:", input);

      await submitOnboarding(input);

      reset();

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (e: any) {
      console.log(
        "❌ submitOnboarding error:",
        e?.graphQLErrors || e?.message || e
      );

      Alert.alert(
        "Lỗi",
        "Không thể lấy vị trí hoặc hoàn tất đăng ký"
      );
    }
  };

  return (
    <OnboardingLayout
      footer={
        <Button
          title="Hoàn tất"
          onPress={onFinish}
          fullWidth
          disabled={loading}
        />
      }
    >
      <Text variant="h1">Xác nhận thông tin</Text>

      <Text>{data.name || ""}</Text>

<Text>{data.phone || ""}</Text>

<Text>{data.gender ?? ""}</Text>


    </OnboardingLayout>
  );
};

export default SummaryScreen;
