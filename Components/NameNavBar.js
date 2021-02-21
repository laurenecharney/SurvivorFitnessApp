import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



class NameNavBar extends Component{
    constructor(props){
        super(props)
    
    }
    render(){
        return (
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Icon name = {'keyboard-arrow-left'} size = {50} color = {'black'}/>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: .9, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{fontSize: 30}}>Charles Wang</Text>
            </View>
            </View>
        )
    }

}
export default NameNavBar;
