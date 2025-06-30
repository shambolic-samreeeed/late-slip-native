import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

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
          <Text>Unread</Text>
        </TouchableOpacity>
      </View>
      {unread ? <Text>Unread</Text> : <Text> Read</Text>}
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
  },
});
