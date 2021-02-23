
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Sidebar from '../Components/Sidebar.js';
import TrainerCheckpointPage from './TrainerCheckpointPage';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View,TouchableOpacity,Text,Button} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class TrainerCheckpointWithSidebarPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}
        >
            <View style={styles.header}>
                <NameNavBar name = "Charles Wang"/>
            </View>
            <View>
                <TrainerDieticianNavBar/>
            </View>
                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '13.5%', paddingTop: 10 }}>
                        <Sidebar/>
                    </View>
                    <TrainerCheckpointPage session = {6}  />
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
    },
    header:{
        position: 'absolute',
        // top: 50,
        left: 5,
        flexDirection: 'row'
    }

});