import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="persona-selection" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
