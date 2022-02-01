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

export default class AddInformationRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={styles.container}>
            <Text style={styles.childText}>{this.props.title}</Text>
            <TextBoxSingleLine content = ""/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      width: "85%",
      alignSelf: "center"
    },
    childText:{
        fontSize:13,
        color:"#B7DC21",
        padding: 12
    },
    childPt2: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width: "75%",
        borderRadius: 5,
        alignSelf: "center"
      },
});