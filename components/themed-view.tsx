import { View } from "react-native";
import React from "react";
import tw from "twrnc";

import { useTheme } from "@/hooks/use-theme";

const ThemedView = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme((state) => state.theme);
  return (
    <View style={tw`flex-1 ${theme === "light" ? "bg-white" : "bg-black"}`}>
      {children}
    </View>
  );
};

export default ThemedView;
