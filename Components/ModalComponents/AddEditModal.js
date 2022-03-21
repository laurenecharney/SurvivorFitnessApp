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


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const AddEditModal = ({fields, isAdd, isLocation, title, visible, callback,  information}) => {
    const [input, setInput] = useState(fields);
    const [isGym, setIsGym] = useState(true);

    useEffect(() => {
        let temp = JSON.parse(JSON.stringify(input));
        temp["type"] = "TRAINER_GYM";
        setInput(temp);
    }, []);

    useEffect(() => {
        setIsGym(input["type"] == "TRAINER_GYM");
    }, [input]);

    const saveInput = (field, value) => {
        let temp = JSON.parse(JSON.stringify(input));
        temp[field] = value;
        setInput(temp);
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
                        {isAdd && isLocation &&
                            <View style={{marginBottom: 15}}>
                                <Text style={styles.inputFieldLabel}>Select Location Type:</Text>
                                <View style={{flexDirection:"row", justifyContent:"center", width: "95%", alignSelf: "center"}}>
                                    <TouchableOpacity 
                                        style={[styles.selectableBox, styles.leftSelectableBox, isGym ? styles.selected : styles.unselected]}
                                        onPress={() => saveInput("type", "TRAINER_GYM")}>
                                            <Text style={isGym ? styles.selectedText : styles.unselectedText}>Gym</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.selectableBox, styles.rightSelectableBox, !isGym ? styles.selected : styles.unselected]}
                                        onPress={() => saveInput("type", "DIETITIAN_OFFICE")}>
                                            <Text style={!isGym ? styles.selectedText : styles.unselectedText}>Dietitian Office</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {isAdd ?
                                Object.keys(fields).map(key => (
                                    <EditInformationRow 
                                        title={key[0].toUpperCase()+key.substring(1)+":"} 
                                        intValue={""} 
                                        key={key}
                                        callback={val => saveInput(key, val)}/>
                                ))
                            :
                            (
                                Object.keys(fields).map(key => (
                                    <EditInformationRow 
                                        title={key[0].toUpperCase()+key.substring(1)+":"} 
                                        intiValue={information[key]} 
                                        key={key}
                                        callback={val => saveInput(key, val)}/>
                                ))
                            )}
                        <View>
                            {isAdd ?
                                <View style={{marginTop: 20}}>
                                    <AppButton 
                                        title = {"Add"}
                                        onPress={()=>callback(input)}/>
                                </View>
                            :
                            isAdd && (
                                <View>
                                    <RemoveButton/>
                                    <AppButton
                                        title={"EDIT"}
                                        onPress={()=>callback(input)}/>
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