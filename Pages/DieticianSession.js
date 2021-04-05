import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Button, SafeAreaView, Text, ListViewComponent, ScrollView} from 'react-native';
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
            trainerNotes: "",
            edit: false

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.fixedHeader}>


                </View>
                <ScrollView contentContainerStyle = {
                    {
                        position: 'fixed',
                        paddingBottom: 150,
                        overflow: 'hidden',
                    }
                }
                            style={{maxHeight: '100%'}}

                >
                    <Text style={styles.sessionNumber}> Session {this.props.session} </Text>
                    <DateTextBox edit = {this.state.edit}/>
                    <View style={styles.notes}>
                        <Text style = {styles.title}> Dietician Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={this.state.edit}
                            value={this.state.trainerNotes}
                            placeholder = "Record diet recommendations, reminders, etc..."
                            changeText = {newValue => this.changeText(newValue)}
                            //heading = "Trainer Notes"
                        />

                        <Text style={{fontSize: 10, padding: 10,margin:10}}>
                            *If needed, please contact ____ with any concerns or questions.
                        </Text>

                        <Text style = {styles.title}> Admin Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={false}
                            value={"Lorem Impsum dolor"}
                            placeholder = ""
                            changeText = {newValue => this.changeText(newValue)}
                            //heading = "Admin Notes"
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
    sessionNumber:{
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: '#838383',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 45,
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
        fontSize: 16,
        fontWeight:'bold',
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
    }
});