import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { getTodaysSchedule } from "@/services/schedulesService";

const UpcommingClass = () => {
  const [upcoming, setUpcoming] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodaysSchedule();
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        // Sort schedules by start_time
        const sorted = response.sort((a: any, b: any) => {
          const [aHour, aMin] = a.start_time.split(":").map(Number);
          const [bHour, bMin] = b.start_time.split(":").map(Number);
          return aHour * 60 + aMin - (bHour * 60 + bMin);
        });

        // Find the next class or the ongoing one
        const nextClass = sorted.find((cls: any) => {
          const [startHour, startMin] = cls.start_time.split(":").map(Number);
          const [endHour, endMin] = cls.end_time.split(":").map(Number);
          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;

          return nowMinutes < endMinutes; // includes both next and ongoing
        });

        setUpcoming(nextClass || null);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };

    fetchData();

    // Update every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!upcoming) {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ color: "white" }}>No upcoming class 🎉</Text>
      </View>
    );
  }

  const isOngoing = (() => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMin] = upcoming.start_time.split(":").map(Number);
    const [endHour, endMin] = upcoming.end_time.split(":").map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  })();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={{ fontWeight: "500", color: "#444444" }}>
          {isOngoing ? "Ongoing Class" : "Upcoming Class"}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#FFFFFF",
          }}
        >
          {upcoming.module_name}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <FontAwesome5 name="clock" size={18} color="white" />
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          {upcoming.start_time}
        </Text>
      </View>
    </View>
  );
};

export default UpcommingClass;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#74C043",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    height: 119,
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
    gap: 10,
    width: "80%",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
});
