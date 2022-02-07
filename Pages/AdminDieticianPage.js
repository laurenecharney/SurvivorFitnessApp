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
import ModalHeader from '../Components/ModalComponents/ModalHeader';
import InformationRow from '../Components/ModalComponents/InformationRow';
import Icon4 from "react-native-vector-icons/MaterialIcons";
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
            selectedDietician: {}
        };
    }

    getHideBackButton() {
        return this.props.route.params
    }

    async componentDidMount(){
        await this.refreshDietitians();
        console.log(await getCurrentRole());
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
    
    getHideSettingsIcon() {
        return this.props.route.params && this.props.route.params.hideSettingsIcon;
    }


    render() {
        return(
            <View style={styles.container} >
                <View>
                    {this.getHideSettingsIcon() && 
                        <View style={styles.backHeading}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                            <Icon4 name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"}  />
                        </TouchableOpacity>
                        <Text style={styles.backHeadline}>Dietitians</Text>
                        </View>
                    }
                    {!this.getHideSettingsIcon() && (
                        <View style={styles.heading}>
                            <Text style={styles.headline}>Dietitians</Text>
                        </View>
                    )}
                </View>
                <View style={styles.listContainer}>
                <AlphabetList
                    data={this.state.calls}
                    indexLetterColor={'#AED803'}
                    renderCustomSectionHeader={(section) => (
                        <View style={{visibility: 'hidden'}}/>
                        // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
                        // <View style={styles.sectionHeaderContainer}>
                        //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                        // </View>
                    )}
                    renderCustomItem={(item) => (
                        <ScrollView>
                            <View style={styles.row}>
                                <View>
                                    <View style={styles.nameContainer}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('TrainerPatientsPage', {dietitianUserId: item.id}  
                                        )}}>
                                            <Text style={styles.nameTxt}>{item.value}</Text>
                                            <View style={styles.locationContainer}>
                                                <Icon3 name={"location"} size={20} color={"#AED803"}/>
                                                <Text style={styles.gymTxt}>{item.gym}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.openModal(item)} style={styles.infoButton}>
                                            <Text style={styles.infoTxt}>i</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                />
                </View>
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
    },
    container:{
        flex: 1, 
        backgroundColor:'#fff'
    },
    heading:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        borderBottomWidth: 0.25,
        borderTopWidth:0.25,
        padding: 40,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        fontWeight: '600',
        color: '#3E3E3E',
        fontSize: 20,
        width:170,
    },
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
        width:170,
    },
    listContainer: {
        paddingBottom: '33%'
    },
    modalHeaderContainer:{
        marginLeft:40, 
        borderBottomWidth:1, 
        borderBottomColor: "#E4E4E4", 
        paddingBottom:20, 
        width:'75%'},
    locationContainer:{
        flexDirection: "row", 
        justifyContent: "space-between"
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
    fontWeight: "500",
    textAlign:'left'
    },
    backButton:{
    color: "#E4E4E4",
    marginTop: 65,
    },
});