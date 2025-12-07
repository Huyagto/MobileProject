// src/feature/auth/signup/style/otpVerify.styles.ts
import { StyleSheet } from "react-native";
import { Spacing, Radius, Typography } from "@/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },

  backBtn: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.h2,
    fontWeight: "700",
  },

  subtitle: {
    ...Typography.body,
    marginVertical: Spacing.xs,
    marginBottom: Spacing.xl,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },

  otpInput: {
    width: 48,
    height: 55,
    borderRadius: Radius.md,
    borderWidth: 1.4,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  resendBtn: {
    marginTop: Spacing.sm,
  },

  resendText: {
    textAlign: "center",
    fontWeight: "700",
  },
});
