import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Formik } from "formik";
import authServices from "@/services/authServices";
import { registerValidationSchema } from "@/utils/validationSchemas";

const Register = () => {
  const handleRegister = async (
    values: { name: string; email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const response = await authServices.register(
        values.name,
        values.email,
        values.password
      );

      if (response.success) {
        Alert.alert("Success", response.message || "Registration Successful");
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Registration Failed",
          response.message || "User invalid. Please check your ID"
        );
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.error;

      if (
        status === 409 ||
        (message && message.toLowerCase().includes("already exists"))
      ) {
        Alert.alert("User already exists", "Please login instead.");
        router.replace("/(auth)/login");
      } else {
        Alert.alert("Error", message || error.message || "Registration failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Herald Sync</Text>
        <Text style={styles.signupText}>Signup using your college email.</Text>
      </View>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            {/* Name input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={18}
                color="rgba(0, 0, 0, 0.5)"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Name"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoCapitalize="words"
              />
            </View>
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            {/* Email input */}
            <View style={styles.inputWrapper}>
              <Fontisto
                name="email"
                size={18}
                color="rgba(0, 0, 0, 0.5)"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* Password input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="rgba(0, 0, 0, 0.5)"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Submit button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View>
        <Text style={styles.toSignIn}>
          Already registered?{" "}
          <Link href="/(auth)/login" style={{ fontWeight: "bold" }}>
            Login Here!
          </Link>{" "}
        </Text>
      </View>
    </View>
  );
};

export default Register;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#74C044",
    margin: 20,
  },
  signupText: {
    fontSize: 14,
    textAlign: "left",
    color: "#3C3C3C",
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#74C044",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 13,
  },
  toSignIn: {
    textAlign: "center",
    margin: 20,
  },
});
