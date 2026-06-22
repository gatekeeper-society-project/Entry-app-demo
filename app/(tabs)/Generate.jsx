import { router } from 'expo-router'; // Imported Expo Router for screen transitions
import { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../(context)/Theme';


export default function Generate() {
  // Pull centralized variables from global state context
  const { colors, activePlan, qrCount, setQrCount } = useTheme();

  // Input tracking states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [admits, setAdmits] = useState('');
  const [days, setDays] = useState('');

  const handleGenerateAction = () => {
    if (!name.trim() || !phone.trim() || !admits.trim() || !days.trim()) {
      if (Platform.OS === 'web') {
        alert('Please fill in all required fields to proceed.');
      } else {
        Alert.alert('Missing Details', 'Please fill in all required fields to proceed.');
      }
      return;
    }

    // --- SUBSCRIPTION & FREE GENERATION LIMIT LOGIC ---
    // Rule 1: If any subscription plan is active, completely bypass bounds checking
    if (activePlan) {
      proceedToQrScreen();
      return;
    }

    // Rule 2: If no subscription is on and user reached 3 codes limit, block & redirect
    if (qrCount >= 3) {
      const alertMsg = "3 free generations over. Please subscribe to standard or premium options to continue unlimited generations.";
      
      if (Platform.OS === 'web') {
        alert(alertMsg);
        router.replace('/(tabs)'); // Redirect back to home layout segment index root
      } else {
        Alert.alert(
          "Limit Reached",
          alertMsg,
          [
            { 
              text: "View Subscriptions", 
              onPress: () => router.replace('/(tabs)') 
            }
          ]
        );
      }
      return;
    }

    // Rule 3: Otherwise increment current local value instance tracking and pass forward
    setQrCount(prev => prev + 1);
    proceedToQrScreen();
  };

  const proceedToQrScreen = () => {
    // Transitions from the (tabs) context into your custom (screens)/Qr folder path
    router.push({
      pathname: '/(screens)/Qr',
      params: { 
        name: name,
        phone: phone,
        admits: admits,
        days: days,
        email: email 
      }
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Form Fields Stack */}
        <View style={styles.formContainer}>
          
          {/* Name Input Block */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabelText, { color: colors.primaryText }]}>Name</Text>
            <TextInput 
              style={[
                styles.textInputField, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.isDarkTheme ? colors.cardBorder : '#4A6B82',
                  color: colors.primaryText 
                }
              ]}
              placeholder="Enter full name"
              placeholderTextColor={colors.isDarkTheme ? colors.subtext : '#A0AEC0'}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
          </View>

          {/* Email Input Block */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabelText, { color: colors.primaryText }]}>
              Email<Text style={[styles.optionalLabelText, { color: colors.secondaryText }]}>(optional)</Text>
            </Text>
            <TextInput 
              style={[
                styles.textInputField, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.isDarkTheme ? colors.cardBorder : '#4A6B82',
                  color: colors.primaryText 
                }
              ]}
              placeholder="Enter email address"
              placeholderTextColor={colors.isDarkTheme ? colors.subtext : '#A0AEC0'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Phone Number Input Block */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabelText, { color: colors.primaryText }]}>Ph.no</Text>
            <TextInput 
              style={[
                styles.textInputField, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.isDarkTheme ? colors.cardBorder : '#4A6B82',
                  color: colors.primaryText 
                }
              ]}
              placeholder="Enter phone number"
              placeholderTextColor={colors.isDarkTheme ? colors.subtext : '#A0AEC0'}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Admits Input Block */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabelText, { color: colors.primaryText }]}>No. of Admits</Text>
            <TextInput 
              style={[
                styles.textInputField, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.isDarkTheme ? colors.cardBorder : '#4A6B82',
                  color: colors.primaryText 
                }
              ]}
              placeholder="e.g. 2"
              placeholderTextColor={colors.isDarkTheme ? colors.subtext : '#A0AEC0'}
              value={admits}
              onChangeText={setAdmits}
              keyboardType="number-pad"
            />
          </View>

          {/* Validity Days Block */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabelText, { color: colors.primaryText }]}>Validity Days</Text>
            <TextInput 
              style={[
                styles.textInputField, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.isDarkTheme ? colors.cardBorder : '#4A6B82',
                  color: colors.primaryText 
                }
              ]}
              placeholder="e.g. 5"
              placeholderTextColor={colors.isDarkTheme ? colors.subtext : '#A0AEC0'}
              value={days}
              onChangeText={setDays}
              keyboardType="number-pad"
            />
          </View>

          {/* Generate Button Wrapper */}
          <TouchableOpacity 
            style={[styles.generateButton, { backgroundColor: colors.tabBarActive }]}
            activeOpacity={0.8}
            onPress={handleGenerateAction}
          >
            <Text style={styles.generateButtonText}>Generate QR</Text>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  inputWrapper: {
    width: '100%',
    gap: 6,
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionalLabelText: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 4,
  },
  textInputField: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  generateButton: {
    width: '100%',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});