import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions,ScrollView ,TextInput} from 'react-native';

class Inputs extends Component{
    state = {
        propertyName: '',
        value: ''
    }
    constructor(props){
        super(props)
        console.log(this.props)
    
    }
    handleInput = (text)=>{
        this.setState({value: text})
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{this.props.propertyName}:   </Text>
            
            <View style = {styles.inputWrap}>
                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = {this.props.propertyName}
                     placeholderTextColor = "#9a73ef"
                     autoCapitalize = "none"
                     onChangeText={this.handleInput}
                     />
            </View>
            </SafeAreaView>);
        
    }
}

export default Inputs;

const styles = StyleSheet.create({
    container: { //outer parent
    //    padding: 23,
       flex: 1,
      flexDirection: "row",
      justifyContent: 'space-between'
    //    margin: 15
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: -12,
      
    },
    inputWrap: {
        flex: 1,
        marginBottom: 20,
      

    },
    input: {
    //    margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
    //    flex: .5,
       maxWidth: '60%',
    //    marginRight: 
    borderRadius: 10
     
    },
 })