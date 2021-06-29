import React,{Component} from 'react';
import {Text} from 'react-native';

class ModalRow extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return (
        <>   
        {this.props.displayValue && <Text style={{padding:5, fontSize: '15', color: '#AED803'}} > {this.props.displayKey}
            <Text style={{color: 'black'}}> {this.props.displayValue}</Text> 
        </Text>}
        </>
        );
        
    }
}

export default ModalRow;
