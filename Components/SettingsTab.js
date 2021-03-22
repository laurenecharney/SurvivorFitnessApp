import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class NameNavBarComponent extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View style={styles.headline}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: .9, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{fontSize: 20, color: '#3E3E3E'}}>{this.props.name}</Text>
            <Icon name = {'keyboard-arrow-right'} size = {50} color = {'#BEBEBE'}/>
            </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    headline: {
        fontWeight: 'bold',
        marginTop: 45,
        color: '#3E3E3E',
        flexDirection:'row',
        flexWrap:'wrap',
        flex: 1,
        opacity: 1,
        zIndex: 15,
        borderBottomColor: '#BEBEBE',
        borderBottomWidth: 1
    }
});
