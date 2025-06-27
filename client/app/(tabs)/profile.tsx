import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "@/components/Header";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");

        if (storedName) {
          setName(storedName);
          console.log("Fetched name:", storedName);
        }

        if (storedEmail) {
          setEmail(storedEmail);
          console.log("Fetched email:", storedEmail);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
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
    <View style={{ flex: 1 }}>
      <Header />

      <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Profile</Text>
        <Text style={{ fontSize: 18 }}>Welcome, {name || "no name"}</Text>
        <Text style={{ fontSize: 16, marginTop: 4, color: "gray" }}>
          Email: {email || "no email"}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
