import { Stack } from 'expo-router';

export default function OwnerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="stadium/[id]" />
      <Stack.Screen name="bookings" />
      <Stack.Screen name="add-stadium" />
    </Stack>
  );
}