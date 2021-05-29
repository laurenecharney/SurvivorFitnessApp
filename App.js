
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions,ScrollView ,TextInput} from 'react-native';

import MainStackNavigator from './Navigation/MainStackNavigation.js';




export default function App() {
  console.disableYellowBox = true;  //hide warnings
  return <MainStackNavigator />
}



const styles = StyleSheet.create({
  container: { //outer parent 
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

