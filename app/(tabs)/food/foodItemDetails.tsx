import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";
import Card from "../../../components/Card";
import Colors from "../../../constants/Colors";
import { useLocalSearchParams } from "expo-router";

interface Item {
  id: number;
  name: string;
  description: string;
  ingredientsList: string[];
  quantitiesList: string[];
  techniqueList: string[];
}

export default function FoodItemDetails() {
  const [foodItem, setFoodItem] = useState<Item>();
  const colorScheme = useColorScheme(); // this will be either light or dark
  // Get the current colors from Colors.ts
  const theme = Colors[colorScheme ?? "light"];

  const params = useLocalSearchParams();
  const id = params.id;

  useEffect(() => {
    axios
      // run with this command: ngrok http --host-header=localhost 5142
      // then replace the ngrok url below with your own
      .get(
        `https://3ef0-2601-2c1-8d81-7440-c2e-d487-ed7b-4260.ngrok-free.app/api/FoodItem?desiredFoodItemId=${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setFoodItem(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
        console.error("Error stack trace:", error.stack);
      });
  }, []);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.name}>{foodItem?.name}</Text>
      <Text style={styles.description}>{foodItem?.description}</Text>
      <View style={styles.table}>
        {foodItem?.ingredientsList.map((ingredient, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{ingredient}</Text>
            <Text style={styles.tableCell}>
              {foodItem.quantitiesList[index]}
            </Text>
          </View>
        ))}
      </View>
      <View>
        {foodItem?.techniqueList.map((technique, index) => (
          <Text key={index}>- {technique}</Text>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  table: {
    alignSelf: "stretch", // Stretch to fill the container
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#dddddd",
  },
  tableCell: {
    flex: 1, // Each cell will take up an equal amount of space
    marginLeft: 30,
  },
});
