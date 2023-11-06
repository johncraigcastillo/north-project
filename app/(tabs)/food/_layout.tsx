import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Food" }}
      />
      <Stack.Screen
        name="foodItemsByCategory"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="foodItemDetails"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
