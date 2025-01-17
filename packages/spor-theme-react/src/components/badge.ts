import { defineStyleConfig } from "@chakra-ui/react";

const config = defineStyleConfig({
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: ["mobile.xs", "desktop.xs"],
    borderRadius: "xl",
    fontWeight: "bold",
  },
  variants: {
    solid: ({ colorScheme }) => ({
      border: "none",
      ...getColorScheme(colorScheme as ColorScheme),
    }),
    outline: ({ colorScheme }) => ({
      border: "1px solid",
      ...getColorScheme(colorScheme as ColorScheme),
    }),
  },
  sizes: {
    sm: {
      px: 2,
      height: 4,
    },
    md: {
      px: 3,
      height: 5,
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "grey",
    size: "sm",
  },
});

export default config;

function getColorScheme(colorScheme: ColorScheme) {
  let styles = colorCombinations[colorScheme];
  if (!styles && process.env.NODE_ENV === "development") {
    console.warn(`Invalid color scheme ${colorScheme} provided.`);
    styles = colorCombinations.grey;
  }
  return styles;
}

type ColorScheme =
  | "yellow"
  | "light-yellow"
  | "red"
  | "green"
  | "orange"
  | "blue"
  | "grey"
  | "white";
type ColorSpec = {
  backgroundColor: string;
  color: string;
  borderColor?: string;
};
const colorCombinations: Record<ColorScheme, ColorSpec> = {
  yellow: {
    backgroundColor: "banana",
    borderColor: "darkGrey",
    color: "darkGrey",
  },
  "light-yellow": {
    backgroundColor: "blonde",
    borderColor: "golden",
    color: "darkGrey",
  },
  red: {
    backgroundColor: "lightRed",
    borderColor: "brightRed",
    color: "darkGrey",
  },
  green: {
    backgroundColor: "seaMist",
    borderColor: "darkTeal",
    color: "darkTeal",
  },
  orange: {
    backgroundColor: "champagne",
    borderColor: "pumpkin",
    color: "darkGrey",
  },
  blue: {
    backgroundColor: "lightBlue",
    borderColor: "ocean",
    color: "darkGrey",
  },
  grey: {
    backgroundColor: "platinum",
    borderColor: "darkGrey",
    color: "darkGrey",
  },
  white: {
    backgroundColor: "white",
    borderColor: "silver",
    color: "darkGrey",
  },
};
