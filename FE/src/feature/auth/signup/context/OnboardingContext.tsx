import React, { createContext, useContext, useState } from "react";
import { OnboardingData } from "@/feature/auth/signup/types/onboarding";

type OnboardingContextType = {
  data: OnboardingData;
  update: (payload: Partial<OnboardingData>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<OnboardingData>({});

  const update = (payload: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...payload }));
  };

  const reset = () => {
    setData({});
  };

  return (
    <OnboardingContext.Provider value={{ data, update, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }
  return ctx;
};
