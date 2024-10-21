import { clsx, type ClassValue } from "clsx";
import { Dimensions } from "react-native";
import { twMerge } from "tailwind-merge";

const { height } = Dimensions.get("window");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateNumber(number: number) {
  const suffixes = ["", "k", "M", "B", "T"];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number.toString();

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1).replace(/\.0$/, "") + suffix;
}
