// Call this LogSessionPage

import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import { SessionLogger } from '../Components/SessionLogger.js';
import { getParticipantSessions } from "../APIServices/APIUtilities";
import { getCurrentRole } from '../APIServices/deviceStorage.js';

export default class TrainerDieticianSessionWithSidebarPage extends Component{

    constructor(props){
        super(props);
        this.state={
            user: "",
            currentView: "",
            numTrainerSessions: 24,
            trainerSessionsArray:  [
            ],
            
            numDieticianSessions: 3,
            dieticianSessionsArray: [
                ],
            sessionTrainer: 1,
            sessionDietician: 1,
            numSessions: 24,
            addSessionArray:  [
                {id: 1, name: '+'}
            ],
            currentSession: 1,
            sessionData: {"trainerSessions": [], "dietitianSessions": []},
            refreshFlag: false
        }
        this.refreshSidebar = this.refreshSidebar.bind(this);
        this.fetchSessions = this.fetchSessions.bind(this);
        this.showLoggedSessionInSidebar = this.showLoggedSessionInSidebar.bind(this);
    }

    changeView = (sessionType) => {
        this.refreshSidebar();
        this.setState({currentView: sessionType})

    }

    resetRefreshFlag() {
        this.setState({refreshFlag: false});
    }

     updateSession(newSession){
        let mostRecentLogged = this.findMostRecentLoggedSession();

        // let mostRecentLogged = this.state.dietician ? this.state.dieticianSessionsArray.findIndex(i => i.logged === false) : this.state.trainerSessionsArray.findIndex(i => i.logged === false);
        if(!(newSession.logged || (newSession.name == (mostRecentLogged + 1)))){
            Alert.alert(
                "Session " + newSession.name + " Has Not Been Logged",
                ("Please Select Session " + (mostRecentLogged + 1)  + " to log a new session"),
            );
        }else{
            if (this.state.currentView === "DIETITIAN"){
                this.setState({sessionDietician:newSession.name})// or with es6 this.setState({name})
                let indexPrevHighlight = this.state.dieticianSessionsArray.findIndex(i => i.highlighted === true);
                this.state.dieticianSessionsArray[indexPrevHighlight].highlighted = false;
                this.state.dieticianSessionsArray[newSession.name - 1].highlighted = true;
            } else if (this.state.currentView === "TRAINER"){
                this.setState({sessionTrainer:newSession.name})// or with es6 this.setState({name})
                let indexPrevHighlight = this.state.trainerSessionsArray.findIndex(i => i.highlighted === true);
                this.state.trainerSessionsArray[indexPrevHighlight].highlighted = false;
                this.state.trainerSessionsArray[newSession.name - 1].highlighted = true;
            }
        }
     }

    addSessionDietician(){
        this.setState({numDieticianSessions: this.state.numDieticianSessions + 1})
        var joined = this.state.dieticianSessionsArray.concat({id: this.state.numDieticianSessions, name: this.state.numDieticianSessions.toString()});
        this.setState({ dieticianSessionsArray: joined })
    }

    addSessionTrainer(){
        this.setState({numTrainerSessions: this.state.numTrainerSessions + 1})
        var joined = this.state.trainerSessionsArray.concat({id: this.state.numTrainerSessions, name: this.state.numTrainerSessions.toString()});
        this.setState({ trainerSessionsArray: joined })
    }

    isCheckpoint(sessionNum){
        return sessionNum == 1 || sessionNum == 12 || sessionNum == 24;
    }

    getDataBySessionNumber = () => {
        let sessionType;
        let num;
        if (this.state.currentView === "DIETITIAN") {
            sessionType = "dietitianSessions";
            num = this.state.sessionDietician;
        } else if (this.state.currentView === "TRAINER") {
            sessionType = "trainerSessions";
            num = this.state.sessionTrainer;
        } else {
            sessionType = "";
            num = -1;
        }
        
        if(!this.state.sessionData[sessionType]) {
            console.log("Error: sessionData for trainers or dietitians does not exist.")
            console.log(this.state.sessionData[sessionType], "\n^sessionData")
            return [];
        } else if (this.state.sessionData[sessionType][num - 1]) {
            return this.state.sessionData[sessionType][num - 1];
        } else {
            console.log("Couldn't find measurements for session with index " + num.toString());
            return [];
        }
    }

