import Icon from "react-native-vector-icons/MaterialIcons";
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from "react-native";



export default class NameNavBarComponent extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <TouchableOpacity>
            <View style={styles.row}>
                 <Text style={styles.text}>{this.props.name}</Text>
            <Icon style={{paddingLeft:100, paddingTop:10}}  name = {'keyboard-arrow-right'} size = {50} color = {'#BEBEBE'}/>
            </View>
            </TouchableOpacity>

        )
    }

}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 25,
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 20,
        color: '#3E3E3E',
        flexDirection: 'row',
        alignItems: 'flex-start',
        textAlign: 'left',
    },
});
