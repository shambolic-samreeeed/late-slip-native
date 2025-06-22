import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import authServices from "@/services/authServices";
import { Link, router } from "expo-router";
import { loginValidationSchema } from "@/utils/validationSchemas";
// import Ionicons from 'react-native-vector-icons/Iocdnicons';

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

      if (response.success) {
        Alert.alert("Success", response.message || "Login successful");
        // TODO: Save token using AsyncStorage if needed
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", response.message || "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        {/* <Image
          source={require("@/assets/images/herald-white-logo.svg")}
          style={style.logo}
        /> */}
        <Text style={style.logoText}> Herald Sync</Text>
        <Text style={style.welcomeText}>Welcome back !</Text>
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
            <View>
              <TextInput
                style={style.input}
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

            <View>
              {/* <Ionicons name="mail-outline" size={20} color="#333" /> */}

              <TextInput
                style={style.input}
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
                Dont have an account?{" "}
                <Link
                  href="/(auth)/register"
                  style={{ fontWeight: "bold", color: "" }}
                >
                  {" "}
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
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
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
