
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Sidebar from '../Components/Sidebar.js';
import TrainerCheckpointPage from './TrainerCheckpointPage';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import NameNavBar from '../Components/NameNavBar.js';
import { StyleSheet, View,TouchableOpacity,Text,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrainerSession from './TrainerSession';

const Drawer = createDrawerNavigator();

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
            <View>
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="1" component={ TrainerCheckpointPage } />
                        <Drawer.Screen name="2" component={ TrainerSession } />
                        <Drawer.Screen name="3" component={ TrainerSession } />

                    </Drawer.Navigator>
                </NavigationContainer>
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
        // top: 50,
        left: 5,
        flexDirection: 'row'
    }

});