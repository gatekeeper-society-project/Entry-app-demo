// =====================================================================
// FILE PATH: app/(securityTabs)/EventsList.jsx
// =====================================================================

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../(context)/Theme';

export default function EventsList() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const DUMMY_EVENTS = [
    { id: '1', name: 'Community Meeting', date: 'June 28, 2026', location: 'Clubhouse Main Hall' },
    { id: '2', name: 'Annual Maintenance', date: 'July 02, 2026', location: 'Block A & B Grid' },
    { id: '3', name: 'Summer Festival Gala', date: 'July 15, 2026', location: 'Central Open Park' },
    { id: '4', name: 'Fire Safety Drill', date: 'July 22, 2026', location: 'All Premises' }
  ];

  // Dynamic live search tracking across event titles and their listed locations
  const filteredEvents = DUMMY_EVENTS.filter(event => {
    const formattedQuery = searchQuery.toLowerCase().trim();
    return (
      event.name.toLowerCase().includes(formattedQuery) ||
      event.location.toLowerCase().includes(formattedQuery)
    );
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Search Header */}
      <View style={styles.searchSectionWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search Events Here" 
            placeholderTextColor="#A0AEC0"
            style={styles.textInputStyle}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main List Scroll Container */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Upcoming Events ({filteredEvents.length})</Text>
        
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="calendar-outline" size={40} color="#CBD5E0" />
            <Text style={styles.emptyStateText}>No matching scheduled events found</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredEvents.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={[styles.eventCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}
                activeOpacity={0.7}
                onPress={() => router.push({
                  pathname: '/(securityTabs)/EventDetailsCard',
                  params: { eventName: event.name, eventDate: event.date, eventLocation: event.location }
                })}
              >
                <View style={styles.cardLeftRow}>
                  <View style={styles.eventBoxIcon}>
                    <Ionicons name="calendar" size={22} color="#3B2A60" />
                  </View>
                  <View style={styles.textStack}>
                    <Text style={styles.cardItemName}>{event.name}</Text>
                    <Text style={styles.cardItemSubtext}>{event.date} • {event.location}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-circle-outline" size={24} color="#A5BAC9" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  searchSectionWrapper: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 54,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  searchIcon: { marginRight: 10 },
  textInputStyle: { flex: 1, fontSize: 15, color: '#000000' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  sectionHeading: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 16, paddingLeft: 4 },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  listContainer: { gap: 12 },
  eventCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 20, borderWidth: 1 },
  cardLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  eventBoxIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#F1EEFA', justifyContent: 'center', alignItems: 'center' },
  textStack: { gap: 2 },
  cardItemName: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  cardItemSubtext: { fontSize: 13, color: '#A0AEC0' },
});