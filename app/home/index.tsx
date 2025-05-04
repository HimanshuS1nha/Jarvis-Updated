import { View } from "react-native";
import React from "react";
import tw from "twrnc";

import ThemedView from "@/components/themed-view";

const Home = () => {
  return (
    <ThemedView>
      <View style={tw`flex-1 pt-3 gap-y-3`}></View>
    </ThemedView>
  );
};

export default Home;
