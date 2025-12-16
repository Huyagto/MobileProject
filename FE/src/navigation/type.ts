// src/navigation/type.ts
export type RootStackParamList = {
  // ENTRY
  Start: undefined;
  Login: undefined;

  // SIGN UP FLOW
  SignUpPhone: undefined;
  OTPVerify: {
    phone: string;
    flow: "signin" | "signup";
  };

  CreateName: undefined;
  Birthday: undefined;
  Gender: undefined;
  UploadPhotos: undefined;
  PreferenceGender: undefined;
  Interest: undefined;
  Habit: undefined;
  Summary: undefined;

  // MAIN APP
  Home: undefined;
};
