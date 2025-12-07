// src/features/auth/signup/components/CountryPicker.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { countries } from "@/utils/countries";
import styles from "@/feature/auth/signup/style/signUpPhone.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  setCountry: (c: any) => void;
};

const CountryPicker = ({ visible, onClose, setCountry }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        {/* MODAL BOX */}
        <Pressable style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn quốc gia</Text>

          <FlatList
            data={countries}
            keyExtractor={(it) => it.code}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.countryItem}
                onPress={() => {
                  setCountry(item);
                  onClose();
                }}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>

                <View style={styles.countryInfo}>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryDial}>{item.dial}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CountryPicker;
