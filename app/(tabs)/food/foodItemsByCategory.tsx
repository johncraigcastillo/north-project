import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import Card from "../../../components/Card";
import Colors from "../../../constants/Colors";
import { router, useLocalSearchParams, useRouter } from "expo-router";

interface Item {
  id: number;
  name: string;
}

export default function FoodItemsByCategory() {
  const [categories, setCategories] = useState<Item[]>([]);
  const colorScheme = useColorScheme(); // this will be either light or dark
  // Get the current colors from Colors.ts
  const theme = Colors[colorScheme ?? "light"];

  const params = useLocalSearchParams();
  const categoryId = params.categoryId;

  const router = useRouter();

  useEffect(() => {
    axios
      // run with this command: ngrok http --host-header=localhost 5142
      // then replace the ngrok url below with your own
      .get(
        `https://3ef0-2601-2c1-8d81-7440-c2e-d487-ed7b-4260.ngrok-free.app/api/FoodItemsByCategory?desiredFoodCategoryId=${categoryId}`,
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
      });
  }, []);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {categories.map((item) => (
        <Card
          name={item.name}
          key={item.id}
          onPress={() => {
            router.push(`/food/foodItemDetails?id=${item.id}`);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
