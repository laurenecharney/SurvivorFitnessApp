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
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";


export const Heading = ({title, displayBackButton, displaySettingsButton, displayAddButton, titleOnly, callback}) => {
    return(
        <View>
            <View>
            {displayBackButton && 
                <View style={styles.backHeading}>
                <TouchableOpacity style={styles.backButton} onPress={()=>callback()}>
                    <Icon3 name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"}  />
                </TouchableOpacity>
                <Text style={styles.backHeadline}>{title}</Text>
                </View>
            }
            {displaySettingsButton && (
                <View style={styles.settingsHeading}>
                <Text style={styles.headline}>{title}</Text>
                <TouchableOpacity
                    style={{ paddingLeft: 125 }}
                    onPress={()=>callback()}>
                    <Icon2 style={styles.settings} size={30} name={"settings"} />
                    {/* <Image source={require('../assets/Group -1.png')} style={styles.logo} /> */}
                </TouchableOpacity>
                </View>
            )}
            {displayAddButton && 
                <View style={styles.heading}>
                <Text style={styles.headline}>{title}</Text>
                <View style={styles.addButtonContainer} >
                    <TouchableOpacity onPress={()=>callback()}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {titleOnly && 
                <View style={styles.heading}>
                    <Text style={styles.backHeadline}>{title}</Text>
                </View>
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backHeading:{
        flexDirection: "row", 
      },
      backHeadline: {
          fontSize: 25,
          marginTop: 50,
          paddingTop: 25,
          paddingBottom:25,
          color: "#AED803",
          fontWeight: "400",
          textAlign:'left'
      },
    settingsHeading:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1
    },
    heading:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1
    },
    headline: {
      fontSize: 25,
      marginTop: 50,
      marginLeft: 10,
      padding: 25,
      color: '#AED803',
      fontWeight: '400',
    },
    backButton:{
        color: "#E4E4E4",
        marginTop: 65,
    },
    settings: {
      color: "#E4E4E4",
      marginTop: 50,
      paddingHorizontal: 10,
      paddingBottom: 0,
      marginRight: 30
    },
    addButtonContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 48,
        alignSelf: "center",
        margin: 5,
        marginTop: 50
    },
    addButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});