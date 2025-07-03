import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { replace } from "expo-router/build/global-state/routing";

const RequestLateSlip = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Apply Late Slip</Text>
      <Button title="Apply" onPress={() => replace("/(tabs)/lateslip")} />
    </View>
  );
};

export default RequestLateSlip;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: "#DFDFDF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
