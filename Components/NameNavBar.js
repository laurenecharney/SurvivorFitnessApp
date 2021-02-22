import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView ,TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class NameNavBarComponent extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View style={styles.headline}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Icon name = {'keyboard-arrow-left'} size = {50} color = {'black'}/>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: .9, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{fontSize: 30}}>{this.props.name}</Text>
            </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        position: 'absolute',
        marginTop: 45,
        marginLeft: 0,
        color: '#3E3E3E',
        flexDirection:'row',
        flexWrap:'wrap',
        flex: 1,
        opacity: 1,
        zIndex: 15

    }
});
