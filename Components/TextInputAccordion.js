import {TextInput, Text} from 'react-native';
import React, { Component } from 'react';

export default class TextInputAccordion extends Component{
    constructor(props){
        super(props)
    }
    render()
    {
        return(
            <React.Fragment>
            {/* {
            <Text 
            // editable={false}
            style = {{color: this.props.edit ? "black" : "#D5D5D5"}}
           
            
            > {this.props.label}
            </Text>
                } */}
            {this.props.edit ? 
                <TextInput
                returnKeyType="done"
                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
                underlineColorAndroid = "transparent"
                
                placeholderTextColor = "#D5D5D5"
                color="black"
                autoCapitalize = "sentences"
                onChangeText = {(newValue)=>this.props.setVal(newValue)}
                />:
                <Text style = {{color: this.props.attribute ==this.props.defaultValue ? "#D5D5D5" : "black"}}>
                {this.props.attribute ==this.props.defaultValue ? "": this.props.attribute}
                </Text>}
                </React.Fragment>
        )
    }
}