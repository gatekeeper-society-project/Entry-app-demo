// =====================================================================
// FILE PATH: app/(securityTabs)/_layout.jsx
// =====================================================================

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../(context)/Theme';

export default function SecurityTabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActive || '#3B2A60',
        tabBarInactiveTintColor: colors.tabBarInactive || '#7A869A',
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground || '#F9FBFB',
          borderTopWidth: 1,
          borderTopColor: colors.tabBarBorder || '#E2E8F0',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => <Ionicons name="scan-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Residents"
        options={{
          title: 'Residents',
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />

      {/* Hidden Screens from the Bottom Tab Bar */}
      <Tabs.Screen name="VisitorDetails" options={{ href: null }} />
      <Tabs.Screen name="VisitorsList" options={{ href: null }} />
      <Tabs.Screen name="ProfileDetailsCard" options={{ href: null }} />
      <Tabs.Screen name="EventsList" options={{ href: null }} />
      <Tabs.Screen name="EventDetailsCard" options={{ href: null }} />
    </Tabs>
  );
}