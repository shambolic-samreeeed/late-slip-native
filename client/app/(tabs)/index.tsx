import { Link, router } from "expo-router";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

export default function Index() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Logged out", "You have been logged out.");
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
      }}
    >
      <View style={{ display: "flex" }}>
        <Header />
      </View>
      <Text>Welcome!</Text>
      <Link href="/(auth)/login">Login</Link>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
