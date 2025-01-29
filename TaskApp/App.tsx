import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const App = () => {
  return (
    <View>
      <Text>App</Text>
      <FontAwesome5 name="home" size={30} color="black" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
