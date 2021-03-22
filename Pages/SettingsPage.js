import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SettingsTab from "../Components/SettingsTab.js";

export default class SettingsPage extends React.Component {

    render(){
      return (
        <View style={styles.container}>
            <View style={styles.headline}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name = {'keyboard-arrow-left'} size = {50} color = {'#BEBEBE'}/>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flex: .9, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 30, color: '#3E3E3E'}}> Settings </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center', paddingTop: 50}}>
                <SettingsTab name = "Profile"/>
                <SettingsTab name = "Switch to Trainer Account"/>
                <SettingsTab name = "Download Data"/>
                <TouchableOpacity style={styles.loginBtn}>
                  <Text style={styles.loginText} >Log Out</Text>
                </TouchableOpacity>
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
    loginBtn:{
      width:"80%",
      backgroundColor:"#A1C703",
      borderRadius:25,
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