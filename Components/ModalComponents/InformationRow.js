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

export default class InformationRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={styles.row}>
            <Text style={styles.participantInfoTitle} >{this.props.title}</Text>
            <Text style={styles.text}>{this.props.value}</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection:"row", 
    paddingBottom:25, 
    flexWrap: 'wrap',
  },
  participantInfoTitle:{
    fontSize: 15, 
    color: '#AED803', 
  },
  text:{
    alignItems: 'flex-start',
    color: '#797979',
    flexWrap: 'wrap',
  }
});