// =====================================================================
// FILE PATH: app/(auth)/Login.jsx
// =====================================================================

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Banner from '../../src/assets/svg/Banner'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('demo'); // Default 'demo', 'security', or 'resident'

  const handleLoginProceed = () => {
    if (selectedRole === 'demo') {
      router.replace('/(tabs)');
    } else if (selectedRole === 'security') {
      router.replace('/(securityTabs)');
    } else {
      router.replace({
        pathname: '/(screens)/RoleDashboard',
        params: { role: selectedRole }
      });
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.bannerContainer}>
        <Banner width={328} height={308} />
      </View>

      <View style={styles.sheetContainer}>
        <Text style={styles.titleText}>Log in</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor='#A29EB2'
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor='#A29EB2'
            secureTextEntry={true} 
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Role Selection Tabs */}
        <View style={styles.roleSelectorContainer}>
          {['demo', 'security', 'resident'].map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleChip,
                selectedRole === role && styles.roleChipActive,
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <Text style={[
                styles.roleChipText,
                selectedRole === role && styles.roleChipTextActive
              ]}>
                {role.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={handleLoginProceed}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FE',
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetContainer: {
    width: 360,                  
    backgroundColor: '#FFFFFF',      
    borderTopLeftRadius: 32,         
    borderTopRightRadius: 32,        
    paddingHorizontal: 16,           
    paddingTop: 24,                  
    paddingBottom: 24,
    shadowColor: '#636363',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 8,
    elevation: 5, 
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,                    
    fontWeight: '600',               
    color: '#000000',
    textAlign: 'center',             
    marginBottom: 16,                
  },
  inputContainer: {
    gap: 12,                         
    marginBottom: 16,                
  },
  input: {
    width: 328,
    height: 48,                      
    backgroundColor: '#F8F6FE', 
    borderRadius: 16,                
    paddingHorizontal: 16,           
    fontSize: 15,
    color: '#000000',
  },
  roleSelectorContainer: {
    flexDirection: 'row',
    width: 328,
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  roleChip: {
    flex: 1,
    height: 40,
    backgroundColor: '#F1EEFA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  roleChipActive: {
    backgroundColor: '#3B2A60',
    borderColor: '#3B2A60',
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A6B9B',
  },
  roleChipTextActive: {
    color: '#FFFFFF',
  },
  button: {
    width: 328,
    backgroundColor: '#3B2A60', 
    height: 54,                      
    borderRadius: 16,                
    justifyContent: 'center',        
    alignItems: 'center',            
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});