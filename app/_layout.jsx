// =====================================================================
// FILE PATH: app/_layout.jsx
// =====================================================================

import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './(context)/Theme';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mimic checking device storage / cookies profile sessions
    const checkLoginStatus = async () => {
      try {
        setIsAuthenticated(false); // Defaulting to false guarantees safety
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/(auth)/Login'); 
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return null;

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
} 