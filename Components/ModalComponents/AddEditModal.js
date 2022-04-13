import React, { Component, useState, useEffect } from "react";
import {
  BackHandler,
  Picker,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
  Alert
} from "react-native";
import EditInformationRow from "./EditInformationRow";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveButton from "./RemoveButton";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const BinaryToggle = ({ label, option1, option2, callback, defaultVal }) => {
    const [isOptionOne, toggleSelection] = useState(defaultVal || option1);
    
    return(
        <View style={{marginBottom: 15}}>
            <Text style={styles.inputFieldLabel}>{label}</Text>
            <View style={{flexDirection:"row", justifyContent:"center", width: "95%", alignSelf: "center"}}>
                <TouchableOpacity 
                    style={[styles.selectableBox, styles.leftSelectableBox, isOptionOne ? styles.selected : styles.unselected]}
                    onPress={() => {toggleSelection(true); callback(option1);}}>
                        <Text style={isOptionOne ? styles.selectedText : styles.unselectedText}>{option1}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.selectableBox, styles.rightSelectableBox, !isOptionOne ? styles.selected : styles.unselected]}
                    onPress={() => {toggleSelection(false); callback(option2);}}>
                        <Text style={!isOptionOne ? styles.selectedText : styles.unselectedText}>{option2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const LabeledPicker = ({ label, items, callback }) => {
    return (
    <View style={{marginBottom: 15}}>
        <Text style={styles.inputFieldLabel}>{label}</Text>
        <RNPickerSelect
            placeholder={{label: "Select...", value: "0", color: '#9ea0a4'}}
            items={items}
            style={{
                ...pickerSelectStyles,
                iconContainer: {top: 10, right: 12,},
            }}
            onValueChange={value => callback(value)}
            Icon={() => (<Ionicons name="caret-down-outline" size={24} color="gray" />)}
        />
    </View>);
    
};

export const AddEditModal = ({fields, isAdd, title, visible, callback,  information, isChange, changeInformation}) => {
    const [input, setInput] = useState({});

    useEffect(() => {
        if(!visible) setInput({});
    }, [visible])

    const saveInput = (field, value) => {
        let temp = JSON.parse(JSON.stringify(input));
        temp[field] = value;
        setInput(temp);
    }

    const submit = () => {
        callback(input);
    }

    //Confirm User Wishes to signout
    const createTwoButtonAlert = () =>
    Alert.alert(
    "Confirm",
    "You will not be able to undo this action",
    [
        {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
        },
        { text: "Confirm", onPress: () => changeInformation(input) }
    ]
    
    );

    return(
        <Modal 
        propagateSwipe={true} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
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
                        {fields.map(field => {
                            if (!field.edit) {
                                return null;
                            } else if (field.input == "picker") {
                                return (
                                    <LabeledPicker
                                        key={field.key}
                                        label = {field.label}
                                        items = {field.options}
                                        callback = {val => saveInput(field.key, val)}
                                    />
                                )
                            } else if (field.input == "toggle") {
                                return (
                                    <BinaryToggle
                                        key={field.key}
                                        label={field.label}
                                        option1={field.options[0]}
                                        option2={field.options[1]}
                                        callback={val => saveInput(field.key, val)}
                                        defaultVal={isAdd ? field.options[0] : information[field.key]}
                                    />
                                )
                            } else if (field.input == "text") {
                                return (
                                    <EditInformationRow 
                                        title={field.label} 
                                        initValue={isAdd ? "" : information[field.key]} 
                                        key={field.key}
                                        updateInputText={val => saveInput(field.key, val)}
                                    />
                                )
                            } else return (<View />)
                        })}
                        <View>
                            <View style={{marginTop: 20}}>
                                {!isAdd && !isChange && <RemoveButton/>}
                                {!isChange && <AppButton 
                                    title = {isAdd ? "Add" : "Confirm Edits"}
                                    onPress={submit}/> }
                                    {/* !isAdd && !isChange && (
                                    <View>
                                        <RemoveButton/>
                                        <AppButton
                                            title={"EDIT"}
                                            //Send to backend with callback
                                        />
                                    </View>
                                )} */}
                                     {isChange && (
                                    <AppButton
                                    title={"Confirm"}
                                    onPress={createTwoButtonAlert}
                                />
                                )}
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
    dropDownContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center",
    }
    
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 4,
      color: 'lightgray',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'lightgray',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
});
