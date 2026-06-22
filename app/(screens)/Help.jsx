import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../(context)/Theme';

export default function Help() {
  const theme = useTheme();

  // Safety Fallback: Use values if context is ready, otherwise use clean defaults
  const colors = theme?.colors || {
    background: '#F9F9FC',
    cardBackground: '#FFFFFF',
    cardBorder: '#D3CDE6',
    primaryText: '#4A3B70',
    secondaryText: '#6A5B8C',
    headerTitle: '#6C7A89',
    sectionHeading: '#2D3748',
    tabBarActive: '#3B2A60',
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
        <Text style={[styles.headerTitle, { color: colors.headerTitle }]}>Help Center</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.introText, { color: colors.secondaryText }]}>
          If you have any questions or require assistance, please reach out to our team using the static details below.
        </Text>

        <View style={styles.contactListStack}>
          
          {/* Static Phone Card */}
          <View style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.tabBarActive + '15' }]}>
              <Ionicons name="call" size={22} color={colors.tabBarActive} />
            </View>
            <View style={styles.contactTextContent}>
              <Text style={[styles.contactTitle, { color: colors.sectionHeading }]}>Customer Care Number</Text>
              <Text style={[styles.contactDetail, { color: colors.secondaryText }]}>1800-123-4567</Text>
            </View>
          </View>

          {/* Static Email Card */}
          <View style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#4299E115' }]}>
              <Ionicons name="mail" size={22} color="#4299E1" />
            </View>
            <View style={styles.contactTextContent}>
              <Text style={[styles.contactTitle, { color: colors.sectionHeading }]}>Email Support Address</Text>
              <Text style={[styles.contactDetail, { color: colors.secondaryText }]}>support@yourdomain.com</Text>
            </View>
          </View>

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
  introText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  contactListStack: {
    gap: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactTextContent: {
    flex: 1,
    gap: 2,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactDetail: {
    fontSize: 14,
  },
});