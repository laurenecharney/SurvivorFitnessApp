import React, { Component, useState, useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import EditInformationRow from "./EditInformationRow";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveButton from "./RemoveButton";
import InformationRow from "./InformationRow";
import RNPickerSelect from 'react-native-picker-select';

// get request to .../users

<RNPickerSelect
    onValueChange={value => setAdmin(value)}
    placeholder={"Select Administrator"}
    items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]}
/>

/** TODO
 * install picker
 * set up and build out picker
 * fix add Participants merge
 * populate picker with users (awaiting new endpoint from ilya)
 * 
 */


let dummyList = [
    "Ben Gant",
    "Lauren Charney",
    "Ethan Shifrin",
    "Charles Wang",
    "Adam Hollander",
    "Ilya Ermakov",
]

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const BinaryToggle = ({label, option1, option2, callback, defaultVal}) => {
    const [isOptionOne, toggle] = useState(defaultVal || option1);
    
    return(
        <View style={{marginBottom: 15}}>
            <Text style={styles.inputFieldLabel}>{label}</Text>
            <View style={{flexDirection:"row", justifyContent:"center", width: "95%", alignSelf: "center"}}>
                <TouchableOpacity 
                    style={[styles.selectableBox, styles.leftSelectableBox, isGym ? styles.selected : styles.unselected]}
                    onPress={() => {toggle(true); callback(option1);}}>
                        <Text style={isGym ? styles.selectedText : styles.unselectedText}>{option1}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.selectableBox, styles.rightSelectableBox, !isGym ? styles.selected : styles.unselected]}
                    onPress={() => {toggle(false); callback(option2);}}>
                        <Text style={!isGym ? styles.selectedText : styles.unselectedText}>{option2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const AddEditModal = ({fields, isAdd, isLocation, title, visible, callback,  information}) => {
    const [input, setInput] = useState(fields);
    const [isGym, setIsGym] = useState(true);
    const [usersList, setUsersList] = useState(getUsers());

    useEffect(() => {
        let temp = JSON.parse(JSON.stringify(input));
        temp.type = "TRAINER_GYM";
        setInput(temp);
    }, []);

    useEffect(() => {
        setIsGym(input.type == "TRAINER_GYM");
    }, [input]);

    const saveInput = (field, value) => {
        let temp = JSON.parse(JSON.stringify(input));
        temp[field] = value;
        setInput(temp);
    }

    const getUsers = () => {
        
    }

    const setAdmin = value => {
        //cycle through adminList, get id# of one that matches string input
    }

    return(
        <Modal 
        propagateSwipe={true} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
        onBackdropPress={()=>callback()} 
        onSwipeComplete={()=>callback()} 
        transparent={true} 
        visible={visible}
        >
            <View style={styles.modalStyle}>
                <TouchableOpacity style={{paddingLeft:300, paddingTop:50}} onPress={()=>callback()}>
                    <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                </TouchableOpacity>
                <View style={{flex: 1, width: '75%', alignSelf: 'center'}}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{paddingBottom:20, width:'100%'}}>
                            <Text style={styles.modalText} >{title}</Text>
                        </View>
                        {fields && fields.map(field => {
                            return field.input == "administrator" ? 
                            (<RNPickerSelect 
                                placeholder={}
                                items=
                            />) : field.input == "text" ?
                            (<EditInformationRow 
                                title={key[0].toUpperCase()+key.substring(1)+":"} 
                                intValue={isAdd ? "" : information[key]} 
                                key={key}
                                callback={val => saveInput(field[key], val)}
                            />) : (<View />);
                        })}
                        <View>
                            <View style={{marginTop: 20}}>
                                {!isAdd && <RemoveButton/>}
                                <AppButton 
                                    title = {isAdd ? "Add" : "Confirm Edits"}
                                    onPress={()=>callback(input)}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    selectableBox:{
        paddingVertical: 15,
        paddingHorizontal: 12,
        flex: 1,
        alignItems: "center",
    },
    leftSelectableBox:{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightSelectableBox:{
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    selected:{
        backgroundColor:'#AED804',
    },
    unselected:{
        backgroundColor:'#E7E7E7',
    },
    selectedText:{
        color: "#fff",
        fontWeight: "bold",
    },
    unselectedText:{
        color: "#b8b8b8"
    },
    inputFieldLabel:{
        fontSize: 15, 
        color: '#AED803', 
        fontWeight: "bold", 
        marginBottom: 10,
    },
    modalStyle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#fff",
        width: '100%'
    },
    modalText:{
        fontSize: 18,
        paddingTop: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "#AED803",
    },
    appButtonContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 12,
        width: 150,
        alignSelf: "center",
        margin: 10
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
    },
    
});