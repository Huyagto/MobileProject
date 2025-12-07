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
    marginBottom: Spacing.lg,
  },

  option: {
    paddingVertical: 14,
    borderWidth: 1.5,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  optionText: {
    fontSize: 18,
  },

  nextBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.xl,
  },

  nextTxt: {
    fontSize: 18,
    fontWeight: "700",
  },
});
