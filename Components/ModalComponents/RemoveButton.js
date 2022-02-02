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

export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View>
            <TouchableOpacity>  
                <Text style = {styles.text}>remove</Text>
            </TouchableOpacity>
        </View> 
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 19, 
    color: '#AED803', 
    fontWeight: "500"
  },
  text:{
    fontSize: 14, 
    color: "#AED803", 
    alignSelf: "center"
  }
});