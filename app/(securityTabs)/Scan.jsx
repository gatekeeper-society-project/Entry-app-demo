// =====================================================================
// FILE PATH: app/(securityTabs)/Scan.jsx
// =====================================================================

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Scan() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Rounded dashed corner container representing mockup image framing lines */}
        <View style={styles.scannerWindowFrame}>
          <Ionicons name="scan-outline" size={100} color="#3B2A60" style={styles.scanIcon} />
          <Text style={styles.hintText}>Align QR Code within the frame</Text>
        </View>

        <TouchableOpacity 
          style={styles.scanButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/(securityTabs)/VisitorDetails')}
        >
          <Ionicons name="camera" size={20} color="#FFFFFF" />
          <Text style={styles.scanButtonText}>Simulate Successful Scan</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FE',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scannerWindowFrame: {
    width: 290,
    height: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B2A60',
    borderStyle: 'dashed',
    marginBottom: 44,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  scanIcon: {
    opacity: 0.8,
  },
  hintText: {
    fontSize: 14,
    color: '#7A869A',
    marginTop: 20,
    fontWeight: '500',
  },
  scanButton: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 328,
    backgroundColor: '#3B2A60',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});