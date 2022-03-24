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

export const AddEditModal = ({categories, isAdd, title, visible, callback,  information, isChange}) => {
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
                                        <EditInformationRow title={categories[key]} value="" key={key}/>
                                    ))
                                :
                                (
                                    Object.keys(categories).map(key => (
                                        <EditInformationRow title={categories[key]} value={information[key]} key={key}/>
                                    ))
                                )}
                            <View>
                                {isAdd ?
                                    <View style={{marginTop: 20}}>
                                        <AppButton title = {"Add"}/>
                                    </View>
                                :
                                !isAdd && !isChange && (
                                    <View>
                                        <RemoveButton/>
                                        <AppButton
                                            title={"EDIT"}
                                            //Send to backend with callback
                                        />
                                    </View>
                                )}
                                {isChange && (
                                    <AppButton
                                    title={"EDIT"}
                                    //Send to backend with callback
                                />
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
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