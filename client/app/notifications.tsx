import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

//dummy notifications
const AllNotifications = [
  {
    id: 1,
    title: "Object Oriented Programming",
    Description:
      "Your OOP assignment has been graded. Check the portal for details.",
    unread: true,
  },
  {
    id: 2,
    title: "Concept & Technologies of AI",
    Description: "Reminder: AI project proposal is due this Friday at 5 PM.",
    unread: false,
  },
  {
    id: 3,
    title: "System Maintenance",
    Description:
      "The student portal will be under maintenance on Saturday from 1 AM to 3 AM.",
    unread: true,
  },
  {
    id: 4,
    title: "New Announcement",
    Description:
      "A new elective course on Cloud Computing has been added to the curriculum.",
    unread: false,
  },
];

const Notifications = () => {
  const router = useRouter();

  //State to control whether to store the unreadOnly or not
  const [unreadOnly, setUnreadOnly] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)/lateslip");
    }
  };

  const filteredNotifications = unreadOnly
    ? AllNotifications.filter((item) => item.unread)
    : AllNotifications;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesome5 name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !unreadOnly && styles.activeButton]}
          onPress={() => setUnreadOnly(false)}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, unreadOnly && styles.activeButton]}
          onPress={() => setUnreadOnly(true)}
        >
          <Text style={styles.filterText}>Unread</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.Description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#74C043",
    borderColor: "#74C043",
  },
  filterText: {
    color: "#333",
    fontWeight: "500",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
});
