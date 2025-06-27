import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { requestLateSlip, getMyLateSlips } from "@/services/lateSlipServices";
import { RequestSchema } from "@/utils/lateSlipRequestSchema";
import Toast from "react-native-toast-message";
import Header from "../../components/Header";
import Button from "@/components/Button";

const Lateslip = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [slips, setSlips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlips = async () => {
      try {
        setLoading(true);
        const response = await getMyLateSlips();
        if (response.success) {
          setSlips(response.lateSlips || []);
        } else {
          console.warn("Failed to fetch slips");
        }
      } catch (error) {
        console.error("Error fetching slips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlips();
  }, [refreshKey]);

  const handleSubmit = async (
    values: { reason: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const data = await requestLateSlip(values.reason);
      if (data?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message || "Late slip requested successfully",
        });
        resetForm();
        setRefreshKey((prev) => prev + 1);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Late slip request failed",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "Something went wrong",
      });
    }
  };

  //function to determine the color of the status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      case "pending":
      default:
        return "blck";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.heading}>Request a Lateslip</Text>

        <Formik
          initialValues={{ reason: "" }}
          validationSchema={RequestSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                placeholder="Reason for being late"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                style={styles.input}
                onChangeText={handleChange("reason")}
                onBlur={handleBlur("reason")}
                value={values.reason}
                multiline
              />
              {touched.reason && errors.reason && (
                <Text style={styles.error}>{errors.reason}</Text>
              )}

              <Button onPress={handleSubmit} title="Submit" />
            </>
          )}
        </Formik>

        <Text style={styles.statusHeading}>Your Late Slips</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#74C044" />
        ) : slips.length === 0 ? (
          <Text style={{ marginTop: 10 }}>No slips yet.</Text>
        ) : (
          <FlatList
            data={slips}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View style={styles.slipItem}>
                <Text
                  style={[
                    styles.status,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  Status: {item.status}
                </Text>
                <Text style={styles.reason}>Reason: {item.reason}</Text>
                <Text style={styles.reason}>Date: {item.date}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Lateslip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#74C044",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  slipItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  status: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reason: {
    color: "#333",
  },
});
