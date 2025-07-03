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
import UpcommingClass from "@/components/UpcommingClass";
import TodaysClass from "@/components/TodaysClass";
import RequestLateSlip from "@/components/RequestLateSlip";

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Header />
      <View style={styles.profileLogoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Hello {name || "..."}!</Text>
          <Text style={styles.textTwo}>Here's Whats Cooking For You</Text>
          {/* <Text style={styles.emailText}> {email || "..."}</Text> */}
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.profileImage}
            source={require("../../assets/images/6858504.png")}
          />
          <Text style={{ fontSize: 10, fontWeight: 300 }}>L5CG5</Text>
        </View>
      </View>

      <View style={styles.container}>
        <UpcommingClass />
        <RequestLateSlip />
        <TodaysClass />
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
    color: "#2F4858",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
  },
  nameContainer: {},
  textTwo: {
    fontWeight: "100",
    fontSize: 12,
  },
});
