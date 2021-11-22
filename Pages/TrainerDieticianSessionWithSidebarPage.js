// Call this LogSessionPage

import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
import TrainerSession from './TrainerSession.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View} from 'react-native';
import TrainerCheckpointPage from './TrainerCheckpointPage.js';
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
            trainerSessionsArray:  [],
            numDieticianSessions: 3,
            dieticianSessionsArray: [],
            sessionTrainer: 1,
            sessionDietician: 1,
            addSessionArray:  [
                {id: 1, name: '+'}
            ],
            sessionData: [],
        }
        for (let i = 1; i <= this.state.numTrainerSessions; ++i){
            this.state.trainerSessionsArray.push({id: i, name: i.toString()})
        }
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

     async fetchSessions() {
        try {
            console.log("route param id: "+this.props.route.params.id);
            let res = getParticipantSessions(this.props.route.params.id);
            this.setState({sessionData: JSON.parse(res)});
            //console.log(this.state.sessionData);
            console.log("successfully retrived session data");
        } catch (e) {
            console.log("error in fetchSessions()")
            //console.log(e);
            //alert("Could not fetch participant session data");
        }
        for(let i = 0; i < this.state.sessionData.trainerSessions.length; ++i) {
            if(isCheckpoint(num) && 
                    num == this.state.sessionData.trainerSessions[i].sessionIndexNumber && 
                    this.state.sessionData.trainerSessions[i]) {
                console.log("returning session "+num+": "+this.state.sessionData.trainerSessions[i])
                return this.state.sessionData.trainerSessions[i];
            }
        }
        console.log("Couldn't find measurements for session with index " + num.toString());
        return [];
    }

     async componentDidMount() {
        await this.fetchSessions();
     }

     getMeasurementsBySessionNumber = (num) => {
        if(!this.state.sessionData.trainerSessions) {
            console.log()
            console.log("array is undefined. ");
            return [];
        } else if(this.state.sessionData.trainerSessions == 0) {
            console.log("Empty array");
            return [];
        }
        for(let i = 0; i < this.state.sessionData.trainerSessions.length; ++i) {
            if(isCheckpoint(num) && 
                    num == this.state.sessionData.trainerSessions[i].sessionIndexNumber && 
                    this.state.sessionData.trainerSessions[i].measurements) {
                        console.log("returning session "+num+" measurements: "+this.state.sessionData.trainerSessions[i].measurements)
                return this.state.sessionData.trainerSessions[i].measurements;
            }
        }
        console.log("Couldn't find measurements for session with index " + num.toString());
        return [];
     }

    render(){
        return(
            <View style={styles.container}
            
            >
                <View style={styles.header}>
                    <NameNavBar name = {this.props.route.params.name ? this.props.route.params.name: "No Name Found"}
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
                            sessionData = {this.getDataBySessionNumber(this.state.sessionTrainer)}
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