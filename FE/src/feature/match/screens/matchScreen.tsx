import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "@/ui";
import { useMyMatches } from "../hooks/useMyMatches";

const MatchScreen = () => {
  const { matches, loading } = useMyMatches();

  if (loading) return null;

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text variant="h2">Match ID: {item.id}</Text>
          <Text variant="caption">
            Users: {item.users.join(", ")}
          </Text>
        </View>
      )}
    />
  );
};

export default MatchScreen;
