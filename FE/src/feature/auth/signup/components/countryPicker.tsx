import React from "react";
import {
  Modal,
  View,
  FlatList,
  Pressable,
} from "react-native";

import { createStyles } from "@/themes/helper/createStyles";
import { useTheme } from "@/themes/themeContext";
import { Text } from "@/ui/Text";

import { countries } from "@/utils/countries";

type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  setCountry: (c: Country) => void;
};

/* =======================
   STYLES (COMPONENT-LEVEL)
======================= */
const useStyles = createStyles((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  container: {
    maxHeight: "75%",
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingTop: theme.spacing.lg,
  },

  title: {
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },

  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  flag: {
    fontSize: 22,
    marginRight: theme.spacing.md,
  },

  info: {
    flex: 1,
  },

  dial: {
    marginTop: theme.spacing.xs,
  },
}));

const CountryPicker = ({ visible, onClose, setCountry }: Props) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* MODAL CONTENT */}
        <Pressable style={styles.container}>
          <Text variant="h2" style={styles.title}>
            Chọn quốc gia
          </Text>

          <FlatList
            data={countries}
            keyExtractor={(it) => it.code}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.countryItem}
                onPress={() => {
                  setCountry(item);
                  onClose();
                }}
              >
                <Text style={styles.flag}>{item.flag}</Text>

                <View style={styles.info}>
                  <Text variant="body">{item.name}</Text>
                  <Text variant="caption" style={styles.dial}>
                    {item.dial}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CountryPicker;
