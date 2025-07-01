import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
const cardData = [
  { id: 1, title: "Object Oriented Programming" },
  { id: 2, title: "Concept & Technologies of AI" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
];
const TodaysClass = () => {
  return (
    <View>
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Classes Today
        </Text>
        <Text style={{ fontWeight: 200 }}>
          Your Class Insights, Please be on Schedule!
        </Text>
      </View>

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

  },
  card: {
    width: 200,
    height: 120,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 20,
    borderColor: "#DFDFDF",
    padding: 10,
  },
  cardText: {
    color: "black",
    fontSize: 18,
  },
});
