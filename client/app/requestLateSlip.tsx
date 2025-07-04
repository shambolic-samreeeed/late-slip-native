import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import { RequestSchema } from "@/utils/lateSlipRequestSchema";
import Button from "@/components/Button";
import { requestLateSlip } from "@/services/lateSlipServices";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";

const RequestLateSlip = () => {
  const router = useRouter();

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
        replace("/(tabs)/lateslip");
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => replace("/(tabs)/lateslip")}
        >
          <FontAwesome5 name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Apply Late Slip</Text>
      </View>

      {/* Formik Form */}
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
    </View>
  );
};

export default RequestLateSlip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 20,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },

  backButton: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 10,
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
});
