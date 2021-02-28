import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
class TrainerDieticianNavBar extends Component{
    constructor(props){
        super(props)
    
    }
    render(){
        return(
        <View style = {{flexDirection: 'row'}}>

        <TouchableOpacity style={{borderWidth: 1, borderColor: '#E6E6E6' }}>
        <Entypo name = {'bar-graph'} size = {50} color = {'#BEBEBE'}/>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center', borderColor: '#E6E6E6'}}>
        <Text style={{fontSize: '25', color: '#AED804'}}>Trainer</Text><MaterialCommunityIcons name = {'dumbbell'} size = {30} color={'#AED804'}/>
        </TouchableOpacity>

        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center', borderColor: '#E6E6E6'}}>

        <Text style = {{fontSize: '25', color: '#AED804'}}>Dietician</Text><MaterialCommunityIcons name = {'fruit-pineapple'} size = {30} color={'#AED804'}/>
        </TouchableOpacity>
        </View>
        
        );
    }
}

export default TrainerDieticianNavBar;


const styles = StyleSheet.create({
    headline: {
        fontWeight: 'bold',
        // fontSize: 25,
        marginTop: 100,
        flexDirection:'row',
        flexWrap:'wrap',
        flex: 1,
        position: 'absolute',
        width: '100%'

    }});
