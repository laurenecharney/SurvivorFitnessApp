import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Button, SafeAreaView, Text, ListViewComponent, ScrollView, Alert} from 'react-native';
import Sidebar from '../Components/Sidebar.js';
import DateTextBox from '../Components/DateTextBox.js';
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class DieticianSession extends Component {
    constructor(props){
        super(props);

        this.state = {
            dieticianNotes: "",
            edit: false

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    alertLogSession = () => {
        Alert.alert('Log Session?', '',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed')
            },
            {
                text: 'Log',
                onPress: () => {
                    
                }
            },
        ]
        )
    }

    changeText = (newValue)=>{
        this.setState({dieticianNotes: newValue});
    }
    render() {
        return (
            <View style = {styles.container}>

                <ScrollView contentContainerStyle = {
                    {
                        position: 'fixed',
                        paddingBottom: 150,
                        overflow: 'hidden',
                    }
                }
                            style={{maxHeight: '100%'}}

                >
                    <AppButton
                            title = {this.state.edit ? "Save" : "Log Session"}
                            onPress={()=>this.setState({edit: !this.state.edit})}
                        />
                    <DateTextBox edit = {this.state.edit}/>
                    <View style={styles.notes}>
                        <Text style = {styles.title}> Dietitian Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={this.state.edit}
                            value={this.state.dieticianNotes}
                            placeholder = "diet recommendations, reminders, etc "
                            changeText = {newValue => this.changeText(newValue)}
                        />

                        <Text style={styles.finePrint}>
                            *If needed, please contact ____ with any concerns or questions.
                        </Text>

                        <Text style = {styles.title}> Admin Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={false}
                            value={"Lorem Impsum dolor"}
                            placeholder = ""
                            changeText = {newValue => this.changeText(newValue)}
                        />
                        <AppButton
                            title = {this.state.edit ? "SAVE" : "EDIT"}
                            onPress={()=>this.setState({edit: !this.state.edit})}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      alignItems: 'flex-start',
    },
    sessionNumberContainer: {
            elevation: 8,
            backgroundColor:'#AED804',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: '90%',
            height: '7%',
            alignSelf: "center",
            margin: 20,
            justifyContent: "center",
        },
    sessionNumberText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    notes: {
        padding: 5,
        margin: 5,
        height: '35%',
        marginBottom: 20,
        fontSize: 15,
        position: 'relative',
    },
    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    finePrint:{
        fontSize: 8,
        padding: 10,
        margin:10,
        color: '#838383',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200,
        alignSelf: "center",
        margin: 20
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});