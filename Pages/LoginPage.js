import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { createStackNavigator } from 'react-navigation';

export default class LoginPage extends React.Component {
    state={
      email:"",
      password:""
    }

    handleEmailChange = email => {
      this.setState({ email })
    }
  
    handlePasswordChange = password => {
      this.setState({ password })
    }

    render(){
      const { email, password } = this.state
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>Survivor Fitness</Text>
          <View style={styles.inputView} >
            <TextInput  
              name='email'
              value={email}
              style={styles.inputText}
              placeholder="" 
              placeholderTextColor="#003f5c"
              onChangeText={this.handleEmailChange}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              name='password'
              value={password}
              secureTextEntry
              style={styles.inputText}
              placeholder="" 
              placeholderTextColor="#003f5c"
              onChangeText={this.handlePasswordChange}/>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText} >LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
  
    
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:45,
      color:"#A0C700",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#E6E6E6",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"#3E3E3E",
      fontSize:11
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