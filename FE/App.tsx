// App.tsx
import React from "react";
import AppNavigator from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/themes/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";
import { OnboardingProvider } from "@/feature/auth/signup/context/OnboardingContext";

export default function App() {
  return (
    <ThemeProvider>
      <OnboardingProvider>
      <ApolloProvider client={client}> 
        <AppNavigator/> 
        </ApolloProvider>
        </OnboardingProvider>
    </ThemeProvider>
  )
}
