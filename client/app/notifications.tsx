import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const AllNotifications = [
  {
    id: 1,
    title: "Object Oriented Programming",
    Description:
      "Your OOP assignment has been graded. Check the portal for details.",
  },
  {
    id: 2,
    title: "Concept & Technologies of AI",
    Description: "Reminder: AI project proposal is due this Friday at 5 PM.",
  },
  {
    id: 3,
    title: "System Maintenance",
    Description:
      "The student portal will be under maintenance on Saturday from 1 AM to 3 AM.",
  },
  {
    id: 4,
    title: "New Announcement",
    Description:
      "A new elective course on Cloud Computing has been added to the curriculum.",
  },
];

const Notifications = () => {
  const router = useRouter();
  const [unread, setUnread] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      console.log("Navigating back");
      router.back();
    } else {
      console.log("No previous page, redirecting to /index");
      router.push("/(tabs)/lateslip");
    }
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesome5 name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.iconTextContainer}>
          <Text style={styles.text}>Notifications</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setUnread(false)}>
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setUnread(true)}>
          <Text>New Unread</Text>
        </TouchableOpacity>
      </View>
      {unread ? (
        <Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {AllNotifications.map((card) => (
              <View key={card.id} style={styles.card}>
                <Text style={styles.cardText}>{card.title}</Text>
              </View>
            ))}
          </ScrollView>
        </Text>
      ) : (
        <Text> Read</Text>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  cardText: {},
  scrollContainer: {},
  card: {
    backgroundColor: "green",
    margin: 10,
    padding: 20,
    width: 370,
    display: "flex",
  },
});
