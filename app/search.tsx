import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import SearchBar from "~/components/SearchBar";

export default function Search() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="items-center h-screen pt-20">
        <View className="relative flex flex-row items-center w-11/12">
          <SearchBar />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
