import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { SUBMIT_ONBOARDING } from "@/feature/auth/signup/graphql/auth.graphql";
import { OnboardingData } from "@/feature/auth/signup/types/onboarding";

export const useSubmitOnboarding = () => {
  const [submit, state] = useMutation(SUBMIT_ONBOARDING);

  const submitOnboarding = async (input: OnboardingData) => {
    const signupToken = await SecureStore.getItemAsync("signup_token");

    if (!signupToken) {
      throw new Error("Missing signup token");
    }

    const res = await submit({
      variables: {
        signupToken,
        input,
      },
    });

    const accessToken = res.data?.submitOnboarding?.accessToken;

    if (!accessToken) {
      throw new Error("Submit onboarding failed");
    }

    // 🔥🔥🔥 LƯU ACCESS TOKEN TẠI ĐÂY
    await SecureStore.setItemAsync("access_token", accessToken);

    console.log("🔐 saved access token:", accessToken);

    return res.data.submitOnboarding;
  };

  return {
    submitOnboarding,
    loading: state.loading,
    error: state.error,
  };
};
