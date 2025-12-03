import { Colors } from "../tokens/colors";
import { Radius } from "../tokens/radius";
import { Spacing } from "../tokens/spacing";

export const InputTheme = {
  base: {
    height: 52,
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: 16,
  },

  variants: {
    filled: {
      backgroundColor: Colors.inputBg,
      borderColor: Colors.border,
      borderWidth: 1,
    },

    underline: {
      backgroundColor: "transparent",
      borderBottomWidth: 2,
      borderColor: Colors.primary,
      borderRadius: 0,
    },

    minimal: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
  },

  placeholder: {
    color: Colors.inputPlaceholder,
  },
};

