import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SettingsTab from "../Components/SettingsTab.js";
import Icon2 from 'react-native-vector-icons/Ionicons';

export default class TrainerSettingsPage extends React.Component {

    render(){
      return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.workHeadline}>Settings</Text>
            </View>
            <View style={{flexDirection: 'column', width:"100%"}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage')}>
              <View style={styles.row}>
                  <Text style={styles.text}>Profile</Text>
                  <Icon style={styles.settings} size={30} color="#E4E4E4" name={'keyboard-arrow-right'}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                  <Text style={styles.text}>Switch to Admin Account</Text>
                  <Icon style={styles.settings} size={30} color="#E4E4E4" name={'keyboard-arrow-right'}/>
              </View>
            </TouchableOpacity>
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
        fontWeight: '500',
        fontSize: 18,
        position: 'absolute',
        marginTop: 45,
        marginLeft: 0,
        color: '#3E3E3E',
        flexDirection:'row',
        flexWrap:'wrap',
        flex: 1,
        opacity: 1,

    },
    workHeadline:{
      fontSize: 25,
      marginTop: 50,
      padding: 25,
      fontWeight: "600",
      color: '#3E3E3E',
    },
    loginBtn:{
      width:"40%",
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
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#E6E6E6',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      padding: 25,
      justifyContent: 'space-between',
  },

  text: {
      fontSize: 20,
      color: '#3E3E3E',
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: 'left',
  },
  });