import { StyleSheet } from "react-native";
import { Spacing } from "@/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },

  gradientBg: {
    ...StyleSheet.absoluteFillObject,
  },

  heartIcon: {
    fontSize: 90,
    marginBottom: 30,
  },

  title: {
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 12,
    width: "80%",
  },

  buttonWrapper: {
    marginTop: 40,
    alignSelf: "center",
    width: "70%",
  },
});
