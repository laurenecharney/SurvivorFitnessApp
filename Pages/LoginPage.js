import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native'
import {authenticate} from '../APIServices/APIUtilities';
import {saveItem, saveUserInfo, saveCurrentRole, getUser, getCurrentRole} from '../APIServices/deviceStorage';


const credentials = {
    "Super Admin": {
        "userType": "Super Admin",
        "email": "theo.justin@gmail.olala",
        "pass": "passwordTheo"
    },
    "Location Adm. Trainer": {
        "userType": "Location Adm. Trainer",
        "email": "nikitha.shantel@gmail.olala",
        "pass": "passwordNikitha"
    },
    "Location Adm. Dietician": {
        "userType": "Location Adm. Dietician",
        "email": "sri.karolyn@gmail.olala",
        "pass": "passwordSri"
    },
    "Trainer": {
        "userType": "Trainer",
        "email": "Marciana.Magne@gmail.olala",
        "pass": "passwordMarciana"
    },
    "Dietician": {
        "userType": "Dietician",
        "email": "Kapil.Mirjami@gmail.olala",
        "pass": "passwordKapil"
    },
}

export default class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        hidePass: true,
        developer: false,
    }

    clearProfile = () => {
        this.setState({email: '', password: '', hidePass: true,})
    }
    handleEmailChange = email => {
        this.setState({email})
    }

    handlePasswordChange = password => {
        this.setState({password})
    }

    handleDeveloperPress = async (keyword) => {
        if (keyword === 'Developer') {
            this.setState({developer: true, hidePass: false})
        } else {
            this.setState({email: credentials[keyword].email, password: credentials[keyword].pass})
        }
    }

    handleLoginPress = async () => {
        try {
        const res = await authenticate(this.state.email, this.state.password);
        if (res && res.jwt && res.user){
            await Promise.all[saveItem("id_token", res.jwt),
            saveUserInfo(res.user)];
            if (res.user.roles.includes('SUPER_ADMIN')){
                this.props.navigation.replace('SuperAdminPage');
                await saveCurrentRole('SUPER_ADMIN');
            } else if (res.user.roles.includes('DIETITIAN')){
                await saveCurrentRole("DIETITIAN");
                this.props.navigation.replace('AllPatientsPage', {
                    participantsParam: {dietitianUserId: res.user.id}
                });

            } else if (res.user.roles.includes('TRAINER')) {
                await saveCurrentRole("TRAINER");
                const role = await getCurrentRole();
                console.log("role: ", role);
                this.props.navigation.replace('AllPatientsPage', {
                    participantsParam: {trainerUserId: res.user.id}
                });

            } else {
                const role = res.user.roles.includes("TRAINER") ? "TRAINER" : "DIETITIAN"
                this.props.navigation.replace("LocationAdminPage", {
                    screen: "Participants",
                    params: {
                      userType: res.user.roles.includes("TRAINER") ? "TRAINER" : "DIETITIAN",
                      locationId: res.user.locations ? res.user.locations[0].id : null
                    }
                  });
                  await saveCurrentRole("LOCATION_ADMINISTRATOR");
            } 

            // alert(res.user.roles.length)
        }
        else if (res && res.status === 403){
            this.alertInvalidLoginCredentials();
        } else {
            alert("Could not log in. Please try again later.");
        }
        } catch (e){
            console.log("Error logging in:\n", e);
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
                            placeholder="email"
                            placeholderTextColor="#AAAAAA"
                            keyboardType="email-address"
                            onChangeText={this.handleEmailChange}/>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            name='password'
                            value={password}
                            secureTextEntry={hidePass ? true : false}
                            style={styles.inputText}
                            placeholder="password"
                            placeholderTextColor="#AAAAAA"
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
                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress('Developer')}>
                            <Text style={styles.forgot}>Developer?</Text>
                        </TouchableOpacity>
                        {
                            this.state.developer ? 
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress('Super Admin')}>
                                        <Text style={styles.developer}>Super adm.?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress("Location Adm. Trainer")}>
                                        <Text style={styles.developer}>Location Trainer?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress("Location Adm. Dietician")}>
                                        <Text style={styles.developer}>Location dietician?</Text>
                                    </TouchableOpacity>
                        

                                </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress("Dietician")}>
                                            <Text style={styles.developer}>dietician?</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginVertical: 10}} onPress={() => this.handleDeveloperPress("Trainer")}>
                                            <Text style={styles.developer}>trainer?</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                            : null

                        }
                    
                    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => this.handleLoginPress()}>
                        <Text style={styles.loginText}>Log In</Text>
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
    developer: {
        color: "#AED803",
        fontSize: 15,
        paddingLeft: 10,
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