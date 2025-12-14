import { Button, Text } from "@/ui";
import { useOnboarding } from "@/feature/auth/signup/context/OnboardingContext";
import OnboardingLayout from "@/feature/auth/signup/layouts/OnboardingLayout";
import { Alert } from "react-native";
import { useSubmitOnboarding } from "@/feature/auth/signup/hooks/useSubmitOnboarding";

const SummaryScreen = ({ navigation }: any) => {
  const { data, reset } = useOnboarding(); // CONTEXT
const { submitOnboarding, loading } = useSubmitOnboarding(); // GRAPHQL
  const onFinish = async () => {
    try {
      await submitOnboarding(data);

      reset(); // ✅ clear onboarding context

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (e) {
      Alert.alert(
        "Lỗi",
        "Không thể hoàn tất đăng ký, vui lòng thử lại"
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
        />
      }
    >
      <Text variant="h1">Xác nhận thông tin</Text>

      <Text>{data.name}</Text>
      <Text>{data.phone}</Text>
      <Text>{data.gender}</Text>
    </OnboardingLayout>
  );
};

export default SummaryScreen;
