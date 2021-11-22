// Call this LogSessionPage

import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
// import TrainerSession from './TrainerSession.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View} from 'react-native';
// import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import { SessionLogger } from '../Components/SessionLogger.js';
import SidebarDietician from '../Components/SidebarDietician';
import DieticianSession from './DieticianSession';
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
                {id: 1, name: '1', logged: false, highlighted: true},
                {id: 2, name: '2', logged: false, highlighted: false},
                {id: 3, name: '3', logged: false, highlighted: false},
                {id: 4, name: '4', logged: false, highlighted: false},
                {id: 5, name: '5', logged: false, highlighted: false},
                {id: 6, name: '6', logged: false, highlighted: false},
                {id: 7, name: '7', logged: false, highlighted: false},
                {id: 8, name: '8', logged: false, highlighted: false},
                {id: 9, name: '9', logged: false, highlighted: false},
                {id: 10, name: '10', logged: false, highlighted: false},
                {id: 11, name: '11', logged: false, highlighted: false},
                {id: 12, name: '12', logged: false, highlighted: false},
                {id: 13, name: '13', logged: false, highlighted: false},
                {id: 14, name: '14', logged: false, highlighted: false},
                {id: 15, name: '15', logged: false, highlighted: false},
                {id: 16, name: '16', logged: false, highlighted: false},
                {id: 17, name: '17', logged: false, highlighted: false}
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
            sessionData: {"trainerSessions": [], "dietitianSessions": []}
        }
        // for (let i = 1; i <= this.state.numTrainerSessions; ++i){
        //     this.state.trainerSessionsArray.push({id: i, name: i.toString()})
        // }
        for (let i = 1; i <= this.state.numDieticianSessions; ++i){
            this.state.dieticianSessionsArray.push({id: i, name: i.toString()})
        }
    }

    pressTrainer = ()=>{
        this.setState({dietician: false});
    }
    pressDietician = ()=>{
        this.setState({dietician: true});
    }
    updateSessionTrainer(newSessionTrainer){
        this.setState({sessionTrainer: newSessionTrainer})// or with es6 this.setState({name})
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
        if(!this.state.sessionData.trainerSessions) {
            console.log("Error: sessionData.trainerSessions does not exist.")
            return [];
        }
        for(let i = 0; i < this.state.sessionData.trainerSessions.length; ++i) {
            if(this.isCheckpoint(num) && 
                    num == this.state.sessionData.trainerSessions[i].sessionIndexNumber && 
                    this.state.sessionData.trainerSessions[i]) {
                console.log("returning session "+num+": "+this.state.sessionData.trainerSessions[i])
                return this.state.sessionData.trainerSessions[i];
            }
        }
        console.log("Couldn't find measurements for session with index " + num.toString());
        return [];
    }

    async fetchSessions() {
        try {
            let res = await getParticipantSessions(this.props.route.params.id);
            this.setState({sessionData: res});
        } catch (e) {
            console.log(e);
            // alert("Could not fetch participant session data");
        }
    }

    async componentDidMount() {
        await this.fetchSessions();
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
                        />
                    }
                    </View>
                    {/* <TrainerCheckpointPage session = {this.state.sessionTrainer}
                    isCheckpoint={this.isCheckpoint(this.state.sessionTrainer)} 
                    sessionData={this.state.sessions ? this.state.sessions[0] : null}
                    trainerSessionSelected={!this.state.dietician}/> */}
                        <SessionLogger 
                            //session = {this.state.sessionTrainer}
                            isCheckpoint={this.isCheckpoint(this.state.sessionTrainer)} 
                            initSessionData = {this.getDataBySessionNumber(this.state.sessionTrainer)}
                            //sessionData={this.state.sessionData ? this.state.sessionData[0] : null}
                            trainerSessionSelected={!this.state.dietician}
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