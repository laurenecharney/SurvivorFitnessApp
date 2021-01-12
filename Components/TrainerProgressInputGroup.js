import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions,ScrollView ,TextInput} from 'react-native';
import Inputs from '../Components/Inputs.js';



const TrainerProgressInputGroup=()=> {
  return (
    <View 
    // style={{top: 50, left: 25, position: 'relative',flex: 2}}
    >
    <Inputs propertyName={"Date"}/>
    <Inputs propertyName={"Weight"}/>
    <Inputs propertyName={"Resting Motion"}/>
    <Inputs propertyName={"Abdominal"}/>
    <Inputs propertyName={"Thigh"}/>

   
  </View>

   
  );
}


const styles = StyleSheet.create({
  container: { //outer parent 
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
});
export default TrainerProgressInputGroup;