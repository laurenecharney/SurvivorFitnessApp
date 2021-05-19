import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SettingsTab from "../Components/SettingsTab.js";

export default class SettingsPage extends React.Component {

    render(){
      return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.workHeadline}>Settings</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
                <SettingsTab name = "Profile"/>
                <SettingsTab name = "Switch to Trainer Account"/>
                <SettingsTab name = "Download Data"/>
                <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.loginBtn}>
                  <Text style={styles.loginText} >Log Out</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        position: 'absolute',
        marginTop: 45,
        marginLeft: 0,
        color: '#3E3E3E',
        flexDirection:'row',
        flexWrap:'wrap',
        flex: 1,
        opacity: 1,
        zIndex: 15
    },
    workHeadline:{
      fontSize: 25,
      marginTop: 50,
      marginLeft: 15,
      padding: 25,
      color: '#AED803',
    },
    loginBtn:{
      width:"60%",
      backgroundColor:"#A1C703",
      borderRadius:10,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });