import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Herald Sync</Text>
        <Text style={styles.signupText}>Signup using your college email.</Text>
      </View>

      <View>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(0, 0, 0, 0.5)" />
      </View>

      <View>
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(0, 0, 0, 0.5)" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
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

export default register;

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
  signupText: {
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
  toSignIn: {
    textAlign: "center",
    margin: 20,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   logoText: {
//     fontSize: 35,
//     fontWeight: "bold",
//     color: "#74C044",
//     margin: 20,
//   },
//   signupText: {
//     fontSize: 14,
//     textAlign: "left",
//     color: "#3C3C3C",
//     fontWeight: "bold",
//   },
//   logoContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#74C044",
//     paddingVertical: 14,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   toSignIn: {
//     textAlign: "center",
//   },
// });
