import Icon from "react-native-vector-icons/MaterialIcons";
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
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StackNavigator } from "react-navigation";

export default class NameNavBarComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.headline]}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={()=>this.props.goBack()}
        >
          <View 
            style={styles.iconContainer}
            onPress={()=>this.props.goBack()}
          >
            <Icon name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"} 
            />
          </View>
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headline: {
    fontWeight: "400",
    fontSize: 25,
    marginTop: 45,
    marginLeft: 0,
    color: "#3E3E3E",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    opacity: 1,
    zIndex: 15,
    paddingTop: 25,
    paddingBottom:25,
  },
  iconContainer: {
    width: 75, 
    height: 50, 
  },
  nameContainer: {
    // backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    paddingRight: 25,
    flex: 1
  },
  title: {
    fontSize: 25,
    color: "#3E3E3E"
  }
});
