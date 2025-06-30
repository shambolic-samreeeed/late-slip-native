import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/notifications");
      } else {
        router.replace("/(auth)/register");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}
