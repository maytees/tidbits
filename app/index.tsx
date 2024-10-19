import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Search } from "~/lib/icons/Search";

export default function Index() {
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="items-center h-screen pt-20">
        <View className="relative flex flex-row items-center w-11/12">
          <Search
            size={20}
            className="absolute z-10 text-muted-foreground left-5"
          />
          <Input
            className="w-full rounded-full pl-14"
            placeholder="Search"
            value={search}
            onChangeText={onChangeSearch}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
