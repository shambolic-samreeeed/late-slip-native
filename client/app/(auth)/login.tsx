import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import authServices from "@/services/authServices";
import { Link, router } from "expo-router";
import { loginValidationSchema } from "@/utils/validationSchemas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export const options = {
  headerShown: false,
};

const Login = () => {
  const handleLogin = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const response = await authServices.login(values.email, values.password);

      if (response.success && response.token) {
        await AsyncStorage.setItem("token", response.token);

        if (response.data?.fullname) {
          await AsyncStorage.setItem("name", response.data.fullname);
        }

        if (response.data?.email) {
          await AsyncStorage.setItem("email", response.data.email);
        }

        router.replace("/(tabs)/lateslip");
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response.message || "Invalid Credentials",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: error.message || "Login failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Text style={style.logoText}>Herald Sync</Text>
        <Text style={style.welcomeText}>Welcome back!</Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
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
            {/* Email input field */}
            <View style={style.inputWrapper}>
              <Fontisto
                name="email"
                size={18}
                color="rgba(0, 0, 0, 0.5)"
                style={style.icon}
              />
              <TextInput
                style={style.inputWithIcon}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={style.error}>{errors.email}</Text>
            )}

            {/* Password input field */}
            <View style={style.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="rgba(0, 0, 0, 0.5)"
                style={style.icon}
              />
              <TextInput
                style={style.inputWithIcon}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={style.error}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={[
                style.button,
                isSubmitting && { backgroundColor: "#ccc" },
              ]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={style.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View>
              <Text style={style.toRegister}>
                Don’t have an account?{" "}
                <Link
                  href="/(auth)/register"
                  style={{ fontWeight: "bold", color: "#74C044" }}
                >
                  Sign Up!
                </Link>
              </Text>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const style = StyleSheet.create({
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
  welcomeText: {
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
  toRegister: {
    textAlign: "center",
    margin: 20,
  },
});

export default Login;
