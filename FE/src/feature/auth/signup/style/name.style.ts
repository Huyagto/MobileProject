import { StyleSheet } from "react-native";
import { Spacing, Radius, Typography } from "@/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },

  title: {
    ...Typography.h2,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },

  subtitle: {
    ...Typography.body,
    marginBottom: Spacing.lg,
  },

  input: {
    borderBottomWidth: 2,
    fontSize: 20,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xxl,
  },

  nextBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.lg,
  },

  nextTxt: {
    fontSize: 18,
    fontWeight: "700",
  },
});
