import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import SwipeCard from "./swipeCard";
import SwipeOverlay from "./swipeOverlay";
import StackCard from "./stackCard";
import styles from "../styles/swipeDeck.styles";

/* ====================== */
export type SwipeDeckRef = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

type Props = {
  data: any[];
  onSwipe?: (profile: any, dir: "left" | "right") => void;
};

/* ====================== */
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const MAX_STACK = 4;

/* ====================== */
const SwipeDeck = forwardRef<SwipeDeckRef, Props>(
  ({ data, onSwipe }, ref) => {
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    /* ✅ reset index khi data đổi (refetch an toàn) */
    useEffect(() => {
      setIndex(0);
    }, [data]);

    /* ======================
       SWIPE LOGIC (JS SAFE)
    ====================== */
    const swipeOut = (dir: "left" | "right") => {
      if (isAnimating) return;

      const current = data[index];
      if (!current) return;

      setIsAnimating(true);

      translateX.value = withTiming(
        dir === "right"
          ? SCREEN_WIDTH * 1.2
          : -SCREEN_WIDTH * 1.2,
        { duration: 260 },
        () => {
          runOnJS(() => {
            onSwipe?.(current, dir);
            setIndex((i) => i + 1);
            setIsAnimating(false);
          })();

          translateX.value = 0;
          translateY.value = 0;
        }
      );
    };

    /* ======================
       REF API
    ====================== */
    useImperativeHandle(ref, () => ({
      swipeLeft: () => swipeOut("left"),
      swipeRight: () => swipeOut("right"),
    }));

    /* ======================
       GESTURE
    ====================== */
    const panGesture = Gesture.Pan()
      .enabled(!isAnimating && index < data.length)
      .onUpdate((e) => {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      })
      .onEnd(() => {
        if (translateX.value > SWIPE_THRESHOLD) {
          runOnJS(swipeOut)("right");
        } else if (translateX.value < -SWIPE_THRESHOLD) {
          runOnJS(swipeOut)("left");
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      });

    const topCardStyle = useAnimatedStyle(() => {
      const rotate = interpolate(
        translateX.value,
        [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        [-15, 0, 15]
      );

      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` },
        ],
      };
    });

    if (index >= data.length) {
      return <View style={{ flex: 1 }} />;
    }

    return (
      <View style={styles.container}>
        {data
          .slice(index, index + MAX_STACK)
          .map((profile, i) =>
            i === 0 ? (
              <GestureDetector
                key={profile.userId ?? `${index}-${i}`}
                gesture={panGesture}
              >
                <Animated.View style={[styles.card, topCardStyle]}>
                  <SwipeCard profile={profile} />
                  <SwipeOverlay translateX={translateX} />
                </Animated.View>
              </GestureDetector>
            ) : (
              <StackCard
                key={profile.userId ?? `${index}-${i}`}
                profile={profile}
                index={i}
                translateX={translateX}
                swipeThreshold={SWIPE_THRESHOLD}
              />
            )
          )
          .reverse()}
      </View>
    );
  }
);

export default SwipeDeck;