    findMostRecentLoggedSession = () => {
        if (this.state.currentView == "DIETITIAN") {
            return this.state.dieticianSessionsArray.findIndex(i => i.logged === false);
        } else if (this.state.currentView == "TRAINER") {
            return this.state.trainerSessionsArray.findIndex(i => i.logged === false);
        } else {
            return -1;
        }
    }

    // fill out <specialist>SessionsArray based on raw data from backend
    formatSessions(rawSessionsArray){
        let nextToLog = -1;
        let sessionType = "";
        if (this.state.currentView == "DIETITIAN") {
            sessionType = "dietitianSessions";
            
        } else if (this.state.currentView == "TRAINER") {
            sessionType = "trainerSessions";
        }

        let numSessions = rawSessionsArray[sessionType].length;
        for(let i = 0; i < numSessions; i++){
            let isHighlighted = false;
            let hasLogDate = (rawSessionsArray[sessionType][i]['initialLogDate']) != null;

            // find the next session to log
            if (!hasLogDate && nextToLog == -1){
                isHighlighted = true
                if(this.state.currentView === "DIETITIAN"){
                    this.setState({sessionDietician: i + 1 })
                }else if (this.state.currentView === "TRAINER"){
                    this.setState({sessionTrainer: i + 1 })
                } else {
                    console.log("Error: currentView is neither dietician nor trainer.")
                }
                nextToLog = i + 1;
            }

            
            // add new session object to <specialist>SessionsArray 
            let sessionId = rawSessionsArray[sessionType][i]['sessionIndexNumber'];
            if (this.state.currentView === "DIETITIAN") {
                this.setState({ dieticianSessionsArray: [...this.state.dieticianSessionsArray, {id: sessionId, name: sessionId.toString(), logged: hasLogDate, highlighted: isHighlighted}] });
                if (i == numSessions - 1 && nextToLog == -1) {
                    // if all sessions have been logged, highlight the first session
                    let tempSessionsArray = JSON.parse(JSON.stringify(this.state.dieticianSessionsArray));
                    tempSessionsArray[0].highlighted = true;
                    this.setState({ dieticianSessionsArray: tempSessionsArray });
                }
                
            } else if (this.state.currentView === "TRAINER") {
                this.setState({ trainerSessionsArray: [...this.state.trainerSessionsArray, {id: sessionId, name: sessionId.toString(), logged: hasLogDate, highlighted: isHighlighted}] });
                // if all sessions have been logged, highlight the first session
                if (i == numSessions - 1 && nextToLog == -1) {
                    let tempSessionsArray = JSON.parse(JSON.stringify(this.state.trainerSessionsArray));
                    tempSessionsArray[0].highlighted = true;                    
                    this.setState({ trainerSessionsArray: tempSessionsArray });
                }
            }    

       }
    }

    // can we combine these next two ??????
    async refreshSidebar() {
        const rawSessions = await this.fetchSessions();
        if (this.state.currentView === "DIETITIAN") {
            this.setState({dieticianSessionsArray: []})
        } else if (this.state.currentView === "TRAINER") {
            this.setState({trainerSessionsArray: []})
        }
        this.formatSessions(rawSessions);

    }


