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


export const SettingsRow = ({title, iconName, callback, user}) => {
    return(
        <View>
            <TouchableOpacity onPress={()=>callback(user)} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
                <View style={styles.row}>
                    <Text style={styles.text}>{title}</Text>
                    <Icon name={iconName} size={40} color={'#E4E4E4'}/>
                </View>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#E6E6E6",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        padding: 35,
        justifyContent: "space-between",
        width:"100%"
      },
      text: {
        fontSize: 18,
        color: "#3E3E3E",
        flexDirection: "row",
        alignItems: "flex-start",
        textAlign: "left"
      }
});