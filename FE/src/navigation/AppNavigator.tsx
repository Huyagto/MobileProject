// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartScreen from "@/feature/onboarding/screens/startScreen";
import { RootStackParamList } from "./type";
import OTPVerifyScreen from "@/feature/auth/signup/screens/OTPVerifyScreen";
import CreateNameScreen from "@/feature/auth/signup/screens/createNameScreen";
import BirthdayScreen from "@/feature/auth/signup/screens/birthdayScreen";
import GenderScreen from "@/feature/auth/signup/screens/genderScreen";
import UploadPhotosScreen from "@/feature/auth/signup/screens/uploadPhotosScreen";
import SignUpPhoneScreen from "@/feature/auth/signup/screens/signUpPhoneScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignUpPhone" component={SignUpPhoneScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="CreateName" component={CreateNameScreen} />
        <Stack.Screen name="Birthday" component={BirthdayScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen} />
        {/* <Stack.Screen name="Login" component={Login} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
