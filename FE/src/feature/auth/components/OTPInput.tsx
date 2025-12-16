import React, { useRef } from "react";
import { TextInput, View } from "react-native";
import { createStyles } from "@/themes/helper/createStyles";

const useStyles = createStyles((theme) => ({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
  },
}));

type Props = {
  length: number;
  value: string[];
  onChange: (v: string[]) => void;
  autoFocus?: boolean;
};

const OTPInput = ({
  length,
  value,
  onChange,
  autoFocus,
}: Props) => {
  const styles = useStyles();
  const refs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const digits = text.replace(/\D/g, "");

    const next = [...value];

    // 🔥 XÓA
    if (digits.length === 0) {
      next[index] = "";
      onChange(next);
      return;
    }

    // 🔥 PASTE FULL OTP
    if (digits.length === length) {
      onChange(digits.split(""));
      refs.current[length - 1]?.focus();
      return;
    }

    // 🔥 NHẬP 1 SỐ
    next[index] = digits[digits.length - 1];
    onChange(next);

    if (index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: any,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (value[index]) {
        // 🔥 XÓA Ô HIỆN TẠI
        const next = [...value];
        next[index] = "";
        onChange(next);
      } else if (index > 0) {
        // 🔥 LÙI VỀ Ô TRƯỚC + XÓA
        const next = [...value];
        next[index - 1] = "";
        onChange(next);
        refs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(r) => {
            if (r) refs.current[i] = r;
          }}
          value={value[i]}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          style={styles.input}
        />
      ))}
    </View>
  );
};

export default OTPInput;
