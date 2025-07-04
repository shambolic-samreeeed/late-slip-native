import { ScrollView, StyleSheet, Text, View } from "react-native";
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
      <View style={{ marginTop: 25, marginBottom: 20 }}>
        <Text
          style={{
            marginBottom: 5,
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 16,
            color: "#2F4858",
          }}
        >
          Classes Today
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontFamily: "Montserrat",
            fontSize: 12,
          }}
        >
          Your Class Insights, Please be on Schedule!
        </Text>
      </View>

      {Array.isArray(schedules) && schedules.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {schedules.map((schedule, index) => (
            <View
              key={schedule.id}
              style={[
                styles.card,
                index === schedules.length - 1 && { marginRight: 0 },
              ]}
            >
              {/* Top section: Module name */}
              <View style={{ flexGrow: 1 }}>
                <Text
                  style={styles.moduleText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {schedule.module_name}
                </Text>
              </View>

              {/* Bottom section: Time + Button */}
              <View>
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
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noClassText}>
          No classes scheduled today ENJOY! 🥳.
        </Text>
      )}
    </View>
  );
};

export default TodaysClass;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingRight: 0,
    paddingLeft: 0,
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
    minHeight: 160,
  },
  moduleText: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
    color: "#2F4858",
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeIcon: {
    marginRight: 6,
  },
  timingText: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: 12,
    color: "#4B4E52",
  },
  noClassText: {
    fontStyle: "italic",
    color: "#777",
    fontSize: 14,
    marginTop: 10,
  },
});
