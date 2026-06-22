import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../(context)/Theme'; // Centralized global context hook location

export default function Plans() {
  const { selectedPlan } = useLocalSearchParams();
  const { setActivePlan } = useTheme();

  const currentPlanName = selectedPlan || 'Premium Plan';

  const goHomeWithSubscription = () => {
    setActivePlan(currentPlanName);
    router.replace('/');
  };

  const handleCheckout = () => {
    if (Platform.OS === 'web') {
      window.alert('Processing Checkout. Redirecting home...');
      goHomeWithSubscription();
      return;
    }

    Alert.alert('Processing Checkout', 'Redirecting to payment gateway...', [
      {
        text: 'OK',
        onPress: goHomeWithSubscription
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Pinned Navigation Header */}
      <View style={styles.headerNavigationBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Purchase</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Screen Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          
          {/* Header Row */}
          <View style={styles.badgeRow}>
            <Ionicons name="diamond-outline" size={28} color="#3B2A60" />
            <Text style={styles.planTitle}>{currentPlanName}</Text>
          </View>

          {/* Pricing Info Block */}
          <Text style={styles.priceText}>
            {currentPlanName === 'Basic Plan' ? '₹399.99' : currentPlanName === 'Standard Plan' ? '₹999.99' : '₹1499.99'}
            <Text style={styles.periodText}>/month</Text>
          </Text>

          {/* Plan Description Text */}
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex 
            sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis 
            convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus 
            fringilla lacus nec metus bibendum egestas. Laculis massa nisl malesuada 
            lacinia integer nunc posuere. 
            {"\n\n"}
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per 
            conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.
          </Text>

          {/* CTA Payment Control Button */}
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FE',
  },
  headerNavigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3B2A60',
  },
  priceText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7A869A',
  },
  descriptionText: {
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 36,
  },
  checkoutButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});