import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions,ScrollView ,TextInput} from 'react-native';
import Inputs from '../Components/Inputs.js';



const TrainerProgressPage=()=> {
  return (
    <ScrollView >
      <SafeAreaView style={{alignItems: 'center',top:50,flex: 1}}>
      <Text style={{fontSize: 25}}>Session 6</Text>
      </SafeAreaView>
      <View 
      style={{top: 50, left: 25, position: 'relative',flex: 2}}
      >
      <Inputs propertyName={"Date"}/>
     
      <Inputs propertyName={"Abdominal"}/>
      <Inputs propertyName={"Thigh"}/>
      <Inputs propertyName={"Tricep"}/>
      <Inputs propertyName={"Suprailac"}/>
      <Inputs propertyName={"Date"}/>
      <Inputs propertyName={"Weight (lbs)"}/>
      <Inputs propertyName={"Resting HR (bpm)"}/>
      <Inputs propertyName={"Range of Motion"}/>
      <Inputs propertyName={"Skin Fold"}/>
      <Inputs propertyName={"Chest"}/>
      <Inputs propertyName={"Abdominal"}/>
      <Inputs propertyName={"Thigh"}/>
      <Inputs propertyName={"Tricep"}/>
      <Inputs propertyName={"Suprailac"}/>
    </View>
    </ScrollView>

   
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
export default TrainerProgressPage;