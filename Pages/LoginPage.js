import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class LoginPage extends React.Component {
    state={
      email:"",
      password:"",
      hidePass: true
    }

    handleEmailChange = email => {
      this.setState({ email })
    }
  
    handlePasswordChange = password => {
      this.setState({ password })
    }

    handleLoginPress = ()=>{
      if (this.state.email == "Survivor" && this.state.password == "Fitness"){
        this.props.navigation.navigate('AllPatientsPage')
      } else {
      this.alertInvalidLoginCredentials();
      }
    }
    

    alertInvalidLoginCredentials = () => {

      Alert.alert(
        //title
        'Invalid Username or Password',
        //body
        '',
        [
          {
            text: 'Try Again',
          },
    
        ],
        //clicking out side of alert will not cancel
      );

  }

    render(){
      const { email, password, hidePass } = this.state
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>Survivor Fitness</Text>
          <Text>Welcome, log in to continue</Text>
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
              secureTextEntry = {hidePass ? true: false}
              style={styles.inputText}
              placeholder="" 
              placeholderTextColor="#003f5c"
              returnKeyType='done'
              onSubmitEditing={()=>this.handleLoginPress()}
              onChangeText={this.handlePasswordChange}/>
             
          </View>
          <View style={styles.icon}>
          <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color="grey"
              onPress={() => this.setState({hidePass: !hidePass})}
            /> 
            </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.handleLoginPress()}>
            <Text style={styles.loginText} >Log In</Text>
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
      color:"black"
    },
    icon:{
      position: 'absolute',
      paddingTop: 30,
      paddingLeft: 225
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