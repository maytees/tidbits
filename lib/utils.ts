import { clsx, type ClassValue } from "clsx";
import { Dimensions } from "react-native";
import { twMerge } from "tailwind-merge";

const { height } = Dimensions.get("window");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
