import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import { Image } from 'react-native'
import barGraph from "../assets/sessionLogo.png";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
class TrainerDieticianNavBar extends Component {
  constructor(props) {
    super(props);
  }
  pressTrainer = () => {
    this.props.pressTrainer();
  };
  pressDietician = () => {
    Alert.alert('Not a dietician!', 'This page is still in progress.\nNormally, you could click here to view information logged by this participant\'s dietician. ',
        [
            {
                text: 'Got it',
                onPress: () => console.log('No Pressed')
            }
        ]
        )
    // this.props.pressDietician();
  };

  render() {
    return (
      <View style={{ flexDirection: "row",paddingTop:40 }}>
      <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 0.5,
            borderBottomWidth: .5,
            borderRightWidth: .5,
            alignItems: "center",
            borderColor: "#D5D5D5",
            padding:0,
            width:'15%'
          }}
        >
         <Image source={require('../assets/sessionLogo.png')} style={styles.logo}/>
        </View>
        <TouchableOpacity
          onPress={() => this.pressTrainer()}
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 1,
            borderLeftWidth: 0,
            paddingVertical: 10,
            alignItems: "center",
            borderColor: "#E6E6E6",
            borderTopColor: this.props.dietician ? "#e6e6e6" : "#AED804",
            borderTopWidth: this.props.dietician ? 1 : 3
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              color: this.props.dietician ? "#E6E6E6" : "#AED804"
            }}
          >
            Trainer
          </Text>
          <MaterialCommunityIcons
            name={"dumbbell"}
            size={20}
            color={!this.props.dietician ? "#AED804" : "#E6E6E6"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.pressDietician()}
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 1,
            padding:0,
            alignItems: "center",
            borderColor: "#E6E6E6",
            borderTopColor: !this.props.dietician ? "#e6e6e6" : "#AED804",
            borderTopWidth: !this.props.dietician ? 1 : 3
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              color: !this.props.dietician ? "#E6E6E6" : "#AED804"
            }}
          >
            Dietitian
          </Text>
          <MaterialCommunityIcons
            name={"food-apple"}
            size={20}
            color={this.props.dietician ? "#AED804" : "#E6E6E6"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TrainerDieticianNavBar;

const styles = StyleSheet.create({
  logo: {
    height: '40%',
    width: '50%',
    alignSelf: "center",
}
});
