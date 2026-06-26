// =====================================================================
// FILE PATH: app/index.jsx
// =====================================================================

import { Redirect } from "expo-router";

export default function Index() {
  // Instead of auto-routing straight to tabs, route to Auth group.
  // The root _layout.jsx will handle forwarding authorized sessions to /(tabs).
  return <Redirect href="/(auth)/Login" />;
}