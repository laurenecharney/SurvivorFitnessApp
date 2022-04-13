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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InformationRow from "./InformationRow";
import { AddEditModal } from "./AddEditModal";


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);



export const DisplayModal = ({categories, visible, callback, title, information, canEdit, fields}) => {
    const [edit_modal, set_edit_modal] = useState(false);
    const [informationLoaded, setInformationLoaded] = useState(false);

    // console.log(information, "information")
    console.log()

    const openEditModal = () =>{
        set_edit_modal(true)

    }
    const closeEditModal = () =>{
        set_edit_modal(false)
    }

    useEffect(() => {
        if (information) {
            console.log(information, "information")
            setInformationLoaded(true)
        }
        // console.log("fields", fields)
        // fields.map(field => {
        //     console.log("field", field)
        //     return field
        // })
    }, [information])

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
                    <TouchableOpacity style={{paddingLeft:300, paddingTop:50}} onPress={()=>callback("close")}>
                        <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, width: "75%"}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{paddingBottom:20, width:'100%'}}>
                                <Text style={styles.modalText} >{title}</Text>
                            </View>
                            {canEdit && 
                                <View  style={{justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>callback("edit")}>
                                        <Text style = {styles.editStyle}>edit</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            
                            {/* {
            
                                Object.keys(categories).map(key => {
                                    // console.log("information row info", categories[key], information[key], key)
                                    // console.log("key: ", key)
                                    return (<InformationRow title={categories[key]} value={information[key]} key={key}/>)
                                })
                            } */}
                            {
                                informationLoaded &&
                                fields.map((field, i) => {
                                    // console.log("field", field)
                                    // console.log("second information row info", field.label, information[field.key], field.key)
                                    // <Text key={field.key}>{field.label}</Text>
                                    console.log("field key", field.key)
                                    console.log(information[field.key])
                                    return <InformationRow title={field.label} value={information[field.key]} key={field.key}/>
                                })
                            }
                        </ScrollView>
                    </View>
            </View>
            <AddEditModal 
                categories = {categories}
                fields = {fields}
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