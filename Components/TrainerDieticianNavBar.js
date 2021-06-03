import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
class TrainerDieticianNavBar extends Component{
    constructor(props){
        super(props);
    }
    pressTrainer = () => {
        this.props.pressTrainer();
    }
    pressDietician = () => {
        this.props.pressDietician();
    }

    render(){
        return(
        <View style = {{flexDirection: 'row'}}>

        <TouchableOpacity style={{borderWidth: 1, borderColor: '#E6E6E6', padding:10}}>
        <Entypo name = {'bar-graph'} size = {30} color = {'#BEBEBE'}/>
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress = {()=>this.pressTrainer()}
        style = 
            {
                {flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center', borderColor: '#E6E6E6',
                borderTopColor: this.props.dietician ? '#e6e6e6' : '#AED804', borderTopWidth: this.props.dietician ? 1 : 3}}>
        <Text style={{fontSize: 18, padding:10, color: this.props.dietician ? '#E6E6E6':'#AED804'}}>Trainer</Text>
        <MaterialCommunityIcons name = {'dumbbell'} size = {20} 
        color={!this.props.dietician ? '#AED804' : '#E6E6E6'}/>
        </TouchableOpacity>

        
        <TouchableOpacity 
                onPress = {()=>this.pressDietician()}

        style = {{flex: .5, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, alignItems: 'center', borderColor: '#E6E6E6',
        borderTopColor: !this.props.dietician ? '#e6e6e6' : '#AED804', borderTopWidth: !this.props.dietician ? 1 : 3}}>

        <Text style = {{fontSize: 18, padding:10, color: !this.props.dietician ? '#E6E6E6':'#AED804'}}>Dietitian</Text>
        <MaterialCommunityIcons name = {'fruit-pineapple'} size = {20} color={this.props.dietician ? '#AED804' : '#E6E6E6'}/>
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
