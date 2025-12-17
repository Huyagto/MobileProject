import { StyleSheet } from "react-native";

export default StyleSheet.create({
  like: {
    position: "absolute",
    top: 60,
    left: 24,
    borderWidth: 3,
    borderColor: "#4be3ac",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },

  nope: {
    position: "absolute",
    top: 60,
    right: 24,
    borderWidth: 3,
    borderColor: "#ff4458",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },

  likeText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4be3ac",
  },

  nopeText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ff4458",
  },
});
