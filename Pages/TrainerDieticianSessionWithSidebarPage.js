
import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar.js';
import TrainerSession from './TrainerSession.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View} from 'react-native';
import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import SidebarDietician from '../Components/SidebarDietician';
import DieticianSession from './DieticianSession';

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
            ]
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
        this.setState({sessionTrainer:newSessionTrainer})// or with es6 this.setState({name})
     }



     updateSessionDietician(sessionDietician){
        this.setState({sessionDietician:sessionDietician})// or with es6 this.setState({name})
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

    render(){
        return(
            <View style={styles.container}
            
            >
                <View style={styles.header}>
                    <NameNavBar name = "Alicia Yang"/>
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
                    <View style={{ width: '13.5%', paddingTop: 10 }}>
                    {this.state.dietician && 
                    <SidebarDietician
                        updateSession = {newSession => this.updateSessionDietician(newSession)}
                        sessionsArray = {this.state.dieticianSessionsArray}
                        addSessionArray = {this.state.addSessionArray}
                        addSession = {()=>this.addSessionDietician()}
                    />}
                    {!this.state.dietician && <Sidebar
                    updateSession={newSession=>this.updateSessionTrainer(newSession)}
                    sessionsArray = {this.state.trainerSessionsArray}
                    addSessionArray = {this.state.addSessionArray}
                    addSession = {()=>this.addSessionTrainer()}
                    />}
                    </View>
                    {!this.state.dietician && (
                        this.state.sessionTrainer % 12 == 0 || this.state.sessionTrainer == 1 ?
                        <TrainerCheckpointPage session = {this.state.sessionTrainer}/> 
                        : <TrainerSession session = {this.state.sessionTrainer}/>

                    )
                    }

                    {this.state.dietician && 
                    <DieticianSession session={this.state.sessionDietician}/>
                    }
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