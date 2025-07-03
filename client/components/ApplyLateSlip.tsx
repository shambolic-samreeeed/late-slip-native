import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { replace } from "expo-router/build/global-state/routing";

interface Props {
  startTime: string;
}

const LateSlipButton: React.FC<Props> = ({ startTime }) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMin] = startTime.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;

  const minutesSinceStart = nowMinutes - startMinutes;
  const canApply = minutesSinceStart >= 0 && minutesSinceStart < 15;

  const handlePress = () => {
    if (canApply) {
      replace("/(tabs)/lateslip");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Apply Late Slip</Text>
      <View style={canApply ? styles.buttonWrapper : styles.disabledWrapper}>
        <Button
          title={canApply ? "Apply" : "Late Slip Not Available past 15 Minutes"}
          onPress={() => replace("/(tabs)/lateslip")}
        />
      </View>
    </View>
  );
};

export default LateSlipButton;

const styles = StyleSheet.create({
  container: {
    height: 106,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DFDFDF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  label: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 12,
    color: "#2F4858",
  },
  buttonWrapper: {
    opacity: 1,
  },
  disabledWrapper: {
    opacity: 0.6,
  },
});
