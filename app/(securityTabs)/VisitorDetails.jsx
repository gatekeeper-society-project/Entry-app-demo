// =====================================================================
// FILE PATH: app/(securityTabs)/VisitorDetails.jsx
// =====================================================================

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VisitorDetails() {
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top Navigation Bar Component */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main Content Body */}
      <View style={styles.contentContainer}>
        <View style={styles.detailsCard}>
          
          {/* Row Pair #1: Host Name & Door Assignment */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Name</Text>
              <Text style={styles.fieldValueText}>Thorfinn</Text>
            </View>
            <View style={[styles.infoGroup, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabelText}>Door no.</Text>
              <Text style={styles.fieldValueText}>245</Text>
            </View>
          </View>

          {/* Row Pair #2: Contact & Code Timestamp */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Ph. no.</Text>
              <Text style={styles.fieldValueText}>+91 6233723623</Text>
            </View>
            <View style={[styles.infoGroup, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabelText}>Created Time</Text>
              <Text style={styles.fieldValueText}>12:23 AM</Text>
            </View>
          </View>

          {/* Row Pair #3: Visitor Display Tag Name & Entrant Counting */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Guest Name</Text>
              <Text style={styles.fieldValueText}>James Smith</Text>
            </View>
            <View style={[styles.infoGroup, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabelText}>no. Admits</Text>
              <Text style={styles.fieldValueText}>1</Text>
            </View>
          </View>

          {/* Expiry Tracking Segment */}
          <View style={styles.expiryTrackingContainer}>
            <Text style={styles.expiryLabelText}>Expires In</Text>
            <Text style={styles.countdownTimerDisplay}>
              <Text style={styles.countdownHighlightText}>18</Text>:23:34
            </Text>
          </View>

        </View>
      </View>

      {/* Sticky Bottom Interactive Double Actions */}
      <View style={styles.footerActionRow}>
        <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FE', // Clean light purple background tint
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 36,
    shadowColor: '#636363',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  infoGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  infoGroup: {
    flex: 1,
    gap: 4,
  },
  fieldLabelText: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  fieldValueText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '600',
  },
  expiryTrackingContainer: {
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  expiryLabelText: {
    fontSize: 13,
    color: '#7A869A',
    fontWeight: '500',
  },
  countdownTimerDisplay: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4A5568',
    letterSpacing: 0.5,
  },
  countdownHighlightText: {
    color: '#FF4D4D', // Red dynamic text accent matching screen mockup
  },
  footerActionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2DCEF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#A295BC',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#B1A6C9', // Signature muted lavender purple color from design assets
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});