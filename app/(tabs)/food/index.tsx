import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import Card from "../../../components/Card";
import { Text, View } from "../../../components/Themed"; // Use your exact path to Themed.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../../constants/Colors";

interface Category {
  id: number;
  name: string;
}

export default function FoodScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    axios
      // run with this command: ngrok http --host-header=localhost 5142
      // then replace the ngrok url below with your own
      .get(
        "https://ce1f-2601-2c1-8d81-7440-e71-434b-4170-ae1c.ngrok-free.app/api/foodcategories",
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
        console.error("Error stack trace:", error.stack);
        setError("There was an error fetching the data");
      });
  }, []);
  const router = useRouter();

  if (error) {
    const textColor =
      colorScheme === "light" ? Colors.light.darkText : Colors.dark.lightText;
    return <Text style={{ color: textColor }}>{error}</Text>; // Using the custom Text component that adapts to the theme
  }

  const scrollViewStyle = {
    flex: 1,
    backgroundColor:
      colorScheme === "light"
        ? Colors.light.background
        : Colors.dark.background,
  };

  return (
    <ScrollView style={scrollViewStyle}>
      <View style={styles.contentContainer}>
        {categories.map((category) => (
          <Card
            name={category.name}
            key={category.id}
            onPress={() =>
              router.push(`/food/foodItemsByCategory?categoryId=${category.id}`)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
