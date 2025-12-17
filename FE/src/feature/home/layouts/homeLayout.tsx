import React, { useRef, useState } from "react";
import { View } from "react-native";

import SwipeDeck, { SwipeDeckRef } from "../components/swipeDeck";
import ActionBar from "../components/actionBar";
import MatchModal from "../components/matchModal";

import { useNearbyProfiles } from "../hooks/useNearbyProfiles";
import { useSwipeActions } from "../hooks/useSwipeActions";
import { Profile } from "../types/profile";

const HomeLayout = () => {
  const deckRef = useRef<SwipeDeckRef>(null);

  const { profiles, loading } = useNearbyProfiles(2_000_000);
  const { swipeLeft, swipeRight } = useSwipeActions();

  const [matchedUser, setMatchedUser] = useState<Profile | null>(null);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [swiping, setSwiping] = useState(false);

  if (loading) return null;

  const handleLike = async (profile: Profile) => {
    if (swiping) return;
    setSwiping(true);

    try {
      const result = await swipeRight(profile.userId);

      if (result?.matched) {
        setTimeout(() => {
          setMatchedUser(profile);
          setMatchId(result.matchId ?? null);
          setShowMatchModal(true);
        }, 300);
      }
    } catch (e) {
      console.log("LIKE ERROR", e);
    } finally {
      setSwiping(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SwipeDeck
        ref={deckRef}
        data={profiles}
        onSwipe={(profile, dir) => {
          if (!profile) return;

          if (dir === "right") {
            handleLike(profile);
          } else {
            swipeLeft(profile.userId);
          }
        }}
      />

      <ActionBar
        onLike={() => !swiping && deckRef.current?.swipeRight()}
        onDislike={() => !swiping && deckRef.current?.swipeLeft()}
      />

      {showMatchModal && matchedUser && (
        <MatchModal
          visible
          profile={matchedUser}
          matchId={matchId ?? undefined}
          onClose={() => {
            setShowMatchModal(false);
            setMatchedUser(null);
            setMatchId(null);
          }}
        />
      )}
    </View>
  );
};

export default HomeLayout;
