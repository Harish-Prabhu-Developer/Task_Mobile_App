import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputBox from '../Components/Input/CustomInputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constants/Theme';

const LoginScreen = () => {

  const SECRET_KEY='remembermeSECRETKEYSWOMBTECHNOLOGIES';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  // Load saved credentials on component mount
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');

        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Error loading saved credentials", error);
      }
    };

    loadSavedCredentials();
  }, []);

  // Validate Email
  const validateEmail = (email: string) => {
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
  };

  // Validate Password
  const validatePass = (password: string) => password.length >= 8;

  // Check Login
  const CheckLogin = async () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPassError('Password is required.');
      valid = false;
    } else if (!validatePass(password)) {
      setPassError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPassError('');
    }

    if (valid) {
      console.log("Login Data:", { email, password, rememberMe });
      navigation.navigate('Home');

      try {
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', email);
          await AsyncStorage.setItem('rememberedPassword', password);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
          await AsyncStorage.removeItem('rememberedPassword');
        }
      } catch (error) {
        console.error("Error saving credentials", error);
      }
    }
  };


  return (
    <LinearGradient colors={COLORS.ourYellow} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/companylogo.png')} style={styles.logo} />
        <Text style={styles.logoText}>SWOMB Technologies</Text>
      </View>
      
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account and take the next step in your journey</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomInputBox 
            value={email}
            onChangeText={setEmail}
            iconName="envelope"
            placeholder="you@swomb.app"
            placeholderTextColor='black'
            iconSize={14} 
            iconColor='#FFB000' 
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomInputBox 
            iconName="lock"
            placeholder="Password"
            placeholderTextColor='black'
            value={password}
            iconSize={18}
            iconColor='#FFB000'
            eyeiconSize={16}
            onChangeText={setPassword}
            isPassword={true}  
          />
          {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.rememberMeContainer} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <FontAwesome 
              name={rememberMe ? "check-square" : "square-o"} 
              size={20} 
              color="#FFB000" 
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={CheckLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',


  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: '5%',
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  loginContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    elevation: 5,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    color: '#333',
  },
  forgotPassword: {
    color: '#FFB000',
  },
  loginButton: {
    backgroundColor: '#FFB000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff0000',
    marginTop:4,
    marginBottom: 5,
  },
});

export default LoginScreen;
