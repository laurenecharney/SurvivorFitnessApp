import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

class TrainerDieticianNavBar extends Component{
    constructor(props){
        super(props)
    
    }
    render(){
        return(
        <View style = {styles.headline}>

        <TouchableOpacity style={{borderWidth: 1, borderColor: '#E6E6E6', width: 73, height: 64, left: 0, top: 117}}>
            <View style={{ left: 15, top: 12}}>
                <Entypo name = {'bar-graph'} size = {41} color={'#BEBEBE'}/>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center'}}>
        <Text style={{fontSize: '25'}}>Trainer </Text><MaterialCommunityIcons name = {'dumbbell'} size = {30}/>
        </TouchableOpacity>

        
        <TouchableOpacity style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center'}}>

        <Text style = {{fontSize: '25'}}>Dietician</Text><MaterialCommunityIcons name = {'fruit-pineapple'} size = {30}/>
        </TouchableOpacity>
        </View>
        
        );
    }
}

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
export default TrainerDieticianNavBar;