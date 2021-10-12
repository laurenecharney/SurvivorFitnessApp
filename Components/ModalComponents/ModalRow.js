import React,{Component} from 'react';
import {Text} from 'react-native';

class ModalRow extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return (
        <>   
        {this.props.displayValue && <Text style={{paddingBottom:20, fontSize: '15', color: '#AED803'}} > {this.props.displayKey}
            <Text style={{color: '#797979'}}> {this.props.displayValue}</Text> 
        </Text>}
        </>
        );
        
    }
}

export default ModalRow;
