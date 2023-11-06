import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Card from "../../components/Card";

import Colors from "../../constants/Colors";

interface Category {
  id: number;
  name: string;
}

export default function FoodScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const colorScheme = useColorScheme(); // this will be either light or dark

  // Get the current colors from Colors.ts
  const theme = Colors[colorScheme ?? "light"];
  useEffect(() => {
    axios
      // run with this command: ngrok http --host-header=localhost 5142
      // then replace the ngrok url below with your own
      .get(
        "https://af96-2601-2c1-8d81-7440-1a82-1cc7-d522-cbb3.ngrok-free.app/api/foodcategories",
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
      {categories.map((category) => (
        <Card
          name={category.name}
          key={category.id}
          onPress={() => {
            //   // todo: navigate using expo router to list of menu items by selected category
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
