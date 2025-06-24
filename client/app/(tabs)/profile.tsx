import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replace } from "expo-router/build/global-state/routing";

const profile = () => {
  const handleLogout = async () => {
    try {
      AsyncStorage.removeItem("token");
      replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };
  return (  
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
