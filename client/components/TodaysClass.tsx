import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
const cardData = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
];
const TodaysClass = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Classes Today</Text>
      <Text>Your Class Insights, Please be on Schedule!</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {cardData.map((card) => (
          <View key={card.id} style={styles.card}>
            <Text style={styles.cardText}>{card.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodaysClass;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 200,
    height: 120,
    marginRight: 12,
    backgroundColor: "#74C044",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // for Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    color: "white",
    fontSize: 18,
  },
});
