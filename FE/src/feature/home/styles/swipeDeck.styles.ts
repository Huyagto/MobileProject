import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.92;
const CARD_HEIGHT = height * 0.78;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
    backgroundColor: "#000",

    /* ===== SHADOW IOS ===== */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    /* ===== SHADOW ANDROID ===== */
    elevation: 10,
  },
});
