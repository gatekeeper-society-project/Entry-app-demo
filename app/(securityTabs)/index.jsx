// =====================================================================
// FILE PATH: app/(securityTabs)/index.jsx
// =====================================================================

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../(context)/Theme';

const DUMMY_VISITORS = [
  { id: '1', name: 'John Doe', time: '12:23 AM' },
  { id: '2', name: 'James Smith', time: '01:10 AM' },
];

const DUMMY_EVENTS = [
  { id: '1', name: 'Community Meeting', date: 'June 28, 2026' },
  { id: '2', name: 'Annual Maintenance', date: 'July 02, 2026' },
];

export default function SecurityHome() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Identity Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.hiText}>Hello</Text>
          <Text style={styles.userNameText}>Joel Heinz</Text>
          <Text style={styles.subIdText}>Security Id : 007</Text>
        </View>

        {/* Today's Visitors Header Row */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Today Visitor's</Text>
          <TouchableOpacity onPress={() => router.push('/(securityTabs)/VisitorsList')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Visitor Cards Stack */}
        <View style={styles.visitorListStack}>
          {DUMMY_VISITORS.map((visitor) => (
            <TouchableOpacity 
              key={visitor.id} 
              style={[styles.visitorCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}
              activeOpacity={0.7}
              onPress={() => router.push('/(securityTabs)/VisitorsList')}
            >
              <View style={styles.visitorLeftRow}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.visitorTextStack}>
                  <Text style={styles.cardItemName}>{visitor.name}</Text>
                  <Text style={styles.cardItemSubtext}>{visitor.time}</Text>
                </View>
              </View>
              <View style={styles.arrowButton}>
                <Ionicons name="chevron-forward-circle-outline" size={24} color="#A5BAC9" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Events Header Row */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => router.push('/(securityTabs)/EventsList')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Events Layout Grid */}
        <View style={styles.eventGridWrapper}>
          {DUMMY_EVENTS.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={[styles.eventGridCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}
              activeOpacity={0.7}
              onPress={() => router.push({
                pathname: '/(securityTabs)/EventDetailsCard',
                params: { eventName: event.name, eventDate: event.date }
              })}
            >
              <View style={styles.eventImagePlaceholder} />
              <View style={styles.eventTextPadding}>
                <Text style={styles.cardItemName}>{event.name}</Text>
                <Text style={styles.cardItemSubtext}>{event.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 },
  headerContainer: { marginBottom: 16, paddingLeft: 4 },
  hiText: { fontSize: 18, color: '#8A8A8A' },
  userNameText: { fontSize: 32, fontWeight: '700', color: '#2D4A3E', marginTop: 2 },
  subIdText: { fontSize: 14, color: '#A0AEC0', marginTop: 4 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 12, paddingHorizontal: 4 },
  sectionHeading: { fontSize: 16, fontWeight: '600', color: '#000000' },
  viewAllText: { fontSize: 14, color: '#3B2A60', fontWeight: '600' },
  visitorListStack: { gap: 12, marginBottom: 16 },
  visitorCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 20, borderWidth: 1 },
  visitorLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#D9D9D9' },
  visitorTextStack: { gap: 2 },
  cardItemName: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  cardItemSubtext: { fontSize: 13, color: '#A0AEC0' },
  arrowButton: { padding: 2 },
  eventGridWrapper: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  eventGridCard: { width: '48%', borderRadius: 18, borderWidth: 1, overflow: 'hidden', paddingBottom: 12 },
  eventImagePlaceholder: { width: '100%', height: 104, backgroundColor: '#D9D9D9' },
  eventTextPadding: { paddingTop: 10, paddingHorizontal: 12, gap: 2 },
});