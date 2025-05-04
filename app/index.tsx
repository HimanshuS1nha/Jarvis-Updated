import { Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import tw from "twrnc";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.hideAsync();

export default function Index() {
  return (
    <View style={tw`flex-1 items-center justify-center gap-y-6`}>
      <Image
        source={require("../assets/images/logo.png")}
        style={tw`size-32 rounded-full`}
      />

      <View style={tw`gap-y-1 items-center`}>
        <Text style={tw`text-5xl font-bold`}>Jarvis</Text>
        <Text style={tw`text-gray-700 font-medium`}>
          Your personal AI assistant
        </Text>
      </View>

      <ActivityIndicator color={"blue"} size={40} />
    </View>
  );
}
