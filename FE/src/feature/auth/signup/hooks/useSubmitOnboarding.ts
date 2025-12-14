import { useMutation } from "@apollo/client";
import { SUBMIT_ONBOARDING } from "@/feature/auth/signup/graphql/auth.graphql";
import { OnboardingData } from "@/feature/auth/signup/types/onboarding";

export const useSubmitOnboarding = () => {
  const [submit, state] = useMutation(SUBMIT_ONBOARDING);

  return {
    submitOnboarding: (input: OnboardingData) =>
      submit({ variables: { input } }),
    ...state,
  };
};
