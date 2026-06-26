// =====================================================================
// FILE PATH: app/(screens)/ProfileDetailsCard.jsx
// =====================================================================

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../(context)/Theme';

export default function ProfileDetailsCard() {
  const { colors } = useTheme();
  const { name } = useLocalSearchParams(); // Captures the name clicked from the list dynamically

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Top Header Row with Circle Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircleButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main Content Profile Layout */}
      <View style={styles.contentContainer}>
        <View style={[styles.detailsCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
          
          {/* Row 1: Name & Door number */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Name</Text>
              <Text style={styles.fieldValueText}>{name || 'Santhosh Kumar .N'}</Text>
            </View>
            <View style={[styles.infoGroup, { alignItems: 'flex-end' }]}>
              <Text style={styles.fieldLabelText}>Door no.</Text>
              <Text style={styles.fieldValueText}>245</Text>
            </View>
          </View>

          {/* Row 2: Phone number */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Ph. no.</Text>
              <Text style={styles.fieldValueText}>+96 6233723623</Text>
            </View>
            <View style={[styles.infoGroup, { alignItems: 'flex-end' }]}>
              {/* Layout placeholder matching image structure */}
              <View style={styles.emptySpacer} />
            </View>
          </View>

          {/* Row 3: Email Input segment */}
          <View style={styles.infoGridRow}>
            <View style={styles.infoGroup}>
              <Text style={styles.fieldLabelText}>Email</Text>
              <Text style={styles.fieldValueText}>User@gmail.com</Text>
            </View>
          </View>

        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  detailsCard: {
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
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
    color: '#5A6A85',
    fontWeight: '600',
  },
  emptySpacer: {
    height: 20,
  },
});