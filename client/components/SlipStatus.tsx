import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SlipStatus = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Late Slip History</Text>
    </View>
  );
};

export default SlipStatus;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 20,
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
