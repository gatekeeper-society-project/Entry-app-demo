import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router'; // Enhanced Expo Router for web/mobile synchronization
import { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../(context)/Theme'; // Adjust path depending on project layout

const CLOSE_FRIENDS_DATA = [ 
  { id: '1', firstName: 'Alex', avatarUrl: 'https://fastly.picsum.photos/id/661/200/300.jpg?hmac=j0ICelTq_T71g1Ejb1d0iy2byHhhIoB1J1pMAVRoBpk' },
  { id: '2', firstName: 'Steve', avatarUrl: 'https://fastly.picsum.photos/id/203/200/300.jpg?hmac=mJaqsySlyEjr8fLBHytyVCUyqlfPSxqXePXEIhZZi_Y' },
  { id: '3', firstName: 'Emma', avatarUrl: 'https://fastly.picsum.photos/id/823/200/300.jpg?hmac=Sv69FIuXkj79IVp4uZ1YpgRHDGP0jadf5nSiTx1xSoo' },
  { id: '4', firstName: 'James', avatarUrl: 'https://fastly.picsum.photos/id/768/200/300.jpg?hmac=lFX2oZVTUayugh_YZQ5q6uoXJFYaOJz3d2_GLaIW2aU' },
  { id: '5', firstName: 'Berlin', avatarUrl: 'https://fastly.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ' },
];

export default function Home() {
  // Pull centralized colors from global state context
  const { colors, activePlan, setActivePlan } = useTheme();
  const [showAlternativePlans, setShowAlternativePlans] = useState(false);
  const params = useLocalSearchParams();

  // Web Synchronization Fallback: Catches URL search query parameters when routed on browsers
  useEffect(() => {
    if (params?.activePlan) {
      setActivePlan(params.activePlan);
    }
  }, [params?.activePlan]);
  
  // Handles routing out of the (tabs) context into your custom (screens) bundle folder
  const handlePlanPress = (planName) => {
    router.push({
      pathname: '/(screens)/Plans',
      params: { selectedPlan: planName }
    });
  };
  
  return (
    <SafeAreaView style={[styles.safeArea,{ backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Greeting Section */}
        <View style={styles.headerContainer}>
          <Text style={[styles.subGreeting, { color: colors.secondaryText }]}>Hi</Text>
          <Text style={[styles.mainGreeting, { color: colors.isDarkTheme ? colors.primaryText : '#2D4A3E' }]}>Joel Heinz</Text>
        </View>

        {/* Large Highlight Card (Close Friends with Static Profiles) */}
        <View style={[styles.closeFriendsCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
          <Text style={[styles.cardTitleText, { color: colors.secondaryText }]}>Close Friends</Text>
          
          {/* Horizontal list displaying friend images and first names */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.friendsScrollContainer}
          >
            {CLOSE_FRIENDS_DATA.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <Image 
                  source={{ uri: friend.avatarUrl }} 
                  style={styles.friendPhoto} 
                />
                <Text style={[styles.friendNameText, { color: colors.primaryText }]} numberOfLines={1}>
                  {friend.firstName}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Dual Action Control Area with Captions */}
          <View style={styles.actionButtonsRow}>
            
            {/* Add Friend*/}
            <View style={styles.controlbutton}>
              <TouchableOpacity style={[styles.circleButton, styles.addButton]} activeOpacity={0.7}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={[styles.controlCaption, { color: colors.secondaryText }]}>ADD</Text>
            </View>

            {/* Remove Friend */}
            <View style={styles.controlbutton}>
              <TouchableOpacity style={[styles.circleButton, styles.removeButton, { backgroundColor: colors.isDarkTheme ? '#2D2D34' : '#E2E8F0', borderColor: colors.cardBorder }]} activeOpacity={0.7}>
                <Ionicons name="remove" size={24} color={colors.isDarkTheme ? '#A0AEC0' : '#7A869A'} />
              </TouchableOpacity>
              <Text style={[styles.controlCaption, { color: colors.secondaryText }]}>REMOVE</Text>
            </View>

          </View>
        </View>

        {/* Section Title */}
        <Text style={[styles.sectionTitleText, { color: colors.primaryText }]}>Subscription Details</Text>

        {/* 1. ACTIVE SUBSCRIPTION VIEW SECTION */}
        {activePlan && !showAlternativePlans && (
          <View style={[styles.activePlanEditCard, { backgroundColor: colors.cardBackground, borderColor: colors.tabBarActive }]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.titleBadgeContainer}>
                <Ionicons name="checkmark-circle" size={24} color={colors.tabBarActive} />
                <View style={{ marginLeft: 4 }}>
                  <Text style={[styles.planTitleText, { color: colors.primaryText, fontSize: 20 }]}>{activePlan}</Text>
                  <Text style={{ color: colors.secondaryText, fontSize: 13 }}>Current Active Membership</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.editCardActionRow}>
              <TouchableOpacity 
                style={[styles.changePlanButton, { backgroundColor: colors.tabBarActive }]}
                onPress={() => setShowAlternativePlans(true)}
              >
                <Text style={styles.changePlanButtonText}>Change Plan</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelPlanButton}
                onPress={() => {
                  setActivePlan(null);
                  setShowAlternativePlans(false);
                  router.setParams({ activePlan: '' }); // Clear URL parameters on Web
                }}
              >
                <Text style={{ color: '#FF4D4D', fontWeight: '600', fontSize: 14 }}>Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 2. UPGRADE OR NEW PLAN SUBSCRIPTION SELECTION LIST SECTION */}
        {(!activePlan || showAlternativePlans) && (
          <View style={styles.subscriptionListStack}>
            
            {showAlternativePlans && (
              <TouchableOpacity 
                style={styles.backToActiveButton} 
                onPress={() => setShowAlternativePlans(false)}
              >
                <Ionicons name="arrow-back" size={16} color={colors.tabBarActive} />
                <Text style={{ color: colors.tabBarActive, fontWeight: '600', marginLeft: 4 }}>Back to active plan</Text>
              </TouchableOpacity>
            )}

            {/* Basic Plan Card (Only show if NO plan is currently active) */}
            {!activePlan && (
              <TouchableOpacity 
                style={[styles.subscriptionCard, { backgroundColor: colors.cardBackground, borderColor: colors.isDarkTheme ? colors.cardBorder : '#E2E8F0' }]}
                activeOpacity={0.5}
                onPress={() => handlePlanPress('Basic Plan')}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.titleBadgeContainer}>
                    <Ionicons name="sparkles-outline" size={18} color={colors.secondaryText} />
                    <Text style={[styles.planTitleText, { color: colors.primaryText }]}>Basic Plan</Text>
                  </View>
                  <Text style={[styles.planPriceText, { color: colors.primaryText }]}>₹399.99<Text style={[styles.priceDurationText, { color: colors.secondaryText }]}>/mo</Text></Text>
                </View>
                <Text style={[styles.planDescriptionText, { color: colors.secondaryText }]}>Access to standard custom filters & essential features.</Text>
              </TouchableOpacity>
            )}

            {/* Standard Plan Card (Show if NO plan is active OR if current active plan is Basic) */}
            {(!activePlan || activePlan === 'Basic Plan') && (
              <TouchableOpacity 
                style={[styles.subscriptionCard, { backgroundColor: colors.cardBackground, borderColor: colors.isDarkTheme ? colors.cardBorder : '#A5D8E2' }]}
                activeOpacity={0.5}
                onPress={() => handlePlanPress('Standard Plan')}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.titleBadgeContainer}>
                    <Ionicons name="star-outline" size={18} color="#2D9CDB" />
                    <Text style={[styles.planTitleText, { color: '#2D9CDB' }]}>Standard Plan</Text>
                  </View>
                  <Text style={[styles.planPriceText, { color: colors.primaryText }]}>₹999.99<Text style={[styles.priceDurationText, { color: colors.secondaryText }]}>/mo</Text></Text>
                </View>
                <Text style={[styles.planDescriptionText, { color: colors.secondaryText }]}>Unlocks HD generation profiles & high-priority asset processing.</Text>
              </TouchableOpacity>
            )}

            {/* Premium Plan Card (Show if current active plan is anything EXCEPT Premium) */}
            {(activePlan !== 'Premium Plan') && (
              <TouchableOpacity 
                style={[styles.subscriptionCard, { backgroundColor: colors.cardBackground, borderColor: colors.isDarkTheme ? colors.cardBorder : colors.tabBarActive }]}
                activeOpacity={0.5}
                onPress={() => handlePlanPress('Premium Plan')}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.titleBadgeContainer}>
                    <Ionicons name="diamond-outline" size={18} color={colors.tabBarActive} />
                    <Text style={[styles.planTitleText, { color: colors.tabBarActive, fontWeight: '700' }]}>Premium Plan</Text>
                  </View>
                  <Text style={[styles.planPriceText, { color: colors.primaryText }]}>₹1499.99<Text style={[styles.priceDurationText, { color: colors.secondaryText }]}>/mo</Text></Text>
                </View>
                <Text style={[styles.planDescriptionText, { color: colors.secondaryText }]}>Ultimate priority rendering speed, unlimited generation tools & dedicated support.</Text>
              </TouchableOpacity>
            )}

            {activePlan === 'Premium Plan' && showAlternativePlans && (
              <Text style={{ textAlign: 'center', color: colors.secondaryText, marginTop: 10, fontStyle: 'italic' }}>
                You are currently subscribed to our highest available tier!
              </Text>
            )}

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerContainer: {
    marginBottom: 28,
  },
  subGreeting: {
    fontSize: 16,
    fontWeight: '400',
  },
  mainGreeting: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
  },
  closeFriendsCard: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    padding: 16,
    marginBottom: 28,
  },
  cardTitleText: {
    fontSize: 14,
    fontWeight: '400',
  },
  friendsScrollContainer: {
    paddingTop: 16,
    paddingBottom: 20, 
    gap: 20, 
  },
  friendItem: {
    alignItems: 'center',
    width: 60,
  },
  friendPhoto: {
    width: 54, 
    height: 54,
    borderRadius: 27, 
    backgroundColor: '#E2E8F0',
  },
  friendNameText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40, 
    marginTop: 8,
    marginBottom: 10,
  },
  controlbutton: {
    alignItems: 'center',
    gap: 6, 
  },
  circleButton: {
    width: 46, 
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: '#00cd77b4', 
  },
  removeButton: {
    borderWidth: 1,
  },
  controlCaption: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1, 
  },
  sectionTitleText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },
  subscriptionListStack: {
    gap: 12, 
  },
  subscriptionCard: {
    width: '100%',
    height: 136, 
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planTitleText: {
    fontSize: 23,
    fontWeight: '600',
  },
  planPriceText: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceDurationText: {
    fontSize: 17,
    fontWeight: '400',
  },
  planDescriptionText: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: -4,
  },
  activePlanEditCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 20,
    gap: 16,
  },
  editCardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  changePlanButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePlanButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelPlanButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  backToActiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  }
});