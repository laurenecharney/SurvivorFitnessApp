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
import InformationRow from "./InformationRow";
import ModalHeader from "./ModalHeader";
import { AddEditModal } from "./AddEditModal";


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);



export const DisplayModal = ({categories, visible, callback, title, information, canEdit}) => {
    const [edit_modal, set_edit_modal] = useState(false);

    console.log(information)

    const openEditModal = () =>{
        set_edit_modal(true)

    }
    const closeEditModal = () =>{
        set_edit_modal(false)
    }

    return(
        // <View style={styles.container}>
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
                    <View style={{flex: 1, width: "75%"}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{paddingBottom:20, width:'100%'}}>
                                <Text style={styles.modalText} >{title}</Text>
                            </View>
                            {canEdit && 
                                <View  style={{justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>openEditModal()}>
                                        <Text style = {styles.editStyle}>edit</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            
                            {
                                Object.keys(categories).map(key => (
                                    <InformationRow title={categories[key]} value={information[key]} key={key}/>
                                ))
                            }
                        </ScrollView>
                    </View>
           
            </View>
            <AddEditModal 
                categories = {categories}
                information = {information}
                isAdd = {false} 
                title = {"Edit " + title}
                visible = {edit_modal} 
                callback = {closeEditModal}/>
      
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
        width: '100%',

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
    editStyle: {
        fontSize: 14,
        color: "#AED803",
        alignSelf: "center",
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 0
    },
});