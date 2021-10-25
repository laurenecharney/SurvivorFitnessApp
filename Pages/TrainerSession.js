import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button, SafeAreaView, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Sidebar from '../Components/Sidebar.js';
import DateTextBox from '../Components/DateTextBox.js';
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class TrainerSession extends Component {
  constructor(props){
    super(props);

    this.state = {
        trainerNotes: "",
        edit: false,
        isModalVisible: false
    }
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

alertLogSession = () => {
    Alert.alert('Log Session?', '',
    [
        {
            text: 'DatePicker',
            onPress: () => {}
        },
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
    this.setState({trainerNotes: newValue});
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
                            title = {this.state.edit ? "Save%%%" : "Log Session%%%"}
                            onPress={()=> this.setState({edit: !this.state.edit, isModalVisible: true})}
                        />

                <Modal
                propagateSwipe={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => this.closeAddModal()}
                onSwipeComplete={() => this.closeAddModal()}
                isVisible={this.state.isAddModalVisible}
                >
                    <View
                        style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                        }}
                    >
                        <View
                        style={{
                            backgroundColor: "#fff",
                            width: "90%",
                            height: "50%",
                            borderRadius: "19"
                        }}
                        >
                        <TouchableOpacity
                            style={{ paddingLeft: 260, paddingTop: 10 }}
                            onPress={() => this.closeAddModal()}
                        >
                            <Icon name={"close"} color={"#E4E4E4"} size={32} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ paddingBottom: 10, width: "100%" }}>
                                <Text style={styles.modalText}>
                                {"Confirm Date"}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.childText}>Add DatePicker Here</Text>
                                {/* <View style={styles.child}>
                                <TextInput
                                    style={styles.input}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="transparent"
                                    color="black"
                                    autoCapitalize="sentences"
                                />
                                </View> */}
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <AppButton title={"Log"} />
                                <AppButton title={"Cancel"} />
                            </View>
                            </ScrollView>
                        </View>
                        </View>
                    </View>
                </Modal>

                <DateTextBox edit = {this.state.edit}/>
                    <View style={styles.notes}>
                        <Text style = {styles.title}> Trainer Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={this.state.edit}
                            value={this.state.trainerNotes}
                            placeholder = "Record Routine, exercise reps ... "
                            changeText = {newValue => this.changeText(newValue)}
                        />

                        <Text style={styles.finePrint}>
                            If needed, please contact your admin with any concerns or questions.
                        </Text>

                        <Text style = {styles.title}> Admin Notes: </Text>
                        <MultilineInputSaveComponent
                            edit={false}
                            value={""}
                            placeholder = ""
                            onPress={()=>alert("yo don't")}
                            changeText = {newValue => this.changeText(newValue)}
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
