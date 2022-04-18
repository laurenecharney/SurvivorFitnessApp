import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, 
  ActivityIndicator,
  Platform,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTextBox from './DateTextBox'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllSessionNotesByParticipantID, getParticipantSessions } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { updateSession } from '../APIServices/APIUtilities';
import { Measurements } from "./Measurements";
import { logTrainerSession, logDietitianSession } from '../APIServices/APIUtilities';
import NotesSection from './NoteSection';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AppButton = ({ onPress, title, logged }) => (
    <TouchableOpacity onPress={onPress} 
        style={[!logged ? styles.appButtonContainer : styles.loggedContainer]}>
        <Text style={!logged ? styles.appButtonText : styles.loggedText}>{title}</Text>
    </TouchableOpacity>
);

const SmallAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainerSmall}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const ConfirmButton = ({ onPress, title, logged, disabled}) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={!logged ? styles.confirmButton : styles.confirmButtonGrayed}>
        <Text style={!logged ? styles.appButtonText : styles.loggedText}>{title}</Text>
    </TouchableOpacity>
);

export const SessionLogger = ({isCheckpoint, initSessionData, isDisabled, showLoggedSessionInSidebar, currentView, refreshMeasurements}) => {
    const [user, setUser] = useState({});
    const [isDateConfirmModalVisible, setIsDateConfirmModalVisible] = useState(false);
    const [sessionDate, setSessionDate] = useState(new Date());
    const [newSessionDate, setNewSessionDate] = useState(new Date());
    const [timePickerWidth, setTimePickerWidth] = useState(125);
    const [logged, setLogged] = useState(false)
    const [measurementData, setMeasurementData] = useState([])
    const [noteData, setNoteData] = useState(initSessionData.specialistNotes)
    // const [sessionData, setSessionData] = useState([])
    const [measurementsChanged, setMeasurementsChanged] = useState(false)
    const [loading, setLoading] = useState(true);
    const [showMeasurements, setShowMeasurements] = useState(false);

    //calls API utilities updateSession
    async function logSession() {
        let tempSessionData = JSON.parse(JSON.stringify(initSessionData));
        if (isCheckpoint && measurementData) {
            tempSessionData.measurements = measurementData;
        }
        tempSessionData.specialistNotes = noteData;
        const dateMilliseconds = sessionDate.getTime()
        let previouslyHadLogDate = initSessionData['initialLogDate'] != null;


        try {
            let res = await logTrainerSession(tempSessionData, dateMilliseconds)
            setLogged(true);
            showSessionInfo(res);
            showLoggedSessionInSidebar(initSessionData.sessionIndexNumber, previouslyHadLogDate)
            // refreshSidebar(); // this is redundant, with slightly different logic 
        } catch(e) {
            console.log("session cannot be logged: ", e);
        }
    }

    const showSessionInfo = (newSessionData = null) => {
        if (newSessionData == null) {
            newSessionData = JSON.parse(JSON.stringify(initSessionData));
            setMeasurementData(newSessionData.measurements)
        } else {
            console.log("showsession info and newSessionData is not null")
        }
        if (newSessionData.lastUpdatedDate) {
            const dateVal = parseInt(newSessionData.initialLogDate);
            let tempDate = new Date(dateVal)
            setSessionDate(tempDate)
            setNewSessionDate(tempDate)
            setTimePickerWidth(115 + 10 * (tempDate.getDate() < 10? 0 : 1))
            setLogged(true)
        } else {
            let tempDate = new Date()
            setSessionDate(tempDate)
            setNewSessionDate(tempDate)
            setLogged(false)
        }
    }

    const didMeasurementsChange = (newMeasurementData) => {
        const oldMeasurementData = initSessionData.measurements
        if (oldMeasurementData.length != newMeasurementData.length) {
            return true;
        }
        for (let i = 0; i < oldMeasurementData.length; i++) {
            if (oldMeasurementData[i].value != newMeasurementData[i].value) {
                return true;
            }
        }
        return false;
    }

    const updateMeasurementData = (newMeasurementData) => {
        if (didMeasurementsChange(newMeasurementData)) {
            setLogged(false)
        } else if (initSessionData.lastUpdatedDate) {
            // if a session has been logged and the "new measurement data" is identical
            // to what is stored in the backend, then the session is still logged
            setLogged(true)
        }
        setMeasurementData(newMeasurementData);
    }

    const updateNote = (newNote) => {
        setNoteData(newNote);
        if(newNote != initSessionData.specialistNotes) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }

    const confirmDate = () => {
        setIsDateConfirmModalVisible(false);
        setSessionDate(newSessionDate);

        const dateVal = parseInt(initSessionData['initialLogDate']);
        const initialLogDate = new Date(dateVal)

        // check if the new date is different from the previously logged date
        if (isSameDate(newSessionDate, initialLogDate)) {
            setLogged(true)
        } else {
            setLogged(false)
        }
    }

    // same as above, but slightly different semantics because the datepicker acts
    // differently on Android
    const confirmDateAndroid = (event, enteredDate) => {
        setIsDateConfirmModalVisible(false)
        setSessionDate(enteredDate || sessionDate);

        const dateVal = parseInt(initSessionData['initialLogDate']);
        const initialLogDate = new Date(dateVal)

        // check if the new date is different from the previously logged date
        if (isSameDate(enteredDate, initialLogDate)) {
            setLogged(true)
        } else {
            setLogged(false)
        }
    }

    const isSameDate = (date1, date2) => {
        const [month1, day1, year1]       = [date1.getMonth(), date1.getDate(), date1.getFullYear()];
        const [month2, day2, year2]       = [date2.getMonth(), date2.getDate(), date2.getFullYear()];
        
        return month1 == month2 && day1 == day2 && year1 == year2
    }

    useEffect(() => {
        // this React lifecycle hook gets called when the component is first loaded
        // and when initSessionData is changed. It essentially waits
        // for the async call to get the ParticipantSessions to complete

        // if initSessionData is an (empty) array, data is not ready. Otherwise it is an object, data is ready
        if (!Array.isArray(initSessionData)) { 
            setLoading(false)
            showSessionInfo()
            setMeasurementData(initSessionData.measurements)
        }

        // ****** initSessionData always holds the data which is stored in the backend for the particular session.
        // When the page first loads, it makes a call to the backend, and initSessionData
        // changes from null to the data returned.
        // When a session is logged, it makes a call to the backend, and initSessionData
        // again takes the data returned from the backend.
    }, [initSessionData]);

    useEffect(() => {
        setShowMeasurements(currentView === "TRAINER" && isCheckpoint)
    }, [isCheckpoint, currentView])

    return(
        <View style={styles.container}>
            {
                loading ? 
                <ActivityIndicator style={{position: "absolute", left: "30%", top: 200}} size="large"/>
                :
                <View style = {styles.container}>
                
                    <KeyboardAwareScrollView 
                        contentContainerStyle = {styles.scrollContentContainer}
                        style={styles.scrollViewStyle}
                    >
                        <View style={styles.sessionHeader}>
                            <Text style={styles.sessionheaderText}>
                                {"Session "+initSessionData.sessionIndexNumber}
                            </Text>
                            {
                            // (trainerSessionSelected && isCheckpoint) &&
                            showMeasurements &&
                                <Text style={styles.sessionSubheaderText}>
                                    It's measurement day! Record your participant's measurements before
                                    logging the session.
                                </Text>
                            }
                            {
                            isDisabled &&
                                <Text style={styles.sessionSubheaderWarningText}>
                                    *View only. Please log in as a trainer or dietitian to edit the respective data.
                                </Text>
                            }
                        </View>
   
                    <TouchableOpacity
                        style={styles.dateBar}
                        disabled = {isDisabled}
                        onPress={() => {setIsDateConfirmModalVisible(true);}}
                    >
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style = {{marginHorizontal: 15, marginVertical: 10, fontSize: 15, color: '#838383'}}>
                            {sessionDate.toLocaleDateString('en-US', {weekday: 'short', month: 'long', day: 'numeric'})}
                        </Text>
                        <Text style = {{margin: 15, color: '#AED804', fontWeight: 'bold', fontSize: 12}}>
                            {'Change'}
                        </Text>
                        </View>
                    </TouchableOpacity>
                    {
                    showMeasurements &&
                        // <Measurements measurementData={initSessionData.measurements}
                        <Measurements measurementData={measurementData}
                        refreshMeasurements={refreshMeasurements}
                        updateMeasurementData={updateMeasurementData}/>
                    }
                    <NotesSection 
                        noteData={initSessionData.specialistNotes}
                        callback={updateNote}
                        isEditable={!isDisabled}
                    />
                        {
                            Platform.OS === "ios" ?
                    <Modal
                        propagateSwipe={true}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={()=> {
                            setIsDateConfirmModalVisible(false)
                        }}
                        onSwipeComplete={()=> {
                            setIsDateConfirmModalVisible(false)
                        }}
                        isVisible={isDateConfirmModalVisible}
                    >
                        <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <View style={{backgroundColor: "#fff", width: "90%", height: 350, borderRadius: 19, alignItems: "center", justifyContent: 'space-around'}}>
                                <View style={{flex: 1, width: '100%'}}>
                                    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center" }}>
                                        <Text style={styles.heading}> {"Select Date"} </Text>
                                            <DateTimePicker
                                                style={{width: 300}}
                                                value={newSessionDate}
                                                mode="date"
                                                display="spinner"
                                                onChange={(event, enteredDate) => {
                                                    setNewSessionDate(enteredDate);
                                                }}
                                                />
                                        <View style={styles.datePickerModalButtonContainer}>
                                            <SmallAppButton
                                                title={"Confirm"}
                                                onPress={() => {
                                                    confirmDate()
                                                }}
                                            />
                                            <SmallAppButton
                                                title={"Cancel"}
                                                onPress={() => {
                                                    setIsDateConfirmModalVisible(false);
                                                    setNewSessionDate(sessionDate);
                                                }}
                                            />
                                        </View>
                                        </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    :
                    
                        isDateConfirmModalVisible &&
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={sessionDate}
                        mode={"date"}
                        // is24Hour={true}
                        display="default"
                        onChange={confirmDateAndroid}
                     />

                    
                    
                                            }
                    
            </KeyboardAwareScrollView>
            <View style={{marginBottom: 20, marginLeft: 20, marginTop: 5, width: '84%', justifyContent: "center", paddingBottom: 35}}>
                <ConfirmButton
                    title={!logged ? "Log Session" : "Logged"}
                    onPress={() => {
                        logSession(newSessionDate);
                    }}
                    disabled={isDisabled}
                    logged={logged}
                />
            </View>
            </View>
        }

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
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
    sessionHeader: {
        width: '84%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'blue',
        paddingTop: 50,
        marginBottom: 10
    },
    sessionheaderText: {
        fontSize: 17,
        fontWeight: "600",
        color: '#838383',
        textAlign: "center",
    },
    sessionSubheaderText: {
        marginTop: 23,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "400",
        color: '#838383',
    },
    sessionSubheaderWarningText:{
        marginTop: 23,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "400",
        color: '#FF4A49',
    },
    scroll: {
        overflow: 'hidden',
    },
    heading:{
        fontSize: 18,
        marginTop: 20,
        fontWeight:'600',
        color: '#838383',
    },
    loggedContainer: {
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        borderColor: '#AED804',
        paddingVertical: 25,
        paddingHorizontal: '10%',
        marginTop: 40,
        backgroundColor: '#dddddd'
        // marginBottom: -30
    },
    loggedText: {
        fontSize: 15,
        fontWeight:'600',
        color: '#838383',
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
        paddingHorizontal: '12%',
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        alignSelf: "center",
    },
    confirmButton: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: '12%',
        marginLeft: '2%',
        width: '84%',
    },
    confirmButtonGrayed: {
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: '12%',
        marginLeft: '2%',
        width: '84%',
        borderRadius: 10,
        borderColor: "#D5D5D5",
        borderWidth: 1,
        // backgroundColor: 'blue'
    },
    dateBar: {
        marginVertical: 15,
        width: '84%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D5D5D5',
        // backgroundColor: 'blue'
    },
    datePickerModalButtonContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: "space-around"
    },
    scrollContentContainer: {
        paddingBottom: 75,
        overflow: "visible",
        // overflow: 'hidden',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    scrollViewStyle: {
        maxHeight: '100%',
        width: '85%'
    }
});
