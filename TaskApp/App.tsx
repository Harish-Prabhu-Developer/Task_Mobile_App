import {StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import "./global.css";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import ForgetScreen from './src/Screens/ForgetScreen';
import TaskDetails from './src/Screens/TaskDetails';
import BottomTab from './src/Components/Navigation/Navigation/BottomTab';
import { Task } from './src/Utils/OurInterFace';
import OTPScreen from './src/Screens/OTPScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';
type RootStackParamList = {
  DashboardScreen:undefined;
  LoginScreen:undefined;
  OTPScreen:{email:string};
  ForgetScreen:undefined;
  TaskScreen:undefined;
  TaskDetails:{task:Task};
  ProfileScreen:undefined;
  Home:undefined;

};
const Stack = createStackNavigator<RootStackParamList>();

const App:React.FC= () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        console.log("isLoggedIn from AsyncStorage:", loggedIn);
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // You can return a loading spinner here
    return null;
  }
  console.log("isLoggedIn",AsyncStorage.getItem("isLoggedIn"));

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "LoginScreen"} screenOptions={{headerShown:false}}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="OTPScreen" component={OTPScreen} />
              <Stack.Screen name='ForgetScreen' component={ForgetScreen} />
              <Stack.Screen name='TaskDetails' component={TaskDetails} />
              <Stack.Screen name="Home" component={BottomTab} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
