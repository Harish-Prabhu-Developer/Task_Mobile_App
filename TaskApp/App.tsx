import {StyleSheet} from 'react-native';
import React from 'react';
import "./global.css";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import ForgetScreen from './src/Screens/ForgetScreen';
import TaskDetails from './src/Screens/TaskDetails';
import BottomTab from './src/Components/Navigation/Navigation/BottomTab';
import { Task } from './src/Utils/OurInterFace';
type RootStackParamList = {
  DashboardScreen:undefined;
  LoginScreen:undefined;
  ForgetScreen:undefined;
  TaskScreen:undefined;
  TaskDetails:{task:Task};
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
