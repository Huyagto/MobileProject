// signup/style/signUpPhone.styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ===========================
  // MODAL PICKER
  // ===========================
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: "65%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#111",
  },

  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },

  countryFlag: {
    fontSize: 28,
    marginRight: 14,
  },

  countryInfo: {
    flexDirection: "column",
  },

  countryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  countryDial: {
    fontSize: 14,
    color: "#777",
  },

  // ===========================
  // PHONE INPUT UI
  // ===========================
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },

  countrySelect: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F5F5F7",
  },

  countryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#222",
  },

  underline: {
    height: 1.5,
    backgroundColor: "#DDD",
    marginTop: 4,
  },
  // =============================
// SIGN UP PHONE SCREEN
// =============================
container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#FFFFFF",
},

backBtn: {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5F5F7",
  marginBottom: 10,
},

title: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111",
  marginTop: 10,
},

desc: {
  fontSize: 15,
  color: "#666",
  marginTop: 4,
  marginBottom: 20,
},

nextBtn: {
  marginTop: 30,
  backgroundColor: "#B16CEA",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
},

nextTxt: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
},
});
