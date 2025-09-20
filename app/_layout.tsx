import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { 
  useFonts, 
  Lora_400Regular, 
  Lora_500Medium, 
  Lora_600SemiBold, 
  Lora_700Bold 
} from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/contexts/AuthContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Lora_400Regular': Lora_400Regular,
    'Lora_500Medium': Lora_500Medium,
    'Lora_600SemiBold': Lora_600SemiBold,
    'Lora_700Bold': Lora_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="splash" />
          <Stack.Screen name="persona-selection" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
      <StatusBar style="auto" />
    </>
  );
}