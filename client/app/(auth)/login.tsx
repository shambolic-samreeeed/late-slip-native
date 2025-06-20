import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export const options = {
  headerShown: false,
};

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <View style={style.container}>
      <Text style={style.title}> Welcome Back </Text>
      <TextInput
        style={style.input}
        value={email}
        placeholder="Enter Your Email"
        keyboardType="email-address"
      ></TextInput>

      <TextInput
        style={style.input}
        value="password"
        placeholder="Password"
        secureTextEntry
      ></TextInput>

      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
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
export default login;
