import { View, Text, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        if (storedName) {
          setName(storedName);
          console.log("Fetched name in useEffect:", storedName);
        } else {
          console.log("No name found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchName();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "name", "email"]);
      Alert.alert("Logged Out", "You have been logged out.");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Profile</Text>
      <Text style={{ fontSize: 18 }}>Welcome, {name || "no name"}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;
