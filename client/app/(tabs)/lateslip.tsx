import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import { requestLateSlip } from "@/services/lateSlipServices";
import { RequestSchema } from "@/utils/lateSlipRequestSchema";

const Lateslip = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/footer-logo.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.logoText}>Herald Sync</Text>
      </View>

      {/* Form Content */}
      <View style={styles.container}>
        <Text style={styles.heading}>Request a Lateslip</Text>

        <Formik
          initialValues={{ reason: "" }}
          validationSchema={RequestSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const data = await requestLateSlip(values.reason);
              if (data?.success) {
                Alert.alert("Success", data.message || "Late slip requested.");
                resetForm();
              } else {
                Alert.alert("Error", data.message || "Request failed.");
              }
            } catch (err: any) {
              Alert.alert("Error", err?.message || "Something went wrong.");
            }
          }}
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

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Submit Request</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Lateslip;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3C3C3C",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    height: 40,
    width: 90,
    alignItems: "flex-start",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#74C044",
  },
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
});
