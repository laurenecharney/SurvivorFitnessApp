import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';

class TrainerDieticianNavBar extends Component{
    constructor(props){
        super(props)
    
    }
    render(){
        return(
        <View style = {{flexDirection: 'row'}}>

        <TouchableOpacity style={{borderWidth: 1}}>
        <Icon name = {'dashboard'} size = {50}/>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center'}}>
        <Text style={{fontSize: '25'}}>Trainer</Text><MaterialCommunityIcons name = {'dumbbell'} size = {30}/>
        </TouchableOpacity>

        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center'}}>

        <Text style = {{fontSize: '25'}}>Dietician</Text><MaterialCommunityIcons name = {'fruit-pineapple'} size = {30}/>
        </TouchableOpacity>
        </View>
        
        );
    }
}

export default TrainerDieticianNavBar;