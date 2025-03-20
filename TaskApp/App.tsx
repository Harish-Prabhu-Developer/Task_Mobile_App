import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import DashboardScreen from './src/Screens/DashboardScreen';
import ForgetScreen from './src/Screens/ForgetScreen';
import TaskScreen from './src/Screens/TaskScreen';
import TaskDetails from './src/Screens/TaskDetails';
import ProfileScreen from './src/Screens/ProfileScreen';
import BottomTab from './src/Components/Navigation/Navigation/BottomTab';
type RootStackParamList = {
  DashboardScreen:undefined;
  LoginScreen:undefined;
  ForgetScreen:undefined;
  TaskScreen:undefined;
  TaskDetails:undefined;
  ProfileScreen:undefined;
  Home:undefined;

};
const Stack = createStackNavigator<RootStackParamList>();

const App:React.FC= () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name='ForgetScreen' component={ForgetScreen} />
            <Stack.Screen name='TaskDetails' component={TaskDetails} />
            <Stack.Screen name="Home" component={BottomTab} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
