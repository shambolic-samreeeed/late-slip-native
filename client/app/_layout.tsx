import { Slot, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RootLayout() {

  const router = useRouter();

  useEffect(()=>{
    const checkAuthentication = async()=>{
      const token = await AsyncStorage.getItem("token")
      if(token){
        router.replace('/(tabs)/profile')
      }else{
        router.replace('/(auth)/register')
      }
    }

    checkAuthentication();
  },[])
  return (
    <Slot/>
  );
}
