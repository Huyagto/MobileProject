import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/ui";
import { LinearGradient } from "expo-linear-gradient";
import { useStyles } from "../styles/swipeCard.styles";

const SwipeCard = ({ profile }: any) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      {/* BACKGROUND IMAGE */}
      <Image
        source={{ uri: profile.avatar }}
        style={styles.image}
      />

      {/* GRADIENT OVERLAY */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={styles.overlay}
      />

      {/* INFO */}
      <View style={styles.info}>
        <Text variant="h2" style={styles.name}>
          {profile.name}, {profile.age}
        </Text>

        {profile.bio && (
          <Text variant="body" style={styles.bio} numberOfLines={2}>
            {profile.bio}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SwipeCard;
