import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <View style={styles.profileLogoContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/6858504.png")}
        />
        <Text style={styles.nameText}> {name || "..."}</Text>
        <Text style={styles.emailText}> {email || "..."}</Text>
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Profile</Text> */}

        <Button
          title="Logout"
          onPress={handleLogout}
          style={{ backgroundColor: "red" }}
          // textStyle={{ fontSize: 20 }}
        />
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
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 16,
    marginTop: 4,
    color: "gray",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#74C044",
    borderRadius: 6,
    overflow: "hidden",
    padding: 20,
  },
  profileLogoContainer: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
  },
});
