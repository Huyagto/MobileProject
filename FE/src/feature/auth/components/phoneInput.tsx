import React, { useState } from "react";
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

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.neutral50,
  },

  focused: {
    borderColor: theme.colors.primary,
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
  },

  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: theme.spacing.md,
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
        {/* COUNTRY */}
        <Pressable onPress={openPicker} style={styles.countryBtn}>
          <Text variant="body">
            {country.flag} {country.dial}
          </Text>
        </Pressable>

        {/* PHONE */}
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
        />
      </View>
    </View>
  );
};

export default PhoneInput;
