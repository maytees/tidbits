import * as Device from "expo-device";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import SearchBar from "~/components/SearchBar";
import Tidbit from "~/components/Tidbit";

export default function Index() {
  const { height } = useWindowDimensions();
  console.log(height, Device.modelName);

  const story = `
Quite simply a terrifying story...\
In recent years, AI has emerged as a \
transformative force across industries. \
From enhancing healthcare diagnostics \
to revolutionizing financial services, its \
impact is undeniable. This tidbit delves \
into the key developments driving AI's \
ascent and explores its potential to reshape our \
future. Join us as we uncover the fascinating world of artificial \
  `;

  return (
    <View
      className="items-center h-screen"
      style={{
        paddingTop: height <= 667 ? 40 : 80,
      }}
    >
      <View className="relative flex flex-row items-center w-11/12">
        <SearchBar />
      </View>
      <Tidbit title={"Rise of Artificial Inteligence."} content={story} />
    </View>
  );
}
