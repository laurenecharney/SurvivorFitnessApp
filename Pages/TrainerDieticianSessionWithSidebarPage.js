
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Sidebar from '../Components/Sidebar.js';
import TrainerSession from './TrainerSession.js';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View,TouchableOpacity,Text,Button} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import SidebarDietician from '../Components/SidebarDietician';
import DieticianSession from './DieticianSession';

export default class TrainerDieticianSessionWithSidebarPage extends Component{
    constructor(props){
        super(props);
        this.state={
            session: 1,
            dietician: false,
            numTrainerSessions: 3,
            numDieticianSessions: 24
        }
    }

    pressTrainer = ()=>{
        this.setState({dietician: false});
    }
    pressDietician = ()=>{
        this.setState({dietician: true});
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
                    <SidebarDietician/>}
                    {!this.state.dietician && <Sidebar/>}
                    </View>
                    {!this.state.dietician && 
                    <TrainerSession session={6}/>
                    }
                    {this.state.dietician && 
                    <DieticianSession session={6}/>
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