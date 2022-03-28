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
} from "react-native";
import EditInformationRow from "./EditInformationRow";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveButton from "./RemoveButton";
import { createUser } from "../../APIServices/APIUtilities";
import { getUser } from "../../APIServices/deviceStorage";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const AddEditModal = ({categories, isAdd, title, visible, callback,  information}) => {
    const [newInformation, setNewInformation] = useState({information, location : ""});
    const [trainerLocations, setLocations] = useState([]);
    const [showPicker, setShowPicker] = useState(false);

    const updateInputText = (key, text) => {
        let updatedState = {...newInformation, [key] : text};
        setNewInformation(updatedState);
    }

    const uploadUser = () => {
        callback();
        if((newInformation.value != "") && (newInformation.phoneNumber != "") && (newInformation.email != "")){
            user = {
                user: {
                    firstName: newInformation.firstName,
                    lastName: newInformation.lastName,
                    email: newInformation.email,
                    phoneNumber: newInformation.phoneNumber,
                    isSuperAdmin: "false"
                },
                locationAssignments: [
                    {
                        locationId: newInformation.location,
                        userRoleType: "TRAINER"
                    },
                ]
            }
             createUser(user);
        }
    }
    const placeholder = {
        label: 'Select a location...',
        value: null,
        color: '#9EA0A4',
    };

    useEffect(() => {

        async function getLocation(){
            let userLocations = JSON.parse(await getUser()).locations;
            setLocations(
                userLocations.map((location) => ({
                    label: location.name, value: location.id
            })
            ));
        }

        getLocation();
    }, [])


    useEffect(() => {
        if(trainerLocations.length > 0){
            setShowPicker(true);
        }
    }, [trainerLocations])

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
                            <View style={{paddingBottom:10, width:'100%'}}>
                                <Text style={styles.modalText} >{title}</Text>
                            </View>
                            {isAdd ?
                                    Object.keys(categories).map(key => (
                                        <EditInformationRow updateInputText={text => updateInputText(key, text)} title={categories[key]} value="" key={key}/>
                                    ))
                                :
                                (
                                    Object.keys(categories).map(key => (
                                        <EditInformationRow title={categories[key]} value={information[key]} key={key}/>
                                    ))
                            )}
                            {showPicker &&
                            <View>
                                <Text style={styles.participantInfo} >Location</Text>
                                <View style={[styles.dropDownContainer]}>
                                <RNPickerSelect
                                    placeholder={placeholder}
                                    items={trainerLocations}
                                    style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                    }}
                                    onValueChange={value => updateInputText("location", value)}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColor: 'yellow' }}
                                    Icon={() => {
                                    return <Ionicons name="caret-down-outline" size={24} color="gray" />;
                                    }}
                                />
                                </View>
                            </View>
                            }
                            <View>
                                {isAdd ?
                                    <View style={{marginTop: 20}}>
                                        <AppButton 
                                            title = {"Add"}
                                            onPress={()=>uploadUser()}
                                            />
                                    </View>
                                :
                                 (
                                    <View>
                                        <RemoveButton/>
                                        <AppButton
                                            title={"EDIT"}
                                            onPress={()=>callback()}
                                            />
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }

const styles = StyleSheet.create({
    participantInfo:{
        fontSize: 15, 
        color: '#AED803', 
        textAlign: "left"
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
