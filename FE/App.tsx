// App.tsx
import React from "react";
import AppNavigator from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/themes/themeContext";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import apolloClient from "@/graphql/apolloClient";
import { OnboardingProvider } from "@/feature/auth/signup/context/OnboardingContext";

export default function App() {
  return (
    <ThemeProvider>
      <OnboardingProvider>
      <ApolloProvider client={apolloClient}> 
        <AppNavigator/> 
        </ApolloProvider>
        </OnboardingProvider>
    </ThemeProvider>
  )
}
