import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import styles from "@/feature/onboarding/style/startScreen.styles";


const StartScreen = ({ navigation }: any) => {
  const pulse = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(floatY, {
            toValue: -6,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatY, {
            toValue: 0,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["#FFF1F2", "#FDF4FF", "#EEF2FF"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* ===== HERO ===== */}
        <View style={styles.hero}>
          <View style={styles.glowPrimary} />
          <View style={styles.glowSecondary} />

          <Animated.Text
            style={[
              styles.icon,
              {
                transform: [
                  { scale: pulse },
                  { translateY: floatY },
                ],
              },
            ]}
          >
            💗
          </Animated.Text>

          <Text style={styles.title}>
            Find your{"\n"}real connection
          </Text>

          <Text style={styles.subtitle}>
            Real people · Real vibes · Real conversations
          </Text>
        </View>

        {/* ===== ACTIONS ===== */}
        <View style={styles.actions}>
          <Button
  title="Create an account"
  variant="primaryGradient"
  fullWidth
  onPress={() => navigation.navigate("SignUpPhone")}
/>


          <Pressable
            onPress={() => navigation.navigate("Login")}
            android_ripple={{ color: "rgba(99,102,241,0.08)" }}
          >
            <Text style={styles.loginText}>
              I already have an account
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default StartScreen;
