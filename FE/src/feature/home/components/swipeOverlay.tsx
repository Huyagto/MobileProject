import React from "react";
import { Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

import styles from "../styles/swipeOverlay.styles";

type Props = {
  translateX: SharedValue<number>;
};

const SwipeOverlay = ({ translateX }: Props) => {
  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [40, 120], [0, 1]),
    transform: [
      {
        scale: interpolate(translateX.value, [40, 120], [0.9, 1]),
      },
    ],
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-120, -40], [1, 0]),
    transform: [
      {
        scale: interpolate(translateX.value, [-120, -40], [1, 0.9]),
      },
    ],
  }));

  return (
    <>
      <Animated.View style={[styles.like, likeStyle]}>
        <Text style={styles.likeText}>LIKE</Text>
      </Animated.View>

      <Animated.View style={[styles.nope, nopeStyle]}>
        <Text style={styles.nopeText}>NOPE</Text>
      </Animated.View>
    </>
  );
};

export default SwipeOverlay;
