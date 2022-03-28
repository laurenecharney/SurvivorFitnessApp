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
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default class ModalHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <View>
        <View>
            <Text style={{fontSize: 19, color: '#AED803', fontWeight: "500"}} >{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 25, 
    color: '#AED803', 
    fontWeight: "500",
    textAlign:"center"
  }
});