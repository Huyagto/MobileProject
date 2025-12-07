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
    marginBottom: Spacing.md,
  },

  subtitle: {
    ...Typography.body,
    marginBottom: Spacing.lg,
  },

  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.lg,
  },

  input: {
    width: "30%",
    borderBottomWidth: 2,
    fontSize: 22,
    textAlign: "center",
    paddingVertical: Spacing.sm,
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

