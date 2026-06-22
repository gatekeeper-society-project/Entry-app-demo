import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../(context)/Theme';

export default function TermsAndPrivacy() {
  const theme = useTheme();

  // Safety Fallback: Use context if available, otherwise fallback to clean defaults so it NEVER crashes
  const colors = theme?.colors || {
    background: '#F9F9FC',
    cardBackground: '#FFFFFF',
    cardBorder: '#D3CDE6',
    primaryText: '#4A3B70',
    secondaryText: '#6A5B8C',
    headerTitle: '#6C7A89',
    sectionHeading: '#2D3748',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Header Bar */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={[styles.backButtonCircle, { backgroundColor: colors.cardBackground }]} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.headerTitle }]}>Terms & Privacy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Section 1: Terms of Service */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionHeading, { color: colors.sectionHeading }]}>1. Terms of Service</Text>
          <Text style={[styles.bodyText, { color: colors.secondaryText }]}>
            By accessing and utilizing this application, you agree to be bound by our general system guidelines and operational regulations. The services provided here are strictly for individual, non-commercial use unless specified otherwise.
          </Text>
        </View>

        {/* Section 2: Privacy Policy */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionHeading, { color: colors.sectionHeading }]}>2. Privacy Policy</Text>
          <Text style={[styles.bodyText, { color: colors.secondaryText }]}>
            Your privacy is highly important to us. We securely maintain your essential user account metrics and application preferences directly on your device. We do not transmit your private profile information, generated identifiers, or logs to external third-party data tracking brokers.
          </Text>
        </View>

        {/* Section 3: Local Storage Usage */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionHeading, { color: colors.sectionHeading }]}>3. Data Storage & Theme Sync</Text>
          <Text style={[styles.bodyText, { color: colors.secondaryText }]}>
            The application stores your layout preferences, such as your selected dark mode settings toggle, locally within your app bundle data partition to maintain a seamless configuration experience across system runs.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionBlock: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
  },
});