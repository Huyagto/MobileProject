import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { OnboardingData } from "@/feature/auth/signup/types/onboarding";

/* ======================
   CONTEXT TYPE
====================== */
type OnboardingContextType = {
  data: OnboardingData;

  // update các field thường (name, gender, interests…)
  update: (payload: Partial<OnboardingData>) => void;

  // quản lý ảnh (🔥 QUAN TRỌNG)
  addPhoto: (url: string) => void;
  removePhoto: (index: number) => void;
  setPhotos: (photos: string[]) => void;

  reset: () => void;
};

/* ======================
   DEFAULT DATA
====================== */
const createDefaultOnboardingData = (): OnboardingData => ({
  name: "",
  phone: "",
  gender: undefined,
  birthday: undefined,
  habits: [],
  interests: [],
  preferenceGender: [],
  photos: [],
});

/* ======================
   CONTEXT
====================== */
const OnboardingContext =
  createContext<OnboardingContextType | null>(null);

/* ======================
   PROVIDER
====================== */
export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<OnboardingData>(
    createDefaultOnboardingData()
  );

  /* ======================
     UPDATE BASIC FIELDS
     (KHÔNG ĐỘNG ẢNH)
  ====================== */
  const update = useCallback(
    (payload: Partial<OnboardingData>) => {
      setData((prev) => ({
        ...prev,
        ...payload,
        photos: payload.photos ?? prev.photos, // ⚠️ bảo vệ ảnh
      }));
    },
    []
  );

  /* ======================
     ADD PHOTO
  ====================== */
  const addPhoto = useCallback((url: string) => {
    setData((prev) => {
      // tránh trùng ảnh
      if (prev.photos.includes(url)) return prev;

      return {
        ...prev,
        photos: [...prev.photos, url],
      };
    });
  }, []);

  /* ======================
     REMOVE PHOTO
  ====================== */
  const removePhoto = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }, []);

  /* ======================
     SET PHOTOS (OPTIONAL)
  ====================== */
  const setPhotos = useCallback((photos: string[]) => {
    setData((prev) => ({
      ...prev,
      photos,
    }));
  }, []);

  /* ======================
     RESET
  ====================== */
  const reset = useCallback(() => {
    setData(createDefaultOnboardingData());
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        data,
        update,
        addPhoto,
        removePhoto,
        setPhotos,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

/* ======================
   HOOK
====================== */
export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }
  return ctx;
};
