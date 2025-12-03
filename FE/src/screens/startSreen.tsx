import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/button";
import StartStyles from "../themes/screens/StartScreen.styles";
import { Colors } from "../themes/";

const StartScreen = () => {
  return (
    <View style={StartStyles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary, Colors.accent]}
        style={StartStyles.gradientBg}
      />

      {/* Logo */}
      <View style={StartStyles.logoContainer}>
        {/* <Image
          source={require("../../assets/logo.png")}
          style={StartStyles.logo}
        /> */}

        <Text style={StartStyles.appName}>Luv</Text>
        <Text style={StartStyles.appTag}>
          Find your match. Vibe your style.
        </Text>
      </View>

      {/* Buttons */}
      <View style={StartStyles.buttonArea}>
        <View style={StartStyles.loginBtn}>
          <Button text="Đăng nhập" variant="loginStart" onPress={() => {}} />
        </View>

        <View style={StartStyles.registerBtn}>
          <Button text="Tạo tài khoản" variant="loginStart" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default StartScreen;
