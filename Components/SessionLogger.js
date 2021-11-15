import React, { Component, useState, useEffect } from 'react';
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
import MultilineInputSaveComponent from './MultilineInputSaveComponent'
import DateTextBox from './DateTextBox'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllSessionNotesByParticipantID, getParticipantSessions } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { Measurements } from "./Measurements";

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

export const SessionLogger = ({isCheckpoint, sessionData, trainerSessionSelected}) => {
    const [user, setUser] = useState({});
    const [expanded_general, setExpanded_general] = useState(false);
    const [expanded_skin_fold, setExpanded_skin_fold] = useState(false);
    const [expanded_girth, setExpanded_girth] = useState(false);
    const [expanded_treadmill, setExpanded_treadmill] = useState(false);
    const [isDateConfirmModalVisible, setIsDateConfirmModalVisible] = useState(false);
    const [sessionDate, setSessionDate] = useState(new Date());
    const [timePickerWidth, setTimePickerWidth] = useState(125);
    const [edit, setEdit] = useState(false)
    const [logged, setLogged] = useState(false)
    //const [measurementData, setMeasurementData] = useState(sessionData.measurements);

    const getAppButtonColor = () => {
        return edit? "white" : '#AED804';
    }

    const logSession = () => {
        setEdit(!edit)
        setIsDateConfirmModalVisible(true)
    }

    async function fetchUser() {
      const res = await getUser();
      setUser(JSON.parse(res))
    }

    useEffect(() => {
        // this React lifecycle hook gets called when the component is first loaded
        // and when sessionData is changed. It essentially waits
        // for the async call to get the ParticipantSessions to complete
        if (sessionData) {
            let tempDate = new Date(sessionData.initialLogDate)
            setSessionDate(tempDate)
            setLogged(true)
            setTimePickerWidth(115 + 10 * (tempDate.getDate() < 10? 0 : 1))
        } else {
            console.log("Data not ready yet")
        }
    }, [sessionData]);

    return(
        <View style = {styles.container}>
            <ScrollView 
                contentContainerStyle = {styles.scrollContentContainer}
                style={styles.scrollViewStyle}
            >
                <AppButton
                    title = {logged ? sessionDate.toLocaleDateString('en-US', {weekday: 'short', month: 'long', day: 'numeric'}) : "Log Session"}
                    onPress={logSession}
                    logged={logged}
                />
                {/* <AppButton
                    title = {"reset"}
                    onPress={()=>setLogged(false)}
                /> */}

            {
                (trainerSessionSelected && isCheckpoint) &&
                <Measurements measurementData={sessionData.measurements}/>
            }
                <Modal
                    propagateSwipe={true}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    onBackdropPress={()=> {
                        setEdit(true)
                        setIsDateConfirmModalVisible(false)
                    }}
                    onSwipeComplete={()=> {
                        setEdit(true)
                        setIsDateConfirmModalVisible(false)
                    }}
                    isVisible={isDateConfirmModalVisible}
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
                                onPress={()=> {
                                    setEdit(true)
                                    setIsDateConfirmModalVisible(false)
                                }}
                            >
                                <Icon name={"close"} color={"#E4E4E4"} size={32} />
                            </TouchableOpacity>
                            <View style={{flex: 1, width: '100%'}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                                    <Text style={styles.heading}>
                                    {"Select Date"}
                                    </Text>
                                        <DateTimePicker
                                            style={{height: 40, width: timePickerWidth, marginTop: 10, alignItems: "center"}}
                                            value={sessionDate}
                                            mode="date"
                                            display="calendar"
                                            onChange={(event, enteredDate) => {
                                                setSessionDate(enteredDate)
                                            }}
                                        />
                                    <View>
                                        <SmallAppButton
                                            title={!logged ? "Confirm" : "Confirm New Date"}
                                            onPress={()=> {
                                                setLogged(true);
                                                setIsDateConfirmModalVisible(false);
                                            }}
                                        />
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
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
