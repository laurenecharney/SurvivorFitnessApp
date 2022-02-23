import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    FlatList,
    Button,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import {AlphabetList} from "react-native-section-alphabet-list";
import { getDietitians } from '../APIServices/APIUtilities';
import { getSpecialistType } from '../APIServices/deviceStorage';
import ModalHeader from '../Components/ModalComponents/ModalHeader';
import InformationRow from '../Components/ModalComponents/InformationRow';
import Icon4 from "react-native-vector-icons/MaterialIcons";
import { ParticipantsList } from '../Components/ParticipantsList';
import {
    deleteJWT,
    getUser,
    saveCurrentRole,
    deleteCurrentRole,
    deleteUserInfo,
    getCurrentRole
  } from "../APIServices/deviceStorage";

export default class AdminDieticianPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            calls: [],
            selectedDietician: {},
            specialistType: "",
        };
    }

    async componentDidMount(){
        const specialistTypeRes = JSON.parse(await getSpecialistType());
        console.log("specialistTypeRes: ", specialistTypeRes);
        this.setState({specialistType: specialistTypeRes})
        await this.refreshDietitians();
    }

    async refreshDietitians(){
        try {
            const locationId = this.props.route.params && this.props.route.params.locationId ? 
            this.props.route.params.locationId : null;
            const arr = await getDietitians(locationId);
            this.setState({
               calls: arr.map(
                item => {
                    let newI = item;
                    newI.value = item.firstName + " " + item.lastName
                    newI.key = parseInt(item.id)
                    newI.gym = item.locations[0] ? item.locations[0].name : '';
                    return newI;
                }
           )})
                
           ;
            } catch (e){
                alert("Could not fetch dietitians.");
            }
    }
    openModal = (item) =>{
        this.setState({
            isModalVisible:true,
            selectedDietician: item
        })
    }

    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            selectedDietician: {}
        })
    }
    
    getHideBackButton() {
        return this.props.route.params && this.props.route.params.hideBackButton;
    }


    render() {
        return(
            <View style={styles.container} >
                <View>
                    {this.getHideBackButton() && 
                        <View style={styles.backHeading}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                            <Icon4 name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"}  />
                        </TouchableOpacity>
                        <Text style={styles.backHeadline}>Dietitians</Text>
                        </View>
                    }
                    {!this.getHideBackButton() && (
                        <View style={styles.heading}>
                            <Text style={styles.headline}>Dietitians</Text>
                        </View>
                    )}
                </View>
                <ParticipantsList
                                    participantsInfo={this.state.calls}
                                    openModal={item => this.openModal(item)}
                                    listType={this.state.specialistType}
                                    showSpecialistLocations={true}
                                />   
                
                <Modal 
                    propagateSwipe={true} 
                    animationIn="slideInUp" 
                    animationOut="slideOutDown" 
                    onBackdropPress={()=>this.closeModal()} 
                    onSwipeComplete={()=>this.closeModal()} 
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalStyle}>
                            <TouchableOpacity style={styles.close} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={styles.modalHeaderContainer}>
                                        <ModalHeader title = "Dietitian Information"/>
                                    </View>
                                    <View style={styles.modalInformationContainer}>
                                        <InformationRow title = "Name: " value = {this.state.selectedDietician.value}/>
                                        <InformationRow title = "Affiliate Location: " value = {this.state.selectedDietician.gym}/>
                                        <InformationRow title = "Phone Number: " value = {this.state.selectedDietician.phoneNumber}/>
                                        <InformationRow title = "Email: " value = {this.state.selectedDietician.email}/>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headline: {
        fontSize: 25,
        marginTop: 50,
        marginLeft: 10,
        padding: 25,
        color: '#AED803',
        fontWeight: '400',
    },
    container:{
        flex: 1, 
        backgroundColor:'#fff'
    },
    heading:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        borderBottomWidth: 0.25,
        borderTopWidth:0.25,
        paddingTop: 35,
        paddingBottom: 35,
        width:"85%",
        alignSelf:'center',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex:1
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex:1,
        width: "100%",
        paddingLeft:10,
        paddingRight:10
    },
    nameTxt: {
        fontWeight: '400',
        color: '#3E3E3E',
        fontSize: 18,
        paddingBottom: 10,
        paddingLeft:5
    },
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
        paddingLeft: 5
    },
    listContainer: {
        paddingBottom: '33%'
    },
    modalHeaderContainer:{
        marginLeft:40, 
        borderBottomWidth:1, 
        borderBottomColor: "#E4E4E4", 
        paddingBottom:20, 
        width:'75%'
    },
    locationContainer:{
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    modalContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalStyle:{
        backgroundColor: "#fff",
        width: '90%',
        height: '40%',
        borderRadius:19
    },
    modalInformationContainer:{
        marginLeft:40, 
        paddingTop:10, 
        paddingBottom:10, 
        width:'75%',
    },
    infoButton:{
        borderWidth:1,
        borderColor:"#AED803",
        alignItems:'center',
        justifyContent:'center',
        width:25,
        height:25,
        backgroundColor:'#fff',
        borderRadius:50,
        
    },
    infoTxt:{
        color:"#AED803" 
    },
    close:{
        paddingLeft:260, 
        paddingTop:30
    },
    backHeading:{
        flexDirection: "row", 
    },
    backHeadline: {
        fontSize: 25,
        marginTop: 50,
        paddingTop: 25,
        paddingBottom:25,
        color: "#AED803",
        fontWeight: "400",
        textAlign:'left'
    },
    backButton:{
        color: "#E4E4E4",
        marginTop: 65,
    },
    settings: {
        color: "#E4E4E4",
        marginTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 0,
        marginRight: 30
    },
});