import React, { Component, useState, useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";


export const Logout = ({callback}) => {
    return(
        <View style={{ alignItems: "center", paddingTop:100,paddingBottom:300 }}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={()=>callback()}>
              <Text style={styles.loginText}>Log Out</Text>
            </TouchableOpacity>
          </View>
    )
}

const styles = StyleSheet.create({
    loginBtn: {
        width: "60%",
        backgroundColor: "#A1C703",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
      },
      loginText: {
        color: "white"
      },
});