import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getTodaysSchedule } from "@/services/schedulesService";
import Button from "./Button";
import Ionicons from "@expo/vector-icons/Ionicons";

type ScheduleItem = {
  id: string;
  module_code: string;
  module_name: string;
  start_time: string;
  end_time: string;
  day: string;
  room_name: string;
  instructor_name: string;
  semester: string;
  level: string;
  created_at: string;
  updated_at: string;
};

const TodaysClass = () => {
  const [schedules, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getTodaysSchedule();

        const now = new Date();

        const filtered = data.filter((cls: ScheduleItem) => {
          const [endHour, endMin] = cls.end_time.split(":").map(Number);
          const [startHour, startMin] = cls.start_time.split(":").map(Number);

          const startTime = new Date(now);
          startTime.setHours(startHour, startMin, 0, 0);

          const endTime = new Date(now);
          endTime.setHours(endHour, endMin, 0, 0);

          if (endTime <= startTime) {
            endTime.setDate(endTime.getDate() + 1);
          }

          return now < endTime;
        });

        setSchedule(filtered);
      } catch (err: any) {
        console.error("Failed to load the schedule. ", err);
      }
    };
    fetchSchedule();
  }, []);

  const handleReminder = () => {
    console.log("Added Reminder");
  };

  return (
    <View>
      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Classes Today
        </Text>
        <Text style={{ fontWeight: 200 }}>
          Your Class Insights, Please be on Schedule!
        </Text>
      </View>

      {Array.isArray(schedules) && schedules.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {schedules.map((schedule) => (
            <View key={schedule.id} style={styles.card}>
              <Text style={styles.moduleText}>{schedule.module_name}</Text>

              <View style={styles.timeRow}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="black"
                  style={styles.timeIcon}
                />
                <Text style={styles.timingText}>
                  {schedule.start_time} - {schedule.end_time}
                </Text>
              </View>

              <Button onPress={handleReminder} title="Set Reminder" />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{ fontStyle: "italic", marginTop: 10 }}>
          No classes scheduled today ENJOY! 🥳.
        </Text>
      )}
    </View>
  );
};

export default TodaysClass;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontWeight: "300",
  },
  scrollContainer: {
    paddingRight: 10,
  },
  card: {
    width: 220,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#DFDFDF",
    marginRight: 16,
    padding: 16,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
  },
  moduleText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  timeIcon: {
    marginRight: 6,
  },
  timingText: {
    fontSize: 14,
    color: "#333",
  },
  detailText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 4,
  },
  noClassText: {
    fontStyle: "italic",
    color: "#777",
    fontSize: 14,
    marginTop: 10,
  },
});
