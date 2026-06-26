// =====================================================================
// FILE PATH: app/(securityTabs)/ResidentsList.jsx
// =====================================================================

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../(context)/Theme';

export default function ResidentsList() {
  const { colors } = useTheme();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive mock database tracking the actual apartment residents
  const RESIDENTS_DATABASE = [
    { id: '1', doorNo: '101', name: 'Alice Green', phone: '+96 6111222333', familyMembers: '3', vehicleNo: 'ABC-123' },
    { id: '2', doorNo: '112', name: 'James Smith', phone: '+96 6543219876', familyMembers: '2', vehicleNo: 'XYZ-789' },
    { id: '3', doorNo: '245', name: 'John Doe', phone: '+96 6233723623', familyMembers: '4', vehicleNo: 'RES-456' },
    { id: '4', doorNo: '304', name: 'Robert Johnson', phone: '+96 6112233445', familyMembers: '1', vehicleNo: 'None' },
    { id: '5', doorNo: '402', name: 'Emily Davis', phone: '+96 6777888999', familyMembers: '5', vehicleNo: 'MNO-321' }
  ];

  // Live filtering logic matching text against name string or flat apartment number
  const filteredResidents = RESIDENTS_DATABASE.filter(resident => {
    const query = searchQuery.toLowerCase().trim();
    return (
      resident.name.toLowerCase().includes(query) || 
      resident.doorNo.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Search Input Module */}
      <View style={styles.searchSectionWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search Resident Name or Door No..." 
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

      {/* Main Layout Presentation Container */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>
          Registered Residents ({filteredResidents.length})
        </Text>
        
        {filteredResidents.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="people-outline" size={48} color="#CBD5E0" />
            <Text style={styles.emptyStateText}>No residents found matching "{searchQuery}"</Text>
          </View>
        ) : viewMode === 'list' ? (
          /* ================= ROW VIEW MODE ================= */
          <View style={styles.listContainer}>
            {filteredResidents.map((resident) => (
              <TouchableOpacity 
                key={resident.id} 
                style={[styles.residentRow, { backgroundColor: colors.cardBackground || '#FFFFFF', borderColor: colors.cardBorder || '#E2E8F0' }]}
                activeOpacity={0.7}
                onPress={() => router.push({
                  pathname: '/(securityTabs)/ProfileDetailsCard',
                  params: { name: resident.name, door: resident.doorNo }
                })}
              >
                <View style={styles.rowLeftSection}>
                  <View style={styles.avatarIconBox}>
                    <Ionicons name="home" size={18} color="#3B2A60" />
                  </View>
                  <View style={styles.textStack}>
                    <Text style={styles.rowItemName}>{resident.name}</Text>
                    <Text style={styles.rowItemSubtext}>Door No: {resident.doorNo}  •  Ph: {resident.phone}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color="#A5BAC9" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* ================= DATA TABLE VIEW MODE ================= */
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableHorizontalWrapper}>
            <View style={[styles.tableContainer, { backgroundColor: colors.cardBackground || '#FFFFFF', borderColor: colors.cardBorder || '#E2E8F0' }]}>
              {/* Header Titles Row */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, { width: 70 }]}>Door No.</Text>
                <Text style={[styles.tableHeaderCell, { width: 140 }]}>Resident Name</Text>
                <Text style={[styles.tableHeaderCell, { width: 120 }]}>Phone No.</Text>
                <Text style={[styles.tableHeaderCell, { width: 80, textAlign: 'center' }]}>Family Size</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Vehicle Reg</Text>
              </View>

              {/* Data Values Rows */}
              {filteredResidents.map((resident) => (
                <TouchableOpacity 
                  key={resident.id} 
                  style={styles.tableBodyRow}
                  activeOpacity={0.7}
                  onPress={() => router.push({
                    pathname: '/(securityTabs)/ProfileDetailsCard',
                    params: { name: resident.name, door: resident.doorNo }
                  })}
                >
                  <Text style={[styles.tableBodyCell, { width: 70, fontWeight: '700', color: '#3B2A60' }]}>{resident.doorNo}</Text>
                  <Text style={[styles.tableBodyCell, { width: 140, fontWeight: '600', color: '#2D3748' }]}>{resident.name}</Text>
                  <Text style={[styles.tableBodyCell, { width: 120 }]}>{resident.phone}</Text>
                  <Text style={[styles.tableBodyCell, { width: 80, textAlign: 'center' }]}>{resident.familyMembers}</Text>
                  <Text style={[styles.tableBodyCell, { width: 100, color: '#718096' }]}>{resident.vehicleNo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </ScrollView>

      {/* Persistent Dynamic Mode Control Bar Footer */}
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
    flex: 1 
  },
  searchSectionWrapper: {
    paddingHorizontal: 20,
    paddingTop: 24, // Keeps search entry cleanly clear of system headers
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
    paddingTop: 20, // Pushes listing cards comfortably below headers
    paddingBottom: 110 
  },
  sectionHeading: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000000', 
    marginBottom: 14, 
    paddingLeft: 2 
  },
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
  
  /* Row View Mode Styles */
  listContainer: { 
    gap: 10 
  },
  residentRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 14, 
    paddingHorizontal: 14, 
    borderRadius: 14, 
    borderWidth: 1 
  },
  rowLeftSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    flex: 1 
  },
  avatarIconBox: { 
    width: 38, 
    height: 38, 
    borderRadius: 10, 
    backgroundColor: '#F1EEFA', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textStack: { 
    gap: 2, 
    flex: 1 
  },
  rowItemName: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#2D3748' 
  },
  rowItemSubtext: { 
    fontSize: 12, 
    color: '#718096' 
  },

  /* Data Table View Mode Styles */
  tableHorizontalWrapper: { 
    width: '100%',
    marginTop: 4 
  },
  tableContainer: { 
    borderRadius: 16, 
    borderWidth: 1, 
    overflow: 'hidden' 
  },
  tableHeaderRow: { 
    flexDirection: 'row', 
    backgroundColor: '#F7FAFC', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0', 
    paddingVertical: 12, 
    paddingHorizontal: 8 
  },
  tableHeaderCell: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#4A5568' 
  },
  tableBodyRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EDF2F7', 
    paddingVertical: 14, 
    paddingHorizontal: 8, 
    alignItems: 'center' 
  },
  tableBodyCell: { 
    fontSize: 13, 
    color: '#4A5568' 
  },

  /* Sticky Swapper Footer Panel Styles */
  viewToggleFooter: { 
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    right: 20, 
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row', 
    borderRadius: 20, 
    padding: 6, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 6 
  },
  toggleButton: { 
    flex: 1, 
    flexDirection: 'row', 
    height: 44, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8 
  },
  activeToggle: { 
    backgroundColor: '#3B2A60' 
  },
  inactiveToggle: { 
    backgroundColor: 'transparent' 
  },
  toggleButtonText: { 
    fontSize: 13, 
    fontWeight: '600' 
  },
  activeText: { 
    color: '#FFFFFF' 
  },
  inactiveText: { 
    color: '#3B2A60' 
  }
});