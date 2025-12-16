// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartScreen from "@/feature/onboarding/screens/startScreen";
import HomeScreen from "@/feature/home/screens/homeScreen";

import { RootStackParamList } from "./type";

import SignUpPhoneScreen from "@/feature/auth/signup/screens/signUpPhoneScreen";
import OTPVerifyScreen from "@/feature/auth/screens/OTPVerifyScreen";
import CreateNameScreen from "@/feature/auth/signup/screens/createNameScreen";
import BirthdayScreen from "@/feature/auth/signup/screens/birthdayScreen";
import GenderScreen from "@/feature/auth/signup/screens/genderScreen";
import UploadPhotosScreen from "@/feature/auth/signup/screens/uploadPhotosScreen";
import PreferenceGenderScreen from "@/feature/auth/signup/screens/preferenceGenderScreen";
import InterestScreen from "@/feature/auth/signup/screens/interestScreen";
import HabitScreen from "@/feature/auth/signup/screens/habitScreen";
import SummaryScreen from "@/feature/auth/signup/screens/summaryScreen";
import LoginPhoneScreen from "@/feature/auth/signin/screens/loginPhoneScreen";

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
        {/* START */}
        <Stack.Screen name="Start" component={StartScreen} />

        {/* SIGN UP FLOW */}
        <Stack.Screen name="SignUpPhone" component={SignUpPhoneScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="CreateName" component={CreateNameScreen} />
        <Stack.Screen name="Birthday" component={BirthdayScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen} />

        {/* PREFERENCE & PROFILE */}
        <Stack.Screen
          name="PreferenceGender"
          component={PreferenceGenderScreen}
        />
        <Stack.Screen name="Interest" component={InterestScreen} />
        <Stack.Screen name="Habit" component={HabitScreen} />

        {/* FINISH */}
        <Stack.Screen name="Summary" component={SummaryScreen} />

        {/* HOME */}
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Login" component={LoginPhoneScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
