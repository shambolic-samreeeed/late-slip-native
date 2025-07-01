import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const UpcommingClass = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={{ fontWeight: "500", color: "#444444" }}>
          Upcoming Class
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#FFFFFF",
          }}
        >
          Internet Software Architecture
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <FontAwesome5 name="clock" size={18} color="white" />
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>12 Pm</Text>
      </View>
    </View>
  );
};

export default UpcommingClass;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#74C043",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    height:119,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  leftContainer: {
    display: "flex",
    gap: 10,
    width: "50%",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
});
