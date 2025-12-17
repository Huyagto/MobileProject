import React from "react";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

import SwipeCard from "./swipeCard";
import styles from "../styles/swipeDeck.styles";

type Props = {
  profile: any;
  index: number;
  translateX: SharedValue<number>; // ✅ FIX
  swipeThreshold: number;
};

const StackCard = ({
  profile,
  index,
  translateX,
  swipeThreshold,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const p = Math.min(
      Math.abs(translateX.value) / swipeThreshold,
      1
    );

    return {
      transform: [
        { scale: 1 - index * 0.04 + p * 0.04 },
        { translateY: index * 14 - p * 14 },
      ],
      opacity: 1 - index * 0.15,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <SwipeCard profile={profile} />
    </Animated.View>
  );
};

export default StackCard;
