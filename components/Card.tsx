import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Themed"; // Use your exact path to Themed.tsx
import Colors from "../constants/Colors";

interface CardProps {
  name: string;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.common.cardColor,
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Card;
