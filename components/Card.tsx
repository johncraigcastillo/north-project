import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";

interface CardProps {
  name: string;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ name, onPress }) => {
  const colorScheme = useColorScheme(); // this will be either light or dark

  // Get the current colors from Colors.ts
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardColor }]}
      onPress={onPress}
    >
      <Text style={[styles.cardTitle, { color: theme.lightText }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    width: "80%", // Adjust the width as needed
    shadowColor: "#000", // Simple shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Card;
