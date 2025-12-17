import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import styles from "@/feature/home/styles/actionBar.styles";

type Props = {
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void;
  disabled?: boolean;
};

const ActionBar = ({
  onLike,
  onDislike,
  onSuperLike,
  disabled,
}: Props) => {
  return (
    <View style={styles.container}>
      <ActionButton
        icon="close"
        color="#ff4458"
        onPress={onDislike}
        disabled={disabled}
      />

      <ActionButton
        icon="heart"
        color="#4be3ac"
        size={64}
        onPress={onLike}
        disabled={disabled}
      />

      {onSuperLike && (
        <ActionButton
          icon="star"
          color="#3b82f6"
          onPress={onSuperLike}
          disabled={disabled}
        />
      )}
    </View>
  );
};

export default ActionBar;

/* ======================
   BUTTON
====================== */
type BtnProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  onPress: () => void;
  disabled?: boolean;
};

const ActionButton = ({
  icon,
  color,
  size = 52,
  onPress,
  disabled,
}: BtnProps) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.4 : 1,
  }));

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => (scale.value = withSpring(0.9))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          animStyle,
        ]}
      >
        <Ionicons name={icon} size={28} color={color} />
      </Animated.View>
    </Pressable>
  );
};
