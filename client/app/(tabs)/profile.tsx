import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replace } from "expo-router/build/global-state/routing";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    user_id?: string;
  } | null>(null);

  const decodeToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const payloadBase64 = token.split(".")[1];
      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");

      // Decode JWT payload (base64)
      const decodedPayload = JSON.parse(
        Buffer.from(base64, "base64").toString("utf-8")
      );

      // You can log it to see all contents
      console.log("Decoded JWT Payload:", decodedPayload);

      // Save the user info to state
      setUserInfo({
        name: decodedPayload.name,
        user_id: decodedPayload.user_id,
      });
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  };

  useEffect(() => {
    decodeToken();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <Text style={styles.text}>
          Welcome, {userInfo.name || userInfo.user_id || "Unknown Student"}
        </Text>
      ) : (
        <Text style={styles.text}>Loading user info...</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
