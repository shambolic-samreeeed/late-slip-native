import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import authServices from "@/services/authServices";
import { router } from "expo-router"; // ✅ you forgot this

export const options = {
  headerShown: false,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please fill up all the forms");
      return;
    }

    setLoading(true);

    try {
      const response = await authServices.login(email, password);

      if (response.success) {
        Alert.alert("Success", response.message || "Login successful");
        // TODO: Save token using AsyncStorage if needed
        router.replace("/(tabs)"); // 👈 Go to main app
      } else {
        Alert.alert("Login Failed", response.message || "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Welcome Back</Text>

      <TextInput
        style={style.input}
        value={email}
        onChangeText={setEmail} // ✅ You missed this
        placeholder="Enter Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={style.input}
        value={password}
        onChangeText={setPassword} // ✅ You missed this
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={[style.button, loading && { backgroundColor: "#ccc" }]}
        onPress={handleLogin} // ✅ You missed this
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0066cc",
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
