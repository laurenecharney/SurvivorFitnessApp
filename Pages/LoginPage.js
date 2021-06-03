import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native'


export default class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        hidePass: true
    }

    handleEmailChange = email => {
        this.setState({email})
    }

    handlePasswordChange = password => {
        this.setState({password})
    }

    handleLoginPress = () => {
        if (this.state.email == "Survivor" && this.state.password == "Trainer") {
            this.props.navigation.navigate('AllPatientsPage')
        } else if (this.state.password == "Super Admin") {
            this.props.navigation.navigate('SuperAdminPage');

        } else if (this.state.password == "Location Admin") {
            this.props.navigation.navigate('LocationAdminPage');

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

    render() {
        const {email, password, hidePass} = this.state
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <Text style={styles.header}>Welcome,</Text>
                <Text style={styles.subtitle}>Log in to continue.</Text>
                <View style={styles.centeredContainer}>
                    <View style={styles.inputView}>
                        <TextInput
                            name='email'
                            value={email}
                            style={styles.inputText}
                            placeholder=""
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handleEmailChange}/>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            name='password'
                            value={password}
                            secureTextEntry={hidePass ? true : false}
                            style={styles.inputText}
                            placeholder=""
                            placeholderTextColor="#003f5c"
                            returnKeyType='done'
                            onSubmitEditing={() => this.handleLoginPress()}
                            onChangeText={this.handlePasswordChange}/>
                        <Icon
                            style={styles.icon}
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
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontWeight: "500",
        fontSize: 25,
        color: "#AED803",
        marginLeft: '10%'
    },
    subtitle: {
        fontWeight: "500",
        fontSize: 20,
        color: "#BEBEBE",
        marginBottom: "10%",
        marginLeft: '10%'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#F4F4F4",
        borderRadius: 7,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
    },
    icon: {
        position: 'absolute',
        alignSelf: "flex-end",
        paddingRight: 24
    },
    forgot: {
        color: "#AED803",
        fontSize: 15,
        textAlign: "right",
        paddingLeft: 200

    },
    loginBtn: {
        width: "45%",
        backgroundColor: "#AED803",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: "20%"

    },
    loginText: {
        color: 'white',
        fontFamily: "Helvetica Neue",
        fontSize: 21
    },
    logo: {
        height: '7.5%',
        width: '60%',
        alignSelf: "center",
        marginBottom: "10%"
    }
});