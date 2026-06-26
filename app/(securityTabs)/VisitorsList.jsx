// =====================================================================
// FILE PATH: app/(securityTabs)/VisitorsList.jsx
// =====================================================================

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../(context)/Theme';

export default function VisitorsList() {
  const { colors } = useTheme();
  // State to manage whether we see the compact list rows or the datatable overview
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [searchQuery, setSearchQuery] = useState('');

  const DUMMY_VISITORS = [
    { id: '1', name: 'John Doe', time: '12:23 AM', doorNo: '245', phone: '+96 6233723623', admits: '1' },
    { id: '2', name: 'James Smith', time: '01:10 AM', doorNo: '112', phone: '+96 6543219876', admits: '2' },
    { id: '3', name: 'Robert Johnson', time: '02:45 AM', doorNo: '304', phone: '+96 6112233445', admits: '1' },
    { id: '4', name: 'Michael Brown', time: '04:15 AM', doorNo: '088', phone: '+96 6998877665', admits: '4' }
  ];

  // Real-time live filtering against visitor name or door number
  const filteredVisitors = DUMMY_VISITORS.filter(visitor => {
    const formattedQuery = searchQuery.toLowerCase().trim();
    return (
      visitor.name.toLowerCase().includes(formattedQuery) ||
      visitor.doorNo.toLowerCase().includes(formattedQuery)
    );
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Top Search Bar */}
      <View style={styles.searchSectionWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search Here" 
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

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Today Visitor's ({filteredVisitors.length})</Text>
        
        {filteredVisitors.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="people-outline" size={40} color="#CBD5E0" />
            <Text style={styles.emptyStateText}>No matching visitors found</Text>
          </View>
        ) : viewMode === 'list' ? (
          /* ================= LIST MODE VIEW ================= */
          <View style={styles.listContainer}>
            {filteredVisitors.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.visitorRow, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}
                activeOpacity={0.7}
                onPress={() => router.push({
                  pathname: '/(securityTabs)/ProfileDetailsCard',
                  params: { name: item.name }
                })}
              >
                <View style={styles.rowLeftSection}>
                  <View style={styles.smallAvatarCircle} />
                  <View style={styles.textStack}>
                    <Text style={styles.rowItemName}>{item.name}</Text>
                    <Text style={styles.rowItemSubtext}>Time In: {item.time}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color="#A5BAC9" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* ================= TABLE DATAGRID VIEW ================= */
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableHorizontalWrapper}>
            <View style={[styles.tableContainer, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
              {/* Header Row */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>S.no.</Text>
                <Text style={[styles.tableHeaderCell, { width: 80 }]}>Door No.</Text>
                <Text style={[styles.tableHeaderCell, { width: 140 }]}>Res. Name</Text>
                <Text style={[styles.tableHeaderCell, { width: 130 }]}>Ph.no.</Text>
                <Text style={[styles.tableHeaderCell, { width: 90 }]}>No. admits</Text>
              </View>

              {/* Data Body Rows */}
              {filteredVisitors.map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.tableBodyRow}
                  onPress={() => router.push({
                    pathname: '/(securityTabs)/ProfileDetailsCard',
                    params: { name: item.name }
                  })}
                >
                  <Text style={[styles.tableBodyCell, { width: 50 }]}>{index + 1}</Text>
                  <Text style={[styles.tableBodyCell, { width: 80, fontWeight: '600' }]}>{item.doorNo}</Text>
                  <Text style={[styles.tableBodyCell, { width: 140, color: '#2D3748' }]}>{item.name}</Text>
                  <Text style={[styles.tableBodyCell, { width: 130 }]}>{item.phone}</Text>
                  <Text style={[styles.tableBodyCell, { width: 90, textAlign: 'center' }]}>{item.admits}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </ScrollView>

      {/* Persistent Dynamic View Switcher Footer Button */}
      <View style={styles.viewToggleFooter}>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'list' ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => setViewMode('list')}
        >
          <Ionicons name="list-outline" size={18} color={viewMode === 'list' ? '#FFFFFF' : '#3B2A60'} />
          <Text style={[styles.toggleButtonText, viewMode === 'list' ? styles.activeText : styles.inactiveText]}>Row View</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'table' ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => setViewMode('table')}
        >
          <Ionicons name="grid-outline" size={18} color={viewMode === 'table' ? '#FFFFFF' : '#3B2A60'} />
          <Text style={[styles.toggleButtonText, viewMode === 'table' ? styles.activeText : styles.inactiveText]}>Table View</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchSectionWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
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
  searchIcon: {
    marginRight: 10,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    paddingLeft: 4,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 6,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#718096',
  },
  listContainer: {
    gap: 8,
  },
  visitorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  rowLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
  },
  textStack: {
    gap: 1,
  },
  rowItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  rowItemSubtext: {
    fontSize: 12,
    color: '#718096',
  },
  tableHorizontalWrapper: {
    width: '100%',
  },
  tableContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tableHeaderCell: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
  },
  tableBodyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tableBodyCell: {
    fontSize: 13,
    color: '#718096',
  },
  viewToggleFooter: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    gap: 6,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  activeToggle: {
    backgroundColor: '#3B2A60',
  },
  inactiveToggle: {
    backgroundColor: 'transparent',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#3B2A60',
  },
});