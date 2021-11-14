import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, 
  Platform,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'
import DateTextBox from '../Components/DateTextBox'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllSessionNotesByParticipantID, getParticipantSessions } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { Measurements } from "../Components/Measurements";

const AppButton = ({ onPress, title, logged }) => (
    <TouchableOpacity onPress={onPress} 
        style={!logged ? styles.appButtonContainer : styles.loggedContainer}>
        <Text style={!logged ? styles.appButtonText : styles.loggedText}>{title}</Text>
    </TouchableOpacity>
);

const SmallAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainerSmall}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const SessionModal = () => {
    <Modal
    propagateSwipe={true}
    animationIn="slideInUp"
    animationOut="slideOutDown"
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
                borderRadius: "19",
                alignItems: "center", justifyContent: 'space-around'
            }}
            >
            </View>
        </View>
    </Modal>
}
export default class TrainerCheckpointPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            expanded_general: false,
            expanded_skin_fold: false,
            expanded_girth: false,
            expanded_treadmill: false,
            trainerNotes: "",
            isDateConfirmModalVisible: false,
            isDatePickerModalVisible: false,
            sessionDate: new Date(),
            testSessionDate: new Date(2000, 6, 2),
            edit: false,
            logged: false
        }
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    closeDateConfirmModal = () => {
        this.setState({
            isDateConfirmModalVisible: false,
        })
    }
    closeDatePickerModal = () => {
        this.setState({
            isDatePickerModalVisible: false,
        })
    }

    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }

    getTimePickerWidth = () => {
        return 115 + 10 * (this.state.sessionDate.getDate() < 10? 0 : 1);
    }

    getAppButtonColor = () => {
        return edit? "white" : '#AED804';
    }


    async fetchUser() {
      const res = await getUser();
      this.setState({user: JSON.parse(res)})
    //   const res = await getParticipantSessions(2);
    //   console.log(res);

    //   const res2 = await getAllSessionNotesByParticipantID(2);
    }


    async componentDidMount() {
        //TODO
        // await this.refreshList();
        await this.fetchUser();
        console.log("DATA (from checkpoint page): ", this.props.sessionData)
        if (this.props.sessionData) {
            console.log("DIS BOY IS TRUE")
            this.setState({
                sessionDate: new Date(parseInt(this.props.sessionData.initalLogDate)),
                // edit: true,
                logged: true
            })
        } else {
            console.log("DIS BOY IS FALSE")
        }
        // if (this.state)
      }


    render(){
        return(
            <View style = {styles.container}>

                <ScrollView 
                    contentContainerStyle = {styles.scrollContentContainer}
                    style={styles.scrollViewStyle}
                >
   
                    
                    <AppButton
                        title = {this.state.logged ? this.state.sessionDate.toLocaleDateString('en-US', {weekday: 'short', month: 'long', day: 'numeric'}) : "Log Session"}
                        onPress={()=>this.setState({edit: !this.state.edit, isDateConfirmModalVisible: true})}
                        logged={this.state.logged}
                    />
                    {/* <AppButton
                        title = {"reset"}
                        onPress={()=>this.setState({logged: false})}
                    /> */}



                {
                    (this.props.trainerSessionSelected && this.props.isCheckpoint) &&
                    <Measurements></Measurements>
                }
                    <Modal
                        propagateSwipe={true}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                        onSwipeComplete={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                        isVisible={this.state.isDateConfirmModalVisible}
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
                                height: "30%",
                                borderRadius: "19",
                                alignItems: "center", justifyContent: 'space-around'
                            }}
                            >
                                <TouchableOpacity
                                    style={{ paddingLeft: 260, paddingTop: 10 }}
                                    onPress={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                                >
                                    <Icon name={"close"} color={"#E4E4E4"} size={32} />
                                </TouchableOpacity>
                                <View style={{flex: 1, width: '100%'}}>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                                        <Text style={styles.heading}>
                                        {"Select Date"}
                                        </Text>
                                            <DateTimePicker
                                                style={{height: 40, width: this.getTimePickerWidth(), marginTop: 10, alignItems: "center"}}
                                                value={this.state.sessionDate}
                                                mode="date"
                                                display="calendar"
                                                onChange={(event, enteredDate) => {
                                                    this.setState({
                                                        sessionDate: enteredDate,
                                                    })
                                                }}
                                            />
                                        <View>
                                            <SmallAppButton
                                                title={!this.state.logged ? "Confirm" : "Confirm New Date"}
                                                onPress={()=>this.setState({logged: true, isDateConfirmModalVisible: false})}
                                            />
                                        </View>

                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
           
        </ScrollView>
      
        </View>);
        }
        
    }


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        // backgroundColor: 'red',
        width: '100%',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 50,
        marginTop: 25,
        marginLeft: 100,
        color: '#3E3E3E',
        justifyContent: 'space-evenly',

    },
    scroll: {
        overflow: 'hidden',
    },
    heading:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    loggedContainer: {
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        borderColor: '#AED804',
        // borderWidth: 2,
        paddingVertical: 25,
        paddingHorizontal: '10%',
        marginTop: 40,
        backgroundColor: '#dddddd'
        // marginBottom: -30
    },
    loggedText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#3E3E3E",
        textAlign: "center",
    },
    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    categoriesContainer: {
        paddingVertical: 30,
        
    },
    categoryContainer: {
        // padding: 10,
        flexDirection: 'row',
        // justifyContent:'space-between',
        // height:56,
        width: '80%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderColor: "#E6E7E6",

    },
    
    
    categoryRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        width: '100%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        paddingRight: '10%',
    },
    arrowIcon: {
        justifyContent: 'space-between',
        // alignItems: 
        paddingRight: '10%'
    },
    
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        marginLeft: 15,
        marginRight: 15
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    measurementContainer: {
        width: "80%"
    },
    measurement:{
        padding:10,
        borderBottomWidth: 1,
        borderColor: "#D5D5D5",
        marginLeft:30,
        flexDirection: 'row',

    },
    measurementText: {
        // color: "black"
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    notes: {
        width: '93%',
        // backgroundColor: 'blue',
        margin: 10,
        height: '35%',
        marginBottom: 20,
        top: 2,
        fontSize: 15,
        position: 'relative',
        
    },
    fixedHeader: {
        zIndex: 1,
        width: '100%',
        backgroundColor:'white',
        top: 0,
        left: 0,
        

        // position: 'absolute'
    },

    sessionNumber:{
       fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: '#838383',
        fontWeight: 'bold',
        paddingBottom: 20,
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: '10%',
        width: '80%',
        marginTop: 40
        
    },
    appButtonContainerSmall: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: '20%',
        //width: '80%',
        // marginLeft: '5%'
        marginTop: 10
        
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        alignSelf: "center",
    },
    sessionNumberContainer: {
        elevation: 8,
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        // width: '90%',
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
    scrollContentContainer: {
        paddingBottom: 75,
        // overflow: 'hidden',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    scrollViewStyle: {
        maxHeight: '100%',
        width: '85%'
    }
});
