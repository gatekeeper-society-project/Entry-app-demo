import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../(context)/Theme'; // Adjust path depending on project layout

export default function Qr() {
  // Pull centralized colors from global state context
  const { colors } = useTheme();

  // Catch incoming dynamic data string variables passed forward from form submission
  // Added "days" param fallback parameter (e.g. defaults to 5 days if nothing is provided from prior screen layout form)
  const { name, phone, admits, days = '5' } = useLocalSearchParams();

  // State to hold the live created time string
  const [liveCreatedTime, setLiveCreatedTime] = useState('');
  
  // State to hold the formatted text expiration date string
  const [expiryDateString, setExpiryDateString] = useState('');

  // State to handle switching between QR matrix and Alphanumeric Text Code
  const [codeType, setCodeType] = useState('qr'); 

  // State to hold a persistent generated unique alphanumeric text code
  const [textCode, setTextCode] = useState('');

  // Local state to keep track of increments without overriding page layouts
  const [currentAdmits, setCurrentAdmits] = useState(parseInt(admits, 10) || 0);

  // Generate a random uppercase alphanumeric string matching your layout style
  const generateTextCode = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Clean set omitting ambiguous 0/O/1/I
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Lock in timestamp, expiration bounds, and generated text code upon initial mount
  useEffect(() => {
    const now = new Date();
    setLiveCreatedTime(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    );
    
    // Dynamic Expiration Boundary Calculation:
    const validityDays = parseInt(days, 10) || 5; 
    const expiryDate = new Date();
    expiryDate.setDate(now.getDate() + validityDays);
    
    // Format the date target nicely without clock time details (e.g., "Oct 24, 2024")
    setExpiryDateString(
      expiryDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    );

    setTextCode(generateTextCode());
  }, [days]);

  // Handler to add admit count numbers manually on live screen
  const handleAddAdmitNumber = () => {
    setCurrentAdmits(prev => prev + 1);
  };

  // Format a payload text string for the scanner to interpret including the expiration context
  const qrValueString = JSON.stringify({
    name: name,
    phone: phone,
    admits: currentAdmits,
    code: textCode,
    expiresOn: expiryDateString
  });

  // Formats text string from "2D4TE6" to "2 D 4 T E 6" for clean user readability
  const formattedTextCode = textCode.split('').join(' ');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Absolute Header Navigation Segment */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButtonCircle, { backgroundColor: colors.cardBackground }]} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.isDarkTheme ? '#E2E8F0' : '#4A5568'} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Central Card Panel */}
        <View style={[styles.qrMainCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder, borderWidth: colors.isDarkTheme ? 1 : 0 }]}>
          
          {/* Action Row Management Column */}
          <View style={styles.utilityActionColumnStack}>
            
            {/* Added Button to Add Admit Number placement above the convert button */}
            <TouchableOpacity 
              style={[styles.addAdmitButton, { borderColor: colors.tabBarActive }]}
              activeOpacity={0.7}
              onPress={handleAddAdmitNumber}
            >
              <Ionicons name="person-add-outline" size={14} color={colors.tabBarActive} />
              <Text style={[styles.addAdmitButtonText, { color: colors.tabBarActive }]}>Add Admit No</Text>
            </TouchableOpacity>

            {/* Top Subtle Utility Outline Button Row */}
            <View style={styles.utilityActionRow}>
              <TouchableOpacity 
                style={[styles.outlineConvertBtn, { borderColor: colors.isDarkTheme ? colors.tabBarActive : '#4A6B82' }]} 
                activeOpacity={0.7}
                onPress={() => setCodeType(codeType === 'qr' ? 'textCode' : 'qr')}
              >
                <Text style={[styles.outlineConvertText, { color: colors.isDarkTheme ? colors.tabBarActive : '#4A6B82' }]}>
                  {codeType === 'qr' ? 'Convert to Code' : 'Convert to QR'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Core Graphical/Display Container Area */}
          <View style={styles.qrGraphicContainer}>
            {codeType === 'qr' ? (
              <View style={[styles.mockQrSquare, { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 12 }]}>
                <QRCode
                  value={qrValueString}
                  size={180}
                  backgroundColor="#FFFFFF"
                  color="#000000"
                />
              </View>
            ) : (
              /* Text Code View Layout matching your reference mockup */
              <View style={[styles.textCodeDisplayWrapper, { backgroundColor: colors.cardBackground }]}>
                <Text style={[styles.textCodeSubheading, { color: colors.primaryText }]}>Code</Text>
                <Text style={[styles.textCodeValuePrimary, { color: colors.tabBarActive }]}>
                  {formattedTextCode}
                </Text>
              </View>
            )}
          </View>

          {/* Grid Metadata Grid Layout Details Layer */}
          <View style={styles.gridMetadataContainer}>
            
            {/* Top Row Grid Layer */}
            <View style={styles.metaGridRow}>
              <View style={styles.metaGridColumnLeft}>
                <Text style={[styles.metaLabelText, { color: colors.subtext }]}>Name</Text>
                <Text style={[styles.metaValueText, { color: colors.primaryText }]} numberOfLines={1}>
                  {name || 'N/A'}
                </Text>
              </View>
              <View style={styles.metaGridColumnRight}>
                <Text style={[styles.metaLabelText, { color: colors.subtext }]}>no. Admits</Text>
                <Text style={[styles.metaValueTextRight, { color: colors.primaryText }]}>
                  {currentAdmits}
                </Text>
              </View>
            </View>

            {/* Middle Row Grid Layer */}
            <View style={styles.metaGridRow}>
              <View style={styles.metaGridColumnLeft}>
                <Text style={[styles.metaLabelText, { color: colors.subtext }]}>Ph. no.</Text>
                <Text style={[styles.metaValueText, { color: colors.primaryText }]} numberOfLines={1}>
                  {phone ? `+91-${phone}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.metaGridColumnRight}>
                <Text style={[styles.metaLabelText, { color: colors.subtext }]}>Created Time</Text>
                <Text style={[styles.metaValueTextRight, { color: colors.primaryText }]}>{liveCreatedTime}</Text>
              </View>
            </View>

            {/* Added Bottom Expiration Row Layer */}
            <View style={[styles.expiryMetaRow, { borderColor: colors.cardBorder }]}>
              <View style={styles.expiryLeftContainer}>
                <Ionicons name="time-outline" size={16} color="#FF6B6B" />
                <Text style={[styles.metaLabelText, { color: colors.subtext, marginLeft: 4 }]}>Expires On</Text>
              </View>
              <Text style={[styles.expiryValueText, { color: colors.primaryText }]}>{expiryDateString}</Text>
            </View>

          </View>

        </View>

        {/* Global Bottom Sticky Style Interaction Button Dual Row */}
        <View style={styles.bottomActionsRow}>
          
          <TouchableOpacity style={[styles.secondaryOutlineButton, { borderColor: colors.tabBarActive }]} activeOpacity={0.7}>
            <Text style={[styles.secondaryButtonText, { color: colors.tabBarActive }]}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.primarySolidButton, { backgroundColor: colors.tabBarActive }]} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Share</Text>
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
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: 'center',
  },
  qrMainCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04, shadowRadius: 12, elevation: 3,
    marginBottom: 28,
  },
  utilityActionColumnStack: {
    width: '100%',
    alignItems: 'flex-end',
    gap: 8,
  },
  utilityActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  addAdmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  addAdmitButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  outlineConvertBtn: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  outlineConvertText: {
    fontSize: 11,
    fontWeight: '600',
  },
  qrGraphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    width: '100%',
    minHeight: 220,
  },
  mockQrSquare: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCodeDisplayWrapper: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  textCodeSubheading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textCodeValuePrimary: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
    marginVertical: 10,
  },
  gridMetadataContainer: {
    width: '100%',
    gap: 20,
    marginTop: 8,
  },
  metaGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  metaGridColumnLeft: {
    flex: 1.5,
    gap: 4,
  },
  metaGridColumnRight: {
    flex: 1,
    gap: 4,
  },
  metaLabelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metaValueText: {
    fontSize: 15,
    fontWeight: '600',
  },
  metaValueTextRight: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  expiryMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 16,
    marginTop: 4,
  },
  expiryLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryValueText: {
    fontSize: 15,
    fontWeight: '700',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginTop: 'auto',
  },
  secondaryOutlineButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primarySolidButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 