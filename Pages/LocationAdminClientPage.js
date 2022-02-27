import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
//import AlphabetList from "react-native-flatlist-alphabet";

import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getCurrentRole } from "../APIServices/deviceStorage";
import { Heading } from '../Components/Heading';
import { DisplayModal } from "../Components/ModalComponents/DisplayModal";

const categories = {
  firstName: "First Name: ",
  lastName: "Last Name: ",
  phoneNumber: "Phone Number: ",
  email: "Email: ",
  //age: "Age: ",
  typeOfCancer: "Type of Cancer: ",
  treatmentFacility: "Treatment Facility: ",
  surgeries: "Surgeries: ",
  formsOfTreatment: "Forms of Treatment: ",
  physicianNotes: "Physician Notes: ",
  trainer: "Trainer: ",
  gym: "Gym: ",
  nutritionist: "Dietitian: ",
  dieticianOffice: "Dietitian Office: ",
  //startDate: "Start Date: ",
  goals: "Goal(s): ",

};

export default class LocationAdminClientPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isAddModalVisible: false,
      isListOpen: false,
      name:"",
      age:"",
      email:"",
      phoneNumber:"",
      cancer:"",
      treatmentFacility:"",
      surgeries:"",
      formsOfTreatments:"",
      doctNotes:"",
      trainer:"",
      dietician:"",
      startDate:"",
      goals:"",
      calls: [],
      selectedParticipant: {},
      participants: []
    };
  }

  async componentDidMount() {
    //TODO
    await this.refreshParticipants();
    const currentRole = await getCurrentRole();
  }

  isDietitian() {
    return (
      this.props.route.params &&
      this.props.route.params.userType === "DIETITIAN"
    );
  }

  async refreshParticipants() {
    try {
      const locationId = this.props.route.params
        ? this.props.route.params.locationId
        : null;
      const res =  
      this.isDietitian() ? await getParticipants("dietitianOfficeId", locationId) : await getParticipants("gymId", locationId);
      this.setState({
        participants: res.map(item => {
          let newI = item;

          newI.value =
            item.firstName && item.lastName
              ? item.firstName + " " + item.lastName
              : "";
          newI.key = parseInt(item.id);
          newI.trainer = item.trainer
            ? item.trainer.firstName + " " + item.trainer.lastName
            : "";
          newI.nutritionist = item.dietitian
            ? item.dietitian.firstName + " " + item.dietitian.lastName
            : "";
          return newI;
        })
      });
    } catch (e) {
      console.log("Error fetching participants", e);
      alert("Could not fetch participants data");
    }
  }

  openModal = async (participant) => {
    this.setState({
      isModalVisible: true,
      selectedParticipant: participant
    });
    try {
      const res = await getParticipantByID(participant.id);
      this.setState({
      })
  } catch (e){
      console.log(e);
      alert("Could not fetch participants data");
  }
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <Heading 
            title = "Participants"
            titleOnly = {true}
            displayAddButton = {false}
            displayBackButton = {false}
            displaySettingsButton = {false}/>
        <ParticipantsList
            participantsInfo={this.state.participants}
            openModal={item => this.openModal(item)}
            showTrainer={!this.isDietitian()}
            showDietitian={this.isDietitian()}
            listType="participants"/>
        <DisplayModal 
            categories = {categories} 
            information = {this.state.selectedParticipant}
            canEdit = {false}
            content = "Participants" 
            title = "Participant Information" 
            visible = {this.state.isModalVisible} 
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
