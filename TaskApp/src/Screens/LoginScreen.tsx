import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomInputBox from "../Components/Input/CustomInputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Constants/Theme";
import { AppDispatch } from "../Redux/Store";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/Auth/authSlice";
import { API_URL } from "@env";
import { LoginCredentials } from "../Utils/OurInterFace";
const LoginScreen = () => {
  const SECRET_KEY = "remembermeSECRETKEYSWOMBTECHNOLOGIES";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("rememberedEmail");
        const savedPassword = await AsyncStorage.getItem("rememberedPassword");

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

  const validateEmail = (email: string) => {
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
  };

  const validatePass = (password: string) => password.length >= 8;

  const CheckLogin = async () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPassError("Password is required.");
      valid = false;
    } else if (!validatePass(password)) {
      setPassError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPassError("");
    }

    if (valid) {
      console.log("API_URL", API_URL);
      console.log("Login Data:", { email, password, rememberMe });
      const credentials:any = {email:email,password:password};
      const res= await dispatch(loginUser(credentials)).unwrap();
      console.log("Login Response:", res);
      //navigation.navigate("Home");
      if (res.status==="success" &&res.msg==="OTP sent to the email") {
        navigation.navigate("OTPScreen",{email:email});        
      }else if(res.status==="success" &&res.msg==="Login success"){
        navigation.navigate("Home");
      }


      try {
        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedPassword", password);
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedPassword");
        }
      } catch (error) {
        console.error("Error saving credentials", error);
      }
    }
  };

  return (
    <LinearGradient colors={COLORS.ourYellow} className="flex-1 items-center justify-center">
      <View className="items-center mb-4">
        <Image
          source={require("../assets/images/companylogo.png")}
          className="w-20 h-20 rounded-xl border border-gray-200 shadow-lg"
        />
        <Text className="text-white font-bold text-2xl mt-2">
          SWOMB Technologies
        </Text>
      </View>

      <View className="bg-white rounded-2xl p-5 w-[90%] shadow-lg items-center">
        <Text className="text-2xl font-extrabold text-gray-800 text-center">
          Welcome Back!
        </Text>
        <Text className="text-sm text-gray-600 text-center my-2">
          Login to your account and take the next step in your journey
        </Text>

        <View className="w-full mb-2">
          <Text className="text-base font-semibold mb-2">Email</Text>
          <CustomInputBox
            value={email}
            onChangeText={setEmail}
            iconName="envelope"
            placeholder="you@swomb.app"
            placeholderTextColor="black"
            iconSize={14}
            iconColor="#FFB000"
          />
          {emailError ? (
            <Text className="text-red-600 text-xs font-semibold mt-1">
              {emailError}
            </Text>
          ) : null}
        </View>

        <View className="w-full mb-2">
          <Text className="text-base font-semibold mb-2">Password</Text>
          <CustomInputBox
            iconName="lock"
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            iconSize={18}
            iconColor="#FFB000"
            eyeiconSize={20}
            onChangeText={setPassword}
            isPassword={true}
          />
          {passError ? (
            <Text className="text-red-600 text-xs font-semibold mt-1">
              {passError}
            </Text>
          ) : null}
        </View>

        <View className="flex-row justify-between items-center w-full my-2">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <FontAwesome
              name={rememberMe ? "check-square" : "square-o"}
              size={20}
              color="#FFB000"
            />
            <Text className="ml-2 text-gray-700">Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-yellow-500 font-semibold">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-yellow-500 p-4 rounded-lg w-full mt-4"
          onPress={CheckLogin}
        >
          <Text className="text-white text-center text-lg font-bold">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
