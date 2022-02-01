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

export default class EditInformationRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={{paddingBottom: 20}}>
        <Text style={styles.participantInfo} >{this.props.title}</Text>
        <TextBoxSingleLine content = {this.props.value}/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    participantInfo:{
        fontSize: 15, 
        color: '#AED803', 
        paddingBottom: 10
    },
    child:{
        backgroundColor: 'white',
        padding:10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width:'100%',
        borderRadius: 5,
        alignSelf:"center"

    },
});