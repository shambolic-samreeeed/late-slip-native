import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import UpcommingClass from "@/components/UpcommingClass";
import TodaysClass from "@/components/TodaysClass";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");

        setTimeout(() => {
          if (storedName) setName(storedName);
          if (storedEmail) setEmail(storedEmail);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <Header />

      {/* Profile Top Section */}
      <View style={styles.profileLogoContainer}>
        <View style={styles.nameContainer}>
          {loading ? (
            <>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>Hello {name || "..."}</Text>
              <Text style={styles.textTwo}>Here's What's Cooking For You</Text>
            </>
          )}
        </View>

        <View style={styles.avatarContainer}>
          {loading ? (
            <View style={styles.skeletonAvatar} />
          ) : (
            <>
              <Image
                style={styles.profileImage}
                source={require("../../assets/images/6858504.png")}
              />
              <Text style={styles.levelText}>L5CG5</Text>
            </>
          )}
        </View>
      </View>

      {/* Class Sections */}
      <View style={styles.container}>
        {loading ? (
          <>
            {/* Skeleton for Upcoming Class */}
            <View style={styles.classCardSkeleton} />
            {/* Skeletons for Today's Classes */}
            <View style={styles.classCardSkeleton} />
            <View style={styles.classCardSkeleton} />
            <View style={styles.classCardSkeleton} />
          </>
        ) : (
          <>
            <UpcommingClass />
            <TodaysClass />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  nameText: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "#2F4858",
  },
  emailText: {
    fontSize: 16,
    marginTop: 4,
    color: "gray",
  },
  profileLogoContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    alignItems: "center",
  },
  levelText: {
    fontSize: 10,
    fontWeight: "300",
    marginTop: 5,
  },
  nameContainer: {
    gap: 4,
  },
  textTwo: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: "400",
    color: "#4B4E52",
  },
  // Skeleton styles
  skeletonLine1: {
    width: 140,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6,
  },
  skeletonLine2: {
    width: 180,
    height: 14,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  skeletonAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
  },
  classCardSkeleton: {
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 12,
  },
});
