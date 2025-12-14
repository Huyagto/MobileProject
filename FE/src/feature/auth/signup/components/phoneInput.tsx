import React from "react";
import { View, TextInput, Pressable } from "react-native";

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

/* =======================
   STYLES (COMPONENT-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },

  countrySelect: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.md,
    marginRight: theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
  },
}));

const PhoneInput = ({ phone, setPhone, country, openPicker }: Props) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View>
      <View style={styles.phoneRow}>
        {/* COUNTRY */}
        <Pressable onPress={openPicker} style={styles.countrySelect}>
          <Text variant="body">
            {country.flag} {country.dial} ▼
          </Text>
        </Pressable>

        {/* PHONE */}
        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
          placeholder="Số điện thoại"
          placeholderTextColor={theme.colors.textMuted}
        />
      </View>
    </View>
  );
};

export default PhoneInput;
