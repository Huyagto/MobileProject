import { createStyles } from "@/themes/helper/createStyles";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const useStyles = createStyles((theme) => ({
  card: {
    width: width - 32,
    height: height * 0.72,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    backgroundColor: theme.colors.neutral900,
    alignSelf: "center",
    ...theme.shadows.lg,
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    height: "45%",
    width: "100%",
  },

  info: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
  },

  name: {
    color: theme.colors.neutral0,
  },

  bio: {
    color: theme.colors.neutral100,
    marginTop: 6,
  },
}));
