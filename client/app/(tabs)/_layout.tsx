import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      initialRouteName="lateslip"
      screenOptions={{
        tabBarActiveTintColor: "#74C044",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#3C3C3C",
          borderTopColor: "#8e8e93",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lateslip"
        options={{
          title: "Request Slip",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

