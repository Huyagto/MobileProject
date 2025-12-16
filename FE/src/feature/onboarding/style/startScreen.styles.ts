import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 48,
    justifyContent: "space-between",
  },

  hero: {
    alignItems: "center",
    marginTop: 150,
  },

  /* ===== GLOW ===== */
  glowPrimary: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#F472B6",
    opacity: 0.22,
    top: -60,
  },

  glowSecondary: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#818CF8",
    opacity: 0.18,
    top: -20,
  },

  icon: {
    fontSize: 82,
    marginBottom: 30,
  },

  title: {
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    color: "#0F172A",
    letterSpacing: -1,
    lineHeight: 44,
  },

  subtitle: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#475569",
    maxWidth: 320,
  },

  actions: {
    gap: 20,
  },

  loginText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#6366F1",
    opacity: 0.85,
  },
});
