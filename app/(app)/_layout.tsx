import { Stack } from "expo-router";
import { AuthProvider } from "../../contexts/AuthContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="persona-selection" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}
