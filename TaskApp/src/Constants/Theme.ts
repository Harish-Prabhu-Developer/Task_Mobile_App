import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS: any = {
  darkGreen: "#229879",
  darkLime: "#1A8871",
  lightLime: "#BBD6C5",
  lime: "#2AD699",
  lightGreen: "#E7F9EF",
  lightGreen1: "#8EbCA0",

  white: "#fff", // Fixed typo ("while" -> "white")
  white2: "#F9F9F9",
  black: "#020202",
  blue: "#0776DD",
  red: "#ff0000",
  FontRed: "#FA0000",
  gray: "#777777",
  gray2: "#F8F8F8",
  lightGray: "#F5F6FB",
  lightGray2: "#757575",

  transparentBlack1: "rgba(2,2,2,0.1)",
  transparentBlack3: "rgba(2,2,2,0.3)",
  transparentBlack5: "rgba(2,2,2,0.5)",
  transparentBlack7: "rgba(2,2,2,0.7)",
  transparentBlack9: "rgba(2,2,2,0.9)",

  transparentGray: "rgba(77,77,77,0.8)",
  transparentDarkGray: "rgba(20,20,20,0.9)",

  transparent: "transparent",

  // OUR UI THEME COLORS
  primarycolor: "#2CD2C7",
  EditBgColor: "#0776DD",
  deleteBgColor: "#FF0000",
  ShadowColor: "#E0E0E0",
  subDeliverableNameColor: "#828282",
};

// Animation types
type AnimationType = {
  [key: number]: { scale?: number; translateY?: number };
};

// Define animations with proper TypeScript types
export const animate1: AnimationType = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};

export const animate2: AnimationType = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

export const circle1: AnimationType = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};

export const circle2: AnimationType = {
  0: { scale: 1 },
  1: { scale: 0 },
};
