// App.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/themes/themeContext";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/graphql/apolloClient";
import { OnboardingProvider } from "@/feature/auth/signup/context/OnboardingContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <OnboardingProvider>
          <ApolloProvider client={apolloClient}>
            <AppNavigator />
          </ApolloProvider>
        </OnboardingProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
