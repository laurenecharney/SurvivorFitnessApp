import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
//import AlphabetList from "react-native-flatlist-alphabet";

import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getLocationIds, getCurrentRole, getSpecialistType } from "../APIServices/deviceStorage";
import { Heading } from '../Components/Heading';
import { DisplayModal } from "../Components/ModalComponents/DisplayModal";

const displayCategories = {
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

const templateCategories = [
  {key: "firstName",          input: "text",      label: "First Name: ",                  options: []},
  {key: "lastName",           input: "text",      label: "Last Name: ",                   options: []},
  {key: "age",                input: "text",      label: "Age: ",                         options: []},
  {key: "email",              input: "text",      label: "Email: ",                       options: []},
  {key: "phoneNumber",        input: "text",      label: "Phone Number: ",                options: []},
  {key: "trainerLocation",    input: "picker",    label: "Choose Training Location: ",    options: []},
  {key: "dietitianLocation",  input: "picker",    label: "Choose Dieititan Office: ",     options: []},
  {key: "goals",              input: "text",      label: "Goals: ",                       options: []},
  {key: "typeOfCancer",       input: "text",      label: "Type of Cancer: ",              options: []},
  {key: "formsOfTreatment",   input: "text",      label: "Forms of Treatment: ",          options: []},
  {key: "surgeries",          input: "text",      label: "Surgeries: ",                   options: []},
  {key: "physicianNotes",     input: "text",      label: "Notes from Physician: ",        options: []},
]

export default class LocationAdminClientPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isAddModalVisible: false,
      locations: [],
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
      participants: [],
      specialistType: ""
    };
  }

  async componentDidMount() {
    let userLocations = JSON.parse(await getUser()).locations;
    this.setState({locations: userLocations});
    //TODO
    await this.refreshParticipants(userLocations);
  }

  isDietitian = async () =>{
    const specialistType = JSON.parse(await getSpecialistType())
    const isDietitian = specialistType == "DIETITIAN"
    return isDietitian;
  }

  assignValue = (item) => {
    if (item.firstName && item.lastName) {
      item.value = item.firstName + " " + item.lastName;
    } else {
      item.value = ""
    }
    return item
  }

  assignKey = (item) => {
    item.key = parseInt(item.id);
    return item
  }

  assignSpecialists = (item) => {
    if (item.trainer) {
      item.trainer = item.trainer.firstName + " " + item.trainer.lastName;
    } else {
      item.trainer = "";
    }
    if (item.dietitian) {
      item.nutritionist = item.dietitian.firstName + " " + item.dietitian.lastName;
    } else {
      item.nutritionist = "";
    }
    return item
  }

  // given a list of location ids and a location type (gymId or dietitianOfficeId), returns a participant list
  getParticipantsByLocationList = async (locationIds, locationType) => {
      let rawParticipants = [];

      for (let i = 0; i < locationIds.length; i++) {

        // for each location id, get participants at that location, add to a list
        let res = await getParticipants(locationType, locationIds[i]);
        rawParticipants.push(...res);
      }
      return rawParticipants 
  }

  async refreshParticipants(locations) {
    try {
      const locationIds = await getLocationIds();
      const locationType = await this.isDietitian() ? "dietitianOfficeId" : "gymId";
      const res2 = await this.getParticipantsByLocationList(locationIds, locationType);
      
      let tempParticipants = res2.map(item => {
        let tempItem = this.assignValue(item);
        tempItem = this.assignKey(tempItem);
        tempItem = this.assignSpecialists(tempItem);
        return tempItem;
      })

      this.setState({participants: tempParticipants})

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
            categories = {displayCategories} 
            fields = {templateCategories}
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
