import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { getTodaysSchedule } from "@/services/schedulesService";
import ApplyLateSlip from "@/components/ApplyLateSlip"; // ✅ import correctly

const UpcomingClass = () => {
  const [upcoming, setUpcoming] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodaysSchedule();
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const sorted = response.sort((a: any, b: any) => {
          const [aHour, aMin] = a.start_time.split(":").map(Number);
          const [bHour, bMin] = b.start_time.split(":").map(Number);
          return aHour * 60 + aMin - (bHour * 60 + bMin);
        });

        const nextClass = sorted.find((cls: any) => {
          const [startHour, startMin] = cls.start_time.split(":").map(Number);
          const [endHour, endMin] = cls.end_time.split(":").map(Number);
          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;

          return nowMinutes < endMinutes;
        });

        setUpcoming(nextClass || null);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };

    fetchData();

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
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.label}>
            {isOngoing ? "Ongoing Class" : "Upcoming Class"}
          </Text>
          <Text style={styles.module}>{upcoming.module_name}</Text>
        </View>

        <View style={styles.rightContainer}>
          <FontAwesome5 name="clock" size={18} color="white" />
          <Text style={styles.time}>{upcoming.start_time}</Text>
        </View>
      </View>

      {/* Render ApplyLateSlip outside the box but below it */}
      <ApplyLateSlip startTime={upcoming.start_time} />
    </View>
  );
};

export default UpcomingClass;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#74C043",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    height: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
  leftContainer: {
    gap: 15,
    width:'80%'
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  label: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 12,
    color: "#444444",
  },
  module: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 16,
    color: "#FFFFFF",
  },
  time: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
