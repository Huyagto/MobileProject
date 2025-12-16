import React from "react";
import HomeLayout from "@/feature/home/layouts/homeLayout";
import SwipeDeck from "@/feature/home/components/swipeDeck";

const HomeScreen = () => {
  return (
    <HomeLayout>
      <SwipeDeck />
    </HomeLayout>
  );
};

export default HomeScreen;
