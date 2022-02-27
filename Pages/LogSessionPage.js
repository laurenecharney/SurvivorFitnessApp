// Call this LogSessionPage

import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
// import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import { SessionLogger } from '../Components/SessionLogger.js';
import { getParticipantSessions } from "../APIServices/APIUtilities";

// LogSessionPage
    // sideBarComponent
    // TrainerDieticianHeader
    // LogSessionComponent

export default class TrainerDieticianSessionWithSidebarPage extends Component{
    constructor(props){
        super(props);
        this.state={
            dietician: false,
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
        // for (let i = 1; i <= this.state.numTrainerSessions; ++i){
        //     this.state.trainerSessionsArray.push({id: i, name: i.toString()})
        // }
        for (let i = 1; i <= this.state.numDieticianSessions; ++i){
            this.state.dieticianSessionsArray.push({id: i, name: i.toString()})
        }
        this.showLoggedSessionInSidebar = this.showLoggedSessionInSidebar.bind(this);
    }

    pressTrainer = ()=>{
        this.setState({dietician: false});
    }
    pressDietician = ()=>{
        this.setState({dietician: true});
    }

    resetRefreshFlag() {
        this.setState({refreshFlag: false});
    }

    // gets called when the user presses a session number on the sidebar
     updateSessionTrainer(newSessionTrainer){
        let mostRecentLogged = this.state.trainerSessionsArray.findIndex(i => i.logged === false);
        // 
        if(!(newSessionTrainer.logged || (newSessionTrainer.name == (mostRecentLogged + 1)))){
            Alert.alert(
                "Session " + newSessionTrainer.name + " Has Not Been Logged",
                ("Please Select Session " + (mostRecentLogged + 1)  + " to log a new session"),
            );
        }else{
            // sessionTrainer is the session number reflected in the sessionLogger
            this.setState({sessionTrainer:newSessionTrainer.name})// or with es6 this.setState({name})
            let indexPrevHighlight = this.state.trainerSessionsArray.findIndex(i => i.highlighted === true);
            this.state.trainerSessionsArray[indexPrevHighlight].highlighted = false;
            this.state.trainerSessionsArray[newSessionTrainer.name - 1].highlighted = true;
        }
     }

    updateSessionDietician(sessionDietician){
        this.setState({sessionDietician: sessionDietician})// or with es6 this.setState({name})
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

    getDataBySessionNumber = (num) => {
        let currentSessionData = []
        if(!this.state.sessionData.trainerSessions) {
            console.log("Error: sessionData.trainerSessions does not exist.")
            return [];
        }
        for(let i = 0; i < this.state.sessionData.trainerSessions.length; ++i) {
            if(this.isCheckpoint(num) && 
                    num == this.state.sessionData.trainerSessions[i].sessionIndexNumber && 
                    this.state.sessionData.trainerSessions[i]) {
            
                return this.state.sessionData.trainerSessions[i];
            } else if (
                num == this.state.sessionData.trainerSessions[i].sessionIndexNumber && 
                this.state.sessionData.trainerSessions[i])
                {
                    return this.state.sessionData.trainerSessions[i];
            }
        }
        console.log("Couldn't find measurements for session with index " + num.toString());
        return [];
    }

    // formats the sidebar
    formatSessions(rawSessionsArray){
        let nextToLog = -1;
        let numSessions = rawSessionsArray['trainerSessions'].length;
        for(let i = 0; i < numSessions; i++){    // for each session
            let isHighlighted = false;
            let hasLogDate = (rawSessionsArray['trainerSessions'][i]['initialLogDate']) != null;

            // if the session is not logged and there are unlogged sessions, highlight it
            if (!hasLogDate && nextToLog == -1){
                isHighlighted = true
                nextToLog = i + 1;
                // dictates what session the sessionLogger will start at
                this.setState({sessionTrainer: i + 1 })
            } else if (hasLogDate && i === numSessions - 1) {
                isHighlighted = true;   // if all sessions are logged, show the last one
                this.setState({ sessionTrainer: i + 1})
            }
            
           let sessionId = rawSessionsArray['trainerSessions'][i]['sessionIndexNumber']; 
           this.setState({ trainerSessionsArray: [...this.state.trainerSessionsArray, {id: sessionId, name: sessionId.toString(), logged: hasLogDate, highlighted: isHighlighted}] });
       }
    }

    // called after a session is logged or updated
    showLoggedSessionInSidebar(sessionNum, previouslyLogged){
        // call fetch sessions so the data that was recently updated in the sessionLogger is refelected in the state
        // of the logSessionPage
        this.fetchSessions();
        if (!previouslyLogged) {
            let temp = this.state.trainerSessionsArray;
            temp[sessionNum - 1] = {id: sessionNum, name: sessionNum.toString(), logged: true, highlighted: true};
            this.setState({trainerSessionsArray: temp})
        } // else, if the session was previously logged, the sidebar remains the exact same
        
    }

    async fetchSessions() {
        try {
            let res = await getParticipantSessions(this.props.route.params.id);
            this.setState({sessionData: res});
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        const rawSessions = await this.fetchSessions();
        this.formatSessions(rawSessions);
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
                        pressTrainer = {()=>this.pressTrainer()}
                        pressDietician = {()=>this.pressDietician()}
                        dietician={this.state.dietician}
                        />
                </View>
                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '15%' }}>
                    {this.state.dietician ? 
                        <Sidebar
                            updateSession = {newSession => this.updateSessionDietician(newSession)}
                            sessionsArray = {this.state.dieticianSessionsArray}
                            addSessionArray = {this.state.addSessionArray}
                            addSession = {()=>this.addSessionDietician()}
                        />
                        :

                        <Sidebar
                            updateSession={newSession=>this.updateSessionTrainer(newSession)}
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
                            initSessionData = {this.getDataBySessionNumber(this.state.sessionTrainer)}
                            trainerSessionSelected={!this.state.dietician}
                            showLoggedSessionInSidebar={this.showLoggedSessionInSidebar}
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