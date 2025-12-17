import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";
import { Text } from "@/ui/Text";

import type { Country } from "@/utils/countries";

type Props = {
  phone: string;
  setPhone: (v: string) => void;
  country: Country;
  openPicker: () => void;
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,

    // 🔥 FIX ANDROID TOUCH + RIPPLE
    overflow: "hidden",
  },

  focused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.md,
    marginRight: theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,

    // 🔥 QUAN TRỌNG: KHÔNG CHO GIÃN ĂN TOUCH
    flexShrink: 0,
  },

  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: theme.spacing.lg,
    color: theme.colors.text,
  },
}));

const PhoneInput = ({
  phone,
  setPhone,
  country,
  openPicker,
}: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        focused && styles.focused,
      ]}
    >
      <View style={styles.row}>
        {/* ===== COUNTRY PICKER ===== */}
        <TouchableOpacity
          onPress={openPicker}
          style={styles.countryBtn}
          activeOpacity={0.6}
        >
          <Text variant="body">
            {country.flag} {country.dial}
          </Text>
        </TouchableOpacity>

        {/* ===== PHONE INPUT ===== */}
        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={(v) =>
            setPhone(v.replace(/\D/g, ""))
          }
          keyboardType="number-pad"
          placeholder="Số điện thoại"
          placeholderTextColor={theme.colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          returnKeyType="done"
          textContentType={
            Platform.OS === "ios"
              ? "telephoneNumber"
              : "none"
          }
        />
      </View>
    </View>
  );
};

export default PhoneInput;
