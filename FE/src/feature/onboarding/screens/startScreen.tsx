import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "@/themes/themeContext";
import { Button } from "@/ui/Button/button";
import StartStyles from "@/feature/onboarding/style/startScreen.styles";

const StartScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { colors, typography } = theme;

  /** HEART ANIMATION */
  const heartScale = useRef(new Animated.Value(1)).current;
  const heartTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(heartScale, {
            toValue: 1.25,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(heartScale, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(heartTranslate, {
            toValue: -12,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(heartTranslate, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  /** BUTTON PULSE */
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.07,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={StartStyles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.accent]}
        style={StartStyles.gradientBg}
      />

      {/* HEART */}
      <Animated.Text
        style={[
          StartStyles.heartIcon,
          { transform: [{ scale: heartScale }, { translateY: heartTranslate }] },
        ]}
      >
        💖
      </Animated.Text>

      <Text style={[StartStyles.title, typography.h1, { color: colors.neutral0 }]}>
        Find Your Match
      </Text>

      <Text style={[StartStyles.subtitle, typography.body, { color: colors.neutral0 }]}>
        Swipe, match, and chat with amazing people nearby
      </Text>

      <View style={StartStyles.buttonWrapper}>
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Button
            title="Get Started"
            variant="primaryGradient"
            onPress={() => navigation.navigate("SignUpPhone")}
          />
        </Animated.View>

        {/* Always show LOGIN now */}
        <Button
          title="Log In"
          variant="primaryGlow"
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default StartScreen;
