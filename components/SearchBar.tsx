import { useState } from "react";
import { Search } from "~/lib/icons";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (value: string | undefined) => {
    setSearch(value!);
  };

  return (
    <>
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
    </>
  );
}
