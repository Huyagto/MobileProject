import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

import SwipeCard from "./swipeCard";
import useStyles from "../styles/swipeDeck.styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

const mockProfiles = [
  {
    id: "1",
    name: "Anna",
    age: 23,
    avatar: "https://i.pravatar.cc/400?img=1",
    bio: "Love coffee and travel",
  },
  {
    id: "2",
    name: "Linh",
    age: 25,
    avatar: "https://i.pravatar.cc/400?img=2",
    bio: "Chill vibes only",
  },
];

const SwipeDeck = () => {
  const styles = useStyles();
  const [profiles, setProfiles] = useState(mockProfiles);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeOut("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeOut("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeOut = (direction: "left" | "right") => {
    Animated.timing(position, {
      toValue: {
        x: direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      removeTopCard();
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const removeTopCard = () => {
    setProfiles((prev) => prev.slice(1));
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  return (
    <View style={styles.container}>
      {profiles
        .map((profile, index) => {
          if (index === 0) {
            return (
              <Animated.View
                key={profile.id}
                {...panResponder.panHandlers}
                style={[
                  styles.cardWrapper,
                  {
                    transform: [
                      { translateX: position.x },
                      { translateY: position.y },
                      { rotate },
                    ],
                  },
                ]}
              >
                <SwipeCard profile={profile} />
              </Animated.View>
            );
          }

          return (
            <View
              key={profile.id}
              style={styles.stackedCard(index)}
            >
              <SwipeCard profile={profile} />
            </View>
          );
        })
        .reverse()}
    </View>
  );
};

export default SwipeDeck;
