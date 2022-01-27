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

export default class AddInformationRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View>
            <Text style={styles.childText}>{this.props.title}</Text>
                <View style={styles.childPt2}>
                <TextInput style = {styles.input}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    color="black"
                                    autoCapitalize = "sentences"/>
                </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    childText:{
        fontSize:13,
        color:"#B7DC21",
        marginLeft: 30,
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