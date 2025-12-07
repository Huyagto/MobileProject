// src/navigation/type.ts
export type RootStackParamList = {
  Start: undefined;
  SignUpPhone: undefined;
  OTPVerify: { phone: string };
  CreateName: { phone: string; name?: string };
  Birthday: { phone: string; name?: string };
  Gender: { phone: string; name?: string; birthday?: string };
  UploadPhotos: { phone?: string; name?: string; birthday?: string; gender?: string };
  Home: undefined;
  Login: undefined;
};
