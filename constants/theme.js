import { theme, Utils } from "expo-ui-kit";

export const COLORS = {
  // default font color
  font: "#1E1F20",

  // base colors
  primary: "#121212",
  secondary: "#79D0F1",

  // non-colors
  black: "#1E1F20",
  white: "#FFFFFF",

  // color variations
  gray: "#8F92A1",
  lightGray: "#F7F7F7",
  error: "#FF4E4E",
  success: "#53D769",
  facebook: "#39579B",
};
export const SIZES = {
  ...theme.SIZES,
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  title: 14,
  subtitle: 14,
  caption: 12,
  small: 12,
};
const FONTS = {
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  title: { fontSize: SIZES.title, lineHeight: 20 },
  subtitle: { fontSize: SIZES.subtitle, lineHeight: 20 },
  caption: { fontSize: SIZES.caption, lineHeight: 22 },
  small: { fontSize: SIZES.small, lineHeight: 20 },
};

const WEIGHTS = {
  regular: "normal",
  bold: "bold",
  semibold: "600",
  medium: "500",
  light: "300",
};

const appTheme = { COLORS, SIZES, FONTS, WEIGHTS };

export default Utils.mergeTheme(theme, appTheme);
