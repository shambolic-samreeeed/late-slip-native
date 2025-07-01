import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoWrapper}>
        {/* <Image
          source={require("../assets/images/footer-logo.png")}
          style={styles.image}
        /> */}
      </View>
      {/* <Text style={styles.logoText}>Herald Sync</Text> */}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/notifications")}
        >
          <FontAwesome5 name="bell" size={24} color="#2F4858CC" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/notifications")}
        >
          <Entypo name="menu" size={24} color="#2F4858CC" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#3C3C3C",
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
    color: "#75BF43",
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
  button: {},
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },
});
