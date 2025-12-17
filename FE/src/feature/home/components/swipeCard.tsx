import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/ui";
import { LinearGradient } from "expo-linear-gradient";
import { useStyles } from "../styles/swipeCard.styles";

/* ======================
   TYPES
====================== */
type Profile = {
  userId: string;
  name?: string;
  birthday?: string;
  avatar?: string | null;
  bio?: string;
  distance?: number;
};

/* ======================
   HELPERS
====================== */
const calcAge = (birthday?: string) => {
  if (!birthday) return "";
  const birth = new Date(birthday);
  if (isNaN(birth.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age > 0 ? age : "";
};

const formatDistance = (m?: number) => {
  if (typeof m !== "number") return "";
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
};

const safeImageUri = (uri?: string | null) => {
  if (!uri) return null;
  const trimmed = uri.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") {
    return null;
  }
  return trimmed;
};

/* ======================
   COMPONENT
====================== */
const SwipeCard = ({ profile }: { profile?: Profile }) => {
  if (!profile) return null; // 🔥 CỨU APP

  const styles = useStyles();
  const age = calcAge(profile.birthday);

  const avatarUri =
    safeImageUri(profile.avatar) ??
    "https://i.pravatar.cc/600?img=12";

  return (
    <View style={styles.card}>
      {/* BACKGROUND IMAGE */}
      <Image
        source={{ uri: avatarUri }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* GRADIENT OVERLAY */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={styles.overlay}
      />

      {/* INFO */}
      <View style={styles.info}>
        <View style={styles.row}>
          <Text variant="h2" style={styles.name}>
            {profile.name ?? ""}
            {age ? `, ${age}` : ""}
          </Text>

          {typeof profile.distance === "number" && (
            <Text variant="caption" style={styles.distance}>
              {formatDistance(profile.distance)}
            </Text>
          )}
        </View>

        {!!profile.bio && (
          <Text
            variant="body"
            style={styles.bio}
            numberOfLines={2}
          >
            {profile.bio}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SwipeCard;
