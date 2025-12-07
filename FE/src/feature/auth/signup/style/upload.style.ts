import { StyleSheet } from "react-native";
import { Radius, Spacing } from "@/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  photoBox: {
    width: "48%",
    height: 180,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },

  img: {
    width: "100%",
    height: "100%",
  },

  uploadBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: 20,
  },

  uploadTxt: {
    fontSize: 18,
    fontWeight: "700",
  },
});
