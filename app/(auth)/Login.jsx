import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Banner from '../../src/assets/svg/Banner'; 
import { colored } from '../../src/assets/styles/color'; 

export default function Login() {
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
            placeholderTextColor={colored.textPlaceholder || '#A29EB2'}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor={colored.textPlaceholder || '#A29EB2'}
            secureTextEntry={true} 
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
    height: 320,                     
    backgroundColor: '#FFFFFF',      
    borderTopLeftRadius: 32,         
    borderTopRightRadius: 32,        
    paddingHorizontal: 16,           
    paddingTop: 28,                  
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
    marginBottom: 20,                
  },
  inputContainer: {
    gap: 20,                         
    marginBottom: 15,                
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