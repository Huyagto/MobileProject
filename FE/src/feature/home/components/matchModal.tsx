import React from "react";
import { Modal, View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/ui";

type Props = {
  visible: boolean;
  profile?: {
    name: string;
    avatar?: string;
  };
  matchId?: string;
  onClose: () => void;
};

const MatchModal = ({
  visible,
  profile,
  matchId,
  onClose,
}: Props) => {
  if (!profile) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.85)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="h1">It's a Match 🎉</Text>

        <Image
          source={{
            uri:
              profile.avatar ??
              "https://i.pravatar.cc/300",
          }}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            marginVertical: 20,
          }}
        />

        <Text variant="h2">
          You & {profile.name} liked each other
        </Text>

        {/* Sau này: GO TO CHAT */}
        <TouchableOpacity
          onPress={onClose}
          style={{ marginTop: 30 }}
        >
          <Text>Continue Swiping</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MatchModal;
