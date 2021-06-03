import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {StyleSheet, View, TouchableOpacity, LayoutAnimation, Text, TextInput, ScrollView} from 'react-native';

export const AppButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded_info: false,
            expanded_password: false,
            phone_number: "Phone Number",
            email: "Email",
            current_password: "Current Password",
            new_password: "New Password",
            new_password_again: "New Password Again",
            edit: false

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    toggleExpandInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_info: !this.state.expanded_info})
    }
    toggleExpandPassword = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_password: !this.state.expanded_password})
    }

    render() {
        return (
            <View>
                <ScrollView>
            <View style={styles.container}>

                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.workHeadline}>Profile</Text>
            </View>

                <View style={{flexDirection: 'column', paddingTop: 10, width:"100%"}}>
                    <View >
                        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpandInfo()}>
                            <Text style={styles.categoryText}>Contact Information</Text>
                            <Icon name={this.state.expanded_info ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                  size={30} color={'#E4E4E4'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.parentHr}/>
                    {
                        this.state.expanded_info &&
                        <View>
                            <Text style={styles.childText}>
                                Phone Number
                            </Text>
                        </View>}
                    {
                        this.state.expanded_info &&
                        <View style={styles.child}>
                            <TextInput style={styles.input}
                                       ref={(input) => {
                                           this.secondTextInput = input;
                                       }}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.phone_number ? this.state.phone_number : "Phone Number"}
                                       defaultValue={this.state.phone_number == "Phone Number" ? null : this.state.phone_number}
                                       placeholderTextColor="#D5D5D5"
                                       color="black"
                                       autoCapitalize="sentences"
                                       onChangeText={newPhoneNumber => this.setState({phone_number: newPhoneNumber})}
                            />
                        </View>}
                    {
                        this.state.expanded_info &&
                        <View>
                            <Text style={styles.childText}>
                                Email
                            </Text>
                        </View>}
                    {
                        this.state.expanded_info &&
                        <View style={styles.child}>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.email ? this.state.email : "Email"}
                                       defaultValue={this.state.email == "Email" ? null : this.state.email}
                                       placeholderTextColor="#D5D5D5"
                                       color="black"
                                       autoCapitalize="sentences"
                                       onChangeText={newEmail => this.setState({email: newEmail})}
                                       keyboardType={'numeric'}
                            />
                        </View>}
                    {
                        this.state.expanded_info &&
                        <View>
                            <AppButton
                                title={this.state.edit ? "SAVE" : "EDIT"}
                                onPress={() => this.setState({edit: !this.state.edit})}
                            />
                        </View>}
                    <TouchableOpacity style={styles.row} onPress={() => this.toggleExpandPassword()}>
                        <Text style={styles.categoryText}>Change Password</Text>
                        <Icon name={this.state.expanded_password ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                              size={30} color={'#E4E4E4'}/>
                    </TouchableOpacity>
                    <View style={styles.parentHr}/>
                    {
                        this.state.expanded_password &&
                        <View>
                            <Text style={styles.childText}>
                                Enter Current Password
                            </Text>
                        </View>}
                    {
                        this.state.expanded_password &&
                        <View style={styles.child}>
                            <TextInput style={styles.input}
                                       ref={(input) => {
                                           this.secondTextInput = input;
                                       }}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.current_password ? this.state.current_password : "Current Password"}
                                       defaultValue={this.state.current_password == "Current Password" ? null : this.state.current_password}
                                       placeholderTextColor="#D5D5D5"
                                       color="black"
                                       autoCapitalize="sentences"
                                       onChangeText={newCurrentPassword => this.setState({current_password: newCurrentPassword})}
                            />
                        </View>}
                    {
                        this.state.expanded_password &&
                        <View>
                            <Text style={styles.childText}>
                                Enter New Password
                            </Text>
                        </View>}
                    {
                        this.state.expanded_password &&
                        <View style={styles.child}>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.new_password ? this.state.new_password : "New Password"}
                                       defaultValue={this.state.new_password == "New Password" ? null : this.state.new_password}
                                       placeholderTextColor="#D5D5D5"
                                       color="black"
                                       autoCapitalize="sentences"
                                       onChangeText={newNewPassword => this.setState({new_password: newNewPassword})}
                                       keyboardType={'numeric'}
                            />
                        </View>}
                    {
                        this.state.expanded_password &&
                        <View style={styles.child}>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.new_password_again ? this.state.new_password_again : "New Password Again"}
                                       defaultValue={this.state.new_password_again == "New Password Again" ? null : this.state.new_password_again}
                                       placeholderTextColor="#D5D5D5"
                                       color="black"
                                       autoCapitalize="sentences"
                                       onChangeText={newNewPasswordAgain => this.setState({new_password_again: newNewPasswordAgain})}
                                       keyboardType={'numeric'}
                            />
                        </View>}
                    {
                        this.state.expanded_password &&
                        <View>
                            <AppButton
                                title={this.state.edit ? "SAVE" : "EDIT"}
                                onPress={() => this.setState({edit: !this.state.edit})}
                            />
                        </View>}
                </View>
            </View>
            </ScrollView>
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
    workHeadline:{
        fontSize: 25,
        marginTop: 50,
        marginLeft: 15,
        padding: 25,
        color: '#3E3E3E',
        fontWeight:'600'
      },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        position: 'absolute',
        marginTop: 45,
        marginLeft: 0,
        color: '#3E3E3E',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        opacity: 1,
        zIndex: 15,
        borderBottomColor: "#BEBEBE",
        borderBottomWidth: 1
    },

    parentHr: {
        height: 1,
        color: 'white',
        width: '60%',
        alignSelf:"center"
    },
    child: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#D5D5D5",
        borderRadius: 10,
        marginBottom: 10,
        alignSelf:"center",
        width:"60%"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 150,
        alignSelf: "center",
        margin: 20
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
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

    categoryText: {
        fontSize: 18,
        color: '#3E3E3E',
        flexDirection: 'row',
        alignItems: 'flex-start',
        textAlign: 'left',
        fontWeight:'500'
    },
    childText:{
        paddingTop: 16,
        paddingLeft: 75,
        paddingBottom: 8,
        color: "#A1C703",
        fontSize: 17,
        justifyContent: 'flex-start',
    },
    input:{
        height: 40,
        justifyContent: 'flex-start',
        padding: 10
    },
});