    // called after a session is logged or updated
    showLoggedSessionInSidebar(sessionNum, previouslyLogged){
        // call fetch sessions so the data that was recently updated in the sessionLogger is refelected in the state
        // of the logSessionPage
        this.fetchSessions();
        if (!previouslyLogged) {
            if (this.state.currentView === "DIETITIAN") {
                let temp = this.state.dieticianSessionsArray;
                temp[sessionNum - 1].logged =  {id: sessionNum, name: sessionNum.toString(), logged: true, highlighted: true};
                this.setState({dieticianSessionsArray: temp})
            } else if (this.state.currentView === "TRAINER") {
                let temp = this.state.trainerSessionsArray;
                temp[sessionNum - 1] = {id: sessionNum, name: sessionNum.toString(), logged: true, highlighted: true};
                this.setState({trainerSessionsArray: temp})
            }
        } // else, if the session was previously logged, the sidebar remains the exact same
        
    }

    async fetchSessions() {
        try {
            let res = await getParticipantSessions(this.props.route.params.id);
            if (!res["trainerSessions"]) {
                console.log("trainersession data does not exist")
            }
            this.setState({sessionData: res});
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        const role = JSON.parse(await getCurrentRole());
        this.setState({user: role});

        if (role == "SUPER_ADMIN") {
            this.setState({currentView: "DIETITIAN"});
        } else if(role === "TRAINER" || role === "DIETITIAN") {
            this.setState({currentView: role});
        } else if (role === "LOCATION_ADMINISTRATOR") {
            this.setState({currentView: "TRAINER"});
        } else {
            this.setState({currentView: ""});
            console.log("Error: role is neither dietitian nor trainer nor super-admin.")
        }

        const rawSessions = await this.fetchSessions();
        // console.log(rawSessions, "\n^rawSessions");
        this.formatSessions(rawSessions);
    }

    shouldBeDisabled() {
        return (this.state.user != this.state.currentView) || (this.state.user == "SUPER_ADMIN");
    }

    render(){
        return(
            <View style={styles.container}>           
                <View style={styles.header}>         
                    <NameNavBar 
                        name = {this.props.route.params.name ? this.props.route.params.name: "No Name Found"}
                        goBack={()=>this.props.navigation.goBack()}/>
                
                </View>
                <View>
                    <TrainerDieticianNavBar
                        pressTrainer = {()=>this.changeView("TRAINER")}
                        pressDietician = {()=>this.changeView("DIETITIAN")}
                        dietician={this.state.currentView === "DIETITIAN"}
                        />
                </View>
                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '15%' }}>
                    {this.state.currentView === "DIETITIAN" ? 
                        <Sidebar
                            updateSession = {newSession => this.updateSession(newSession)}
                            sessionsArray = {this.state.dieticianSessionsArray}
                            addSessionArray = {this.state.addSessionArray}
                            addSession = {()=>this.addSessionDietician()}
                            fetchSessions = {() =>this.fetchSessions()}
                            test = {this.state.test}
                            refreshFlag = {this.state.refreshFlag}
                            resetRefreshFlag = {()=>this.setState({refreshFlag: false})}

                        />
                        :

                        <Sidebar
                            updateSession={newSession => this.updateSession(newSession)}
                            sessionsArray = {this.state.trainerSessionsArray}
                            addSessionArray = {this.state.addSessionArray}
                            addSession = {()=>this.addSessionTrainer()}
                            fetchSessions = {() =>this.fetchSessions()}
                            test = {this.state.test}
                            refreshFlag = {this.state.refreshFlag}
                            resetRefreshFlag = {()=>this.setState({refreshFlag: false})}
                        />
                    }
                    </View>
                        <SessionLogger 
                            isCheckpoint={this.isCheckpoint(this.state.sessionTrainer)} 
                            initSessionData = {this.getDataBySessionNumber()}
                            currentView = {this.state.currentView}
                            isDisabled={this.shouldBeDisabled()}
                            showLoggedSessionInSidebar={this.showLoggedSessionInSidebar}
                            refreshMeasurements={this.fetchSessions}
                        /> 
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:2,
        paddingTop:100,
        backgroundColor:'#fff',
        justifyContent: 'flex-start',
        borderColor: "#E6E6E6"
    },
    header:{
        position: 'absolute',
        left: 5,
        flexDirection: 'row',
    }

});