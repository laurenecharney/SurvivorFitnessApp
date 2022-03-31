import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { getDietitians } from '../APIServices/APIUtilities';
import { getSpecialistType } from '../APIServices/deviceStorage';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

const categories = {
    value: "Name: ",
    gym: "Affiliate Location: ",
    phoneNumber: "Phone Number: ",
    email: "Email: "
};
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
        this.back = this.back.bind(this);
        this.state = {
            isModalVisible: false,
            calls: [],
            selectedDietician: {},
            specialistType: "",
        };
    }

    async componentDidMount(){
        const specialistTypeRes = JSON.parse(await getSpecialistType());
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
    
    getShowBackButton() {
        return this.props.route.params && this.props.route.params.showBackButton;

    }

    back() {
        this.props.navigation.goBack()
    }

    render() {
        return(
            <View style={styles.container} >
                <Heading 
                    title = "Dieticians"
                    titleOnly = {!this.getShowBackButton()}
                    displayAddButton = {false}
                    displayBackButton = {this.getShowBackButton()}
                    displaySettingsButton = {false}
                    callback = {this.back}/>
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    listType={this.state.specialistType}
                    showSpecialistLocations={true}/>   
                <DisplayModal 
                    categories = {categories} 
                    information = {this.state.selectedDietician}
                    content = "Dieticians" 
                    title = "Dietician Information" 
                    visible = {this.state.isModalVisible} 
                    canEdit = {false}
                    callback = {this.closeModal}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:'#fff'
    },
});