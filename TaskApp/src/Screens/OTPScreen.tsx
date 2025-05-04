import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../Constants/Theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import OTPInput from '../Components/CoreComponents/OTPInput'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppDispatch } from '../Redux/Store'
import { useDispatch } from 'react-redux'
import { OTPVerify } from '../Redux/Slice/Auth/authSlice'

const OTPScreen:React.FC = () => {
    const route = useRoute();
    const [otp, setOTP] = useState('');
    const [OTPError, setOTPError] = useState('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();    
    const { email } = route.params as { email: string }; // Extract email from route params
    const handleSubmit = (otp:string) => {
        if (otp.length !== 6) {
            setOTPError('Please enter a 6-digit OTP.'); // Fixed here
            return;
        }
    
        setOTPError(''); // Fixed here
        console.log(`OTP entered: ${otp}`);
        handleVerify(email, otp);
    };

    const handleVerify = async (email:string,otp:string) => {

        const res =await dispatch(OTPVerify({email, otp})).unwrap();
        console.log("OTP Verification Response:", res);
        
        navigation.navigate("Home");
        console.log(`Verifying OTP for ${email} with OTP: ${otp}`);
        
    }
    const handleOTPChange = (otp:string) => {
        setOTP(otp);
    };
  return (
    <LinearGradient colors={COLORS.ourYellow} className="flex-1 items-center justify-center">
        <View className="items-center mb-4 bg-white p-4 rounded-lg shadow-md">
            <Text className="text-2xl text-center font-extrabold text-gray-800">Hi there!👋</Text>
            <Text className="text-md my-2 text-gray-600 inline-block">
                Your code was sent to <Text className="font-black text-gray-800">{email}</Text>
              </Text>
            <View>
                <OTPInput
                    length={6} 
                    onOTPChange={handleOTPChange} 
                    onSubmit={handleSubmit}
                />
                {OTPError && <Text className="text-red-600 font-bold text-center mb-2">{OTPError}</Text>}
            </View>
            <TouchableOpacity
                disabled={otp.length !== 6}
                className="bg-yellow-500 disabled:opacity-50 py-3 px-20 w-full rounded-xl"
                style={[styles.shadow]}
                onPress={handleSubmit.bind(null, otp)}
                >
                <Text className="text-white font-bold">Verify</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Android only
      },
})