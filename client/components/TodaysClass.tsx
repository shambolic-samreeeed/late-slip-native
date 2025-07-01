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
        setSchedule(data);
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Array.isArray(schedules) &&
          schedules.map((schedule) => (
            <View style={styles.card}>
              <Text key={schedule.id} style={styles.moduleText}>
                {schedule.module_name}
              </Text>
              <View>
                <Text key={schedule.id} style={styles.timingText}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="black"
                    style={styles.timeContainer}
                  />
                  {schedule.start_time}-{schedule.end_time}
                </Text>
              </View>
              <Button onPress={handleReminder} title="Set Reminder"></Button>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default TodaysClass;

const styles = StyleSheet.create({
  scrollContainer: {},
  card: {
    width: 250,
    height: 180,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 20,
    borderColor: "#DFDFDF",
    padding: 20,
    display: "flex",
    justifyContent: "space-around",
  },
  cardText: {
    color: "black",
    fontSize: 18,
  },
  moduleText: {
    fontSize: 16,
    fontWeight: 700,
    paddingBottom: 10,
  },
  timingText: {
    paddingVertical: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
