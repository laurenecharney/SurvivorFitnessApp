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
import { updateSession } from '../APIServices/APIUtilities';
import { Measurements } from "./Measurements";
import { logTrainerSession } from '../APIServices/APIUtilities';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

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

const ConfirmButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.confirmButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const SessionLogger = ({isCheckpoint, initSessionData, trainerSessionSelected, refreshSidebar}) => {
    const [user, setUser] = useState({});
    const [isDateConfirmModalVisible, setIsDateConfirmModalVisible] = useState(false);
    const [sessionDate, setSessionDate] = useState(new Date());
    const [newSessionDate, setNewSessionDate] = useState(new Date());
    const [timePickerWidth, setTimePickerWidth] = useState(125);
    const [logged, setLogged] = useState(false)
    const [measurementData, setMeasurementData] = useState([])
    // const [sessionData, setSessionData] = useState([])
    const [measurementsChanged, setMeasurementsChanged] = useState(false)

    //called by Measurements component when a measurement is updated
    //will be called on unmount if not already logged
    const callUpdateSession = (updatedMeasurements) => {
        // setMeasurementsChanged(true);
        // let temp = initSessionData;
        // if (temp != null) {
        //     temp.session.measurements = updatedMeasurements;
        //     setSessionData(temp);
        // }
    }

    //calls API utilities updateSession
    async function logSession() {
        if (!isCheckpoint || !measurementData) {
            const dateMilliseconds = sessionDate.getTime()
            try {
                let res = await logTrainerSession(initSessionData, dateMilliseconds)
                setLogged(true);
                showSessionInfo(res);
                refreshSidebar();
            } catch(e) {
                console.log("session cannot be logged: ", e);
            }
        } else {
            const dateMilliseconds = sessionDate.getTime()
            let tempSessionData = initSessionData;
            tempSessionData.measurements = measurementData;
            let res = await logTrainerSession(tempSessionData, dateMilliseconds)
            setLogged(true);
            showSessionInfo(res);
            refreshSidebar();
        }
    }

    async function fetchUser() {
        const res = await getUser()
        setUser(JSON.parse(res))
    }

    const showSessionInfo = (newSessionData = null) => {
        if (newSessionData == null) {
            newSessionData = initSessionData;
        }
        if (newSessionData.lastUpdatedDate) {
            const dateVal = parseInt(newSessionData.initialLogDate);
            let tempDate = new Date(dateVal)
            setSessionDate(tempDate)
            setTimePickerWidth(115 + 10 * (tempDate.getDate() < 10? 0 : 1))
            setLogged(true)
        } else {
            setLogged(false)
        }
    }

    const updateMeasurementData = (newMeasurementData) => {
        setMeasurementData(newMeasurementData);
    }

    useEffect(() => {
        // this React lifecycle hook gets called when the component is first loaded
        // and when initSessionData is changed. It essentially waits
        // for the async call to get the ParticipantSessions to complete
        if (initSessionData) { 
            showSessionInfo()
        } else {
            console.log("Data not ready yet")
        }
    }, [initSessionData]);

    return(
        <View style = {styles.container}>
            <ScrollView 
                contentContainerStyle = {styles.scrollContentContainer}
                style={styles.scrollViewStyle}
            >
                <View style={{paddingTop: 20}}>
                    <Text style={styles.loggedText}>
                        {"Session "+initSessionData.sessionIndexNumber+ (logged ? " Saved" : " Unsaved")}
                        </Text>
                </View>
                <TouchableOpacity
                    style={styles.dateBar}
                    onPress={() => {setIsDateConfirmModalVisible(true);}}
                >
                    <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style = {{margin: 15, fontSize: 15}}>
                        {sessionDate.toLocaleDateString('en-US', {weekday: 'short', month: 'long', day: 'numeric'})}
                    </Text>
                    <Text style = {{margin: 15, color: '#AED804', fontWeight: 'bold', fontSize: 12}}>
                        {'Change'}
                    </Text>
                    </View>
                </TouchableOpacity>
            {
                (trainerSessionSelected && isCheckpoint) &&
                <Measurements measurementData={initSessionData.measurements}
                updateMeasurementData={updateMeasurementData}
                callUpdateSession={callUpdateSession()}/>
            }
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
                        <View style={{backgroundColor: "#fff", width: "90%", height: "52%", borderRadius: "19", alignItems: "center", justifyContent: 'space-around'}}>
                            <View style={{flex: 1, width: '100%'}}>
                                <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center" }}>
                                    <Text style={styles.heading}> {"Select Date"} </Text>
                                        <DateTimePicker
                                            style={{width: 300}}
                                            value={newSessionDate}
                                            mode="date"
                                            display="spinner"
                                            onChange={(event, enteredDate) => {
                                                setNewSessionDate(enteredDate)
                                            }}
                                            />
                                    <View style={styles.datePickerModalButtonContainer}>
                                        <SmallAppButton
                                            title={"Confirm"}
                                            onPress={() => {
                                                setIsDateConfirmModalVisible(false);
                                                setLogged(false);
                                                setSessionDate(newSessionDate);
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
            </ScrollView>
            <View style={{margin: 13, width: '88%', justifyContent: "center"}}>
                <ConfirmButton
                    title={"Log Session"}
                    onPress={() => {
                        logSession(newSessionDate);
                    }}
                />
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
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
        paddingHorizontal: '12%',
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        alignSelf: "center",
    },
    confirmButtonContainer: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: '12%',
        width: '88%',
    },
    dateBar: {
        marginTop: 20,
        marginBottom: -20,
        width: '90%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    datePickerModalButtonContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: "space-around"
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
