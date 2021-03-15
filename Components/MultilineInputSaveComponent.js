import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

export default class MultilineInputSaveComponent  extends Component{
    constructor(props){
        super(props);
    }
    changeText = (newValue) => {
        this.props.changeText(newValue);
    }
    render(){
    return(
        <View>
        <Text style={styles.headingText}>
        {this.props.heading}
        </Text>
        <TextInput
            returnKeyType = "done"
            style = {styles.notesOutline}
            placeholder = {this.props.value ? this.props.value : this.props.placeholder}
            defaultValue = {this.props.value ? null : this.props.value}
            onChangeText={newValue=>this.changeText(newValue)}
            value={this.props.value}
            multiline
            blurOnSubmit = {false}
            editable={this.props.edit}
        /> 
        
        
        </View>)}}


const styles = StyleSheet.create({
    notes: {
        width: '90%',
        padding: 10,
        margin: 10,
        height: '35%',
        marginBottom: 20,
        fontSize: 15
      },
      notesOutline: { 
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        height: 250,
        marginHorizontal: 10,
      },
      headingText: {
        fontSize: 20,
        fontWeight: "bold"
      },
      notesSaved: { 
        borderColor: '#d3d3d3',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        height: 250,
        marginHorizontal: 10,
      },
})