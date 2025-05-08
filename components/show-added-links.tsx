import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { useLinks } from "@/hooks/use-links";
import { useTheme } from "@/hooks/use-theme";

const ShowAddedLinks = () => {
  const links = useLinks((state) => state.links);
  const removeFromLinks = useLinks((state) => state.removeFromLinks);

  const theme = useTheme((state) => state.theme);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {links.length > 0 &&
        (isExpanded ? (
          <>
            {links.toReversed().map((link, i) => {
              return (
                <View
                  style={tw`flex-row justify-between items-center`}
                  key={link}
                >
                  <View style={tw`flex-row gap-x-2 items-center flex-1`}>
                    <Ionicons
                      name="attach-sharp"
                      color={theme === "light" ? "black" : "white"}
                      size={20}
                    />

                    <Text
                      style={tw`${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {link.length > 30 ? link.substring(0, 30) + "..." : link}
                    </Text>
                  </View>

                  <View style={tw`flex-row gap-x-2.5 items-center`}>
                    <Pressable
                      onPress={() => {
                        if (links.length <= 2) {
                          setIsExpanded(false);
                        }
                        removeFromLinks(link);
                      }}
                    >
                      <AntDesign
                        name="close"
                        color={theme === "light" ? "black" : "white"}
                        size={20}
                      />
                    </Pressable>
                    {i === 0 && (
                      <Pressable onPress={() => setIsExpanded(false)}>
                        <AntDesign
                          name="down"
                          color={theme === "light" ? "black" : "white"}
                          size={20}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row gap-x-2 items-center flex-1`}>
              <Ionicons
                name="attach-sharp"
                color={theme === "light" ? "black" : "white"}
                size={20}
              />

              <Text
                style={tw`${theme === "light" ? "text-black" : "text-white"}`}
              >
                {links[0].length > 30
                  ? links[0].substring(0, 30) + "..."
                  : links[0]}
              </Text>
            </View>

            <View style={tw`flex-row gap-x-2.5 items-center`}>
              <Pressable onPress={() => removeFromLinks(links[0])}>
                <AntDesign
                  name="close"
                  color={theme === "light" ? "black" : "white"}
                  size={20}
                />
              </Pressable>
              {links.length > 1 && (
                <Pressable onPress={() => setIsExpanded(true)}>
                  <AntDesign
                    name="up"
                    color={theme === "light" ? "black" : "white"}
                    size={20}
                  />
                </Pressable>
              )}
            </View>
          </View>
        ))}
    </>
  );
};

export default ShowAddedLinks;
