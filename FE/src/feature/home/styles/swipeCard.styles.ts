import { createStyles } from "@/themes/helper/createStyles";

export const useStyles = createStyles(() => ({
  /* ===== CARD WRAPPER ===== */
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  /* ===== IMAGE ===== */
  image: {
    width: "100%",
    height: "100%",
  },

  /* ===== GRADIENT OVERLAY ===== */
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  /* ===== INFO ===== */
  info: {
    position: "absolute",
    bottom: 26,
    left: 22,
    right: 22,
  },

  /* ===== NAME + DISTANCE ===== */
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
  },

  distance: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.75,
  },

  /* ===== BIO ===== */
  bio: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 20,
    color: "#fff",
    opacity: 0.85,
  },
}));
