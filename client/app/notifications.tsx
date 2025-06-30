import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const notifications = () => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={styles.topContainer}>
        {/* <View>
          <FontAwesome5 name="arrow-left" size={20} color="white" />
        </View> */}
        <TouchableOpacity>
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <FontAwesome5 name="bell" size={24} color="white" />
          <Text>notifications</Text>
        </View>
      </View>
    </View>
  );
};

export default notifications;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
