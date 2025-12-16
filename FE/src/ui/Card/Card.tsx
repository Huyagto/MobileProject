import React from "react";
import { View } from "react-native";
import { useStyles } from "./card.theme";

type Props = {
  children: React.ReactNode;
  style?: any;
};

export const Card = ({ children, style }: Props) => {
  const styles = useStyles(); // 🔥 ĐÚNG

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default Card;
