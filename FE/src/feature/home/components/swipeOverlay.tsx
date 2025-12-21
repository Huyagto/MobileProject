import React from "react";
import { View } from "react-native";
import { Text } from "@/ui";
import useStyles from "@/feature/home/styles/swipeOverlay.styles";

const SwipeOverlay = ({ type }: { type: "like" | "nope" }) => {
  const styles = useStyles(type);

  return (
    <View style={styles.container}>
      <Text variant="h2">{type === "like" ? "LIKE" : "NOPE"}</Text>
    </View>
  );
};

export default SwipeOverlay;
