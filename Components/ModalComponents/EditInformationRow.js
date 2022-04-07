import React, { Component } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput
} from "react-native";
import TextBoxSingleLine from "../TextBoxSingleLine";

export default  EditInformationRow = ({title, defaultVal, callback}) => {
  return (
      <View style={{paddingBottom: 20}}>
        <Text style={styles.participantInfo} >{title}</Text>
        <TextBoxSingleLine 
          initValue = {defaultVal}
          callback = {value => callback(value)}/>
      </View>
  );
}

const styles = StyleSheet.create({
    participantInfo:{
        fontSize: 15, 
        color: '#AED803', 
        paddingBottom: 10,
        fontWeight: "bold",
    },
    child:{
        backgroundColor: 'white',
        padding:10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width:'100%',
        borderRadius: 5,
    },
});