import { createTamagui, createFont } from "tamagui";

// Define your fonts
const myFont = createFont({
  family: "System",
  size: {
    4: 12,
    6: 16,
    8: 20,
    10: 24,
    12: 30,
    14: 36,
    16: 42,
  },
  lineHeight: {
    4: 16,
    6: 24,
    8: 28,
    10: 32,
    12: 40,
    14: 48,
    16: 52,
  },
  weight: {
    4: "400",
    6: "500",
    8: "600",
  },
});

// Define your colors
const colors = {
  background: "white",
  primary: "#007AFF",
  secondary: "#5856D6",
  text: "#111",
  border: "#f0f0f0",
};

// Export your Tamagui configuration
export const tamaguiConfig = createTamagui({
  defaultTheme: "light",
  themes: {
    light: {
      ...colors,
      background: "white",
      text: "#111",
    },
    dark: {
      ...colors,
      background: "#111",
      text: "white",
    },
  },
  fonts: {
    myFont,
  },
});

export type TamaguiConfig = typeof tamaguiConfig;
