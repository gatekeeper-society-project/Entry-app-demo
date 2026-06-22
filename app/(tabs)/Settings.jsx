import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Custom layout path transition router handler
import { Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../(context)/Theme'; // Centralized global context hook location

export default function Settings() {
  // Grab live design token payload variables directly out of shared context state
  const { colors, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Upper Static Section Title Header Bar */}
      <View style={[styles.screenHeaderContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.screenHeaderTitle, { color: colors.headerTitle }]}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Profile Metadata Display Identity Card */}
        <View style={[styles.profileMasterCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
          <View style={styles.profileInnerRow}>
            
            {/* Left Hand Profile Image */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1740644545217-892da8cce224?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              style={styles.avatarCirclePlaceholder}
            />
            
            {/* Central Vertical Stack Text Identifier Elements Block */}
            <View style={styles.profileTextIdentityBlock}>
              <Text style={[styles.profilePrimaryNameText, { color: colors.primaryText }]}>Joel Heinz</Text>
              <Text style={[styles.profileRoomNumberText, { color: colors.secondaryText }]}>Room no:007</Text>
              <Text style={[styles.profileEmailSubtext, { color: colors.subtext }]}>joelheinz.2005@gmail.com</Text>
            </View>

            {/* Right Hand Context Edit Inline Action Button */}
            <TouchableOpacity 
              style={styles.profileEditIconButton}
              activeOpacity={0.6}
              onPress={() => { /* Pathway routing unassigned */ }}
            >
              <Feather name="edit-3" size={20} color={colors.isDarkTheme ? '#718096' : '#B2A9C9'} />
            </TouchableOpacity>

          </View>
        </View>

        {/* Lower Main Block Option Title Label Component */}
        <View style={styles.sectionLabelWrapper}>
          <Text style={[styles.sectionLabelHeading, { color: colors.sectionHeading }]}>Settings</Text>
        </View>

        {/* Global Interactive Navigation Option Button Rows List */}
        <View style={styles.optionsListVerticalStack}>
          
          {/* Button Link Item #1: Theme Option Block A */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => { /* Pathway routing unassigned */ }}
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#7B61FF' }]}>
                <MaterialCommunityIcons name="sine-wave" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Theme</Text>
            </View>
          </TouchableOpacity>

          {/* Button Link Item #2: Theme Option Block B (With Fixed Spacing For Toggle Switch Widget) */}
          <View style={[styles.optionItemRowLink, { justifyContent: 'space-between' }]} >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#00D6C4' }]}>
                <Ionicons name="image-outline" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: '#E2E8F0', true: '#7B61FF' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E2E8F0"
              onValueChange={toggleTheme} // Safely mutates layout configuration parameters globally
              value={colors.isDarkTheme} // Evaluates configuration state parameters natively
            />
          </View>

          {/* Button Link Item #3: Wallpaper Option Block */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => { /* Pathway routing unassigned */ }}
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#4299E1' }]}>
                <Ionicons name="phone-portrait-outline" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Wallpaper</Text>
            </View>
          </TouchableOpacity>

          {/* Button Link Item #4: Language Option Block */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => { /* Pathway routing unassigned */ }}
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#667EEA' }]}>
                <MaterialIcons name="translate" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Language</Text>
            </View>
          </TouchableOpacity>

          {/* Button Link Item #5: Help Center Option Block */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => router.push('/(screens)/help')} // Seamless cross-directory structural routing navigation target
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#38A169' }]}>
                <Ionicons name="people-outline" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Help Center</Text>
            </View>
          </TouchableOpacity>

          {/* Button Link Item #6: Terms & Privacy Policy Option Block */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => router.push('/(screens)/terms')} // Now fully assigned to go to terms.jsx
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#4299E1' }]}>
                <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>Terms & Privacy Policy</Text>
            </View>
          </TouchableOpacity>

          {/* Button Link Item #7: App Version Option Block */}
          <TouchableOpacity 
            style={styles.optionItemRowLink} 
            activeOpacity={0.7}
            onPress={() => { /* Pathway routing unassigned */ }}
          >
            <View style={styles.optionItemRowInnerLeft}>
              <View style={[styles.iconCircleWrapper, { backgroundColor: '#00D6C4' }]}>
                <MaterialIcons name="phone-android" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.optionItemLabelText, { color: colors.itemLabel }]}>App Version</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenHeaderContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  screenHeaderTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  profileMasterCard: {
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 28,
  },
  profileInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarCirclePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B2A60', 
  },
  profileTextIdentityBlock: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    gap: 2,
  },
  profilePrimaryNameText: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileRoomNumberText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  profileEmailSubtext: {
    fontSize: 13,
  },
  profileEditIconButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabelWrapper: {
    width: '100%',
    marginBottom: 16,
    paddingLeft: 4,
  },
  sectionLabelHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionsListVerticalStack: {
    width: '100%',
    gap: 18,
  },
  optionItemRowLink: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 1,
  },
  optionItemRowInnerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircleWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionItemLabelText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
});