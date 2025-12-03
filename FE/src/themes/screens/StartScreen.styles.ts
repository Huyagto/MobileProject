import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../themes";

const StartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // gradient overlay
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },

  // logo
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  // app name
  appName: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight,
    color: Colors.text,
    marginTop: Spacing.md,
  },

  // tagline
  appTag: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: Typography.subtitle.fontWeight,
    color: Typography.subtitle.color,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },

  // button zone
  buttonArea: {
    marginTop: "auto",
    marginBottom: 80,
    paddingHorizontal: 24,
  },

  loginBtn: {
    marginBottom: Spacing.md,
  },

  registerBtn: {},
});

export default StartStyles;
