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
            <View style = {styles.row}>
                <View style = {styles.left}>
                    <TouchableOpacity style={styles.backButton} onPress={()=>callback("back")}>
                        <Icon3 name={"keyboard-arrow-left"} size={42} color={'#E4E4E4'}  />
                    </TouchableOpacity>
                </View>
                <View style = {styles.center}>
                    <Text style={styles.headline}>{title}</Text>
                </View>
                    <View style = {styles.right}>
                </View>
            </View> 
            }
            {displaySettingsButton && (
                <View style = {styles.row2}>
                    <View style = {styles.left}>
                    </View>
                    <View style = {styles.center}>
                        <Text style={styles.headline}>{title}</Text>
                    </View>
                    <View style = {styles.right}>
                        <TouchableOpacity onPress={()=>callback()}>
                            <Icon2 style={styles.settings} size={30} name={"settings"} />
                        </TouchableOpacity>
                    </View>
                </View> 
            )}
            {displayAddButton && 
                <View style = {styles.row}>
                    <View style = {styles.left}>
                    </View>
                    <View style = {styles.center}>
                        <Text style={styles.headline}>{title}</Text>
                    </View>
                    <View style = {styles.right}>
                        <View style={styles.addButtonContainer} >
                            <TouchableOpacity onPress={()=>callback("add")}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
            {titleOnly && 
                <View style = {styles.row2}>
                    <View style = {styles.left}>
                    </View>
                    <View style = {styles.center}>
                        <Text style={styles.headline}>{title}</Text>
                    </View>
                    <View style = {styles.right}>
                    </View>
                </View>
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection: "row",
        alignContent: "space-between",
        marginTop: 60,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingBottom:25
    },
    row2:{
        flexDirection: "row",
        marginTop: 60,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingBottom:30
    },
    left:{
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 75,
    },
    center:{
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "auto",
    },
    right:{
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 75,
    },

    headline: {
        fontSize: 25,
        paddingTop: 7,
        color: '#AED803',
        fontWeight: '400',
        textAlign: 'center'
    },
    addButtonContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 48,
    },
    
    backButton:{
        color: '#E4E4E4',
    },
    settings: {
      color: "#E4E4E4",
      paddingHorizontal: 10,
      paddingTop:7,
      marginRight: 30
    },
    addButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});