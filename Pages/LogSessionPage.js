// Call this LogSessionPage

import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
// import TrainerSession from './TrainerSession.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
// import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import { SessionLogger } from '../Components/SessionLogger.js';
import { getParticipantSessions } from "../APIServices/APIUtilities";
import { getCurrentRole } from '../APIServices/deviceStorage.js';

// LogSessionPage
    // sideBarComponent
    // TrainerDieticianHeader
    // LogSessionComponent

export default class TrainerDieticianSessionWithSidebarPage extends Component{

    constructor(props){
        super(props);
        this.state={
            user: "",
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
        //for (let i = 1; i <= this.state.numDieticianSessions; ++i){
         //   this.state.dieticianSessionsArray.push({id: i, name: i.toString()})
        //}
        this.refreshSidebar = this.refreshSidebar.bind(this);
        for (let i = 1; i <= this.state.numDieticianSessions; ++i){
            this.state.dieticianSessionsArray.push({id: i, name: i.toString()})
        }
        this.showLoggedSessionInSidebar = this.showLoggedSessionInSidebar.bind(this);
    }

    pressTrainer = ()=>{
        if(this.state.dietician && !(this.state.user == "SUPER_ADMIN"))
        {
            Alert.alert(
                "View Only Permission",
                ("Please log in using a trainer account to edit this information."),
            );
        }
        this.refreshSidebar();
        this.setState({dietician: false});
    }
    pressDietician = ()=>{
        if((!this.state.dietician) && !(this.state.user == "SUPER_ADMIN"))
        {
            Alert.alert(
                "View Only Permission",
                ("Please log in using a dietitian account to edit this information."),
            );
        }
        this.refreshSidebar();
        this.setState({dietician: true});
    }

    resetRefreshFlag() {
        this.setState({refreshFlag: false});
    }

     updateSession(newSession){
        let mostRecentLogged = this.state.dietician ? this.state.dieticianSessionsArray.findIndex(i => i.logged === false) : this.state.trainerSessionsArray.findIndex(i => i.logged === false);
        if(!(newSession.logged || (newSession.name == (mostRecentLogged + 1)))){
            Alert.alert(
                "Session " + newSession.name + " Has Not Been Logged",
                ("Please Select Session " + (mostRecentLogged + 1)  + " to log a new session"),
            );
        }else{
            if(this.state.dietician){
                this.setState({sessionDietician:newSession.name})// or with es6 this.setState({name})
                let indexPrevHighlight = this.state.dieticianSessionsArray.findIndex(i => i.highlighted === true);
                this.state.dieticianSessionsArray[indexPrevHighlight].highlighted = false;
                this.state.dieticianSessionsArray[newSession.name - 1].highlighted = true;
            }else{
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

    getTrainerDataBySessionNumber = (num) => {
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

    getDietitianDataBySessionNumber = (num) => {
        let currentSessionData = []
        if(!this.state.sessionData.dietitianSessions) {
            console.log("Error: sessionData.dietitianSessions does not exist.")
            return [];
        }
        for(let i = 0; i < this.state.sessionData.dietitianSessions.length; ++i) {
            if (
                num == this.state.sessionData.dietitianSessions[i].sessionIndexNumber && 
                this.state.sessionData.dietitianSessions[i])
            {
                return this.state.sessionData.dietitianSessions[i];
            }
        }
        console.log("Couldn't find measurements for session with index " + num.toString());
        return [];
    }

    formatSessions(rawSessionsArray){
        let nextToLog = -1;
        let sessionType = this.state.dietician ? "dietitianSessions" : "trainerSessions"; 
        let numSessions = rawSessionsArray[sessionType].length;
        for(let i = 0; i < numSessions; i++){
            let mostRecentLogged = this.state.dietician ? this.state.dieticianSessionsArray.findIndex(i => i.logged === false) : this.state.trainerSessionsArray.findIndex(i => i.logged === false);
            let isHighlighted = false;
            let hasLogDate = (rawSessionsArray[sessionType][i]['initialLogDate']) != null;

            // if the session is not logged and there are unlogged sessions, highlight it
            if (!hasLogDate && nextToLog == -1){
                isHighlighted = true
                if(this.state.dietician){
                    this.setState({sessionDietician: i + 1 })
                }else{
                    this.setState({sessionTrainer: i + 1 })
                }
                nextToLog = i + 1;
            }
            
            let sessionId = rawSessionsArray[sessionType][i]['sessionIndexNumber'];
            if(this.state.dietician){
                this.setState({ dieticianSessionsArray: [...this.state.dieticianSessionsArray, {id: sessionId, name: sessionId.toString(), logged: hasLogDate, highlighted: isHighlighted}] });
            }else{
                this.setState({ trainerSessionsArray: [...this.state.trainerSessionsArray, {id: sessionId, name: sessionId.toString(), logged: hasLogDate, highlighted: isHighlighted}] });
            }              
       }
    }

    /// do we need both of these ???????
    async refreshSidebar() {
        const rawSessions = await this.fetchSessions();
        if(this.state.dietician)
        {
            this.setState({dieticianSessionsArray: []})
        }else{
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
        const role = await getCurrentRole();
        this.setState({user: role});
        this.setState({dietician: (role == "DIETITIAN")});
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
                            initSessionData = {this.state.dietician ? this.getDietitianDataBySessionNumber(this.state.sessionDietician) : this.getTrainerDataBySessionNumber(this.state.sessionTrainer)}
                            trainerSessionSelected={!this.state.dietician}
                            refreshSidebar={this.refreshSidebar}
                            isDisabled={((this.state.user == "DIETITIAN" && !this.state.dietician) || (this.state.user == "TRAINER" && this.state.dietician)) && (this.state.user != 'SUPER_ADMIN')}
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