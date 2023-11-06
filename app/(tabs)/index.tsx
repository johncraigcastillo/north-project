import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { Button, YStack } from "tamagui";

interface Category {
  id: number;
  name: string;
}

export default function FoodScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    axios
      // run with this command: ngrok http --host-header=localhost 5142
      // then replace the ngrok url below with your own
      .get(
        "https://074c-2601-2c1-8d81-7440-1a82-1cc7-d522-cbb3.ngrok-free.app/api/foodcategories",
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
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          style={styles.container}
          key={category.id}
          // onPress={() => {
          //   // todo: navigate using expo router to list of menu items by selected category
          // }}
        >
          <Text>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
