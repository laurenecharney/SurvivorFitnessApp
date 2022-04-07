import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
//import AlphabetList from "react-native-flatlist-alphabet";

import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getLocationIds, getCurrentRole } from "../APIServices/deviceStorage";
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
      participants: []
    };
  }

  async componentDidMount() {
    let userLocations = JSON.parse(await getUser()).locations;
    this.setState({locations: userLocations});
    //TODO
    await this.refreshParticipants(userLocations);
  }

  isDietitian() {
    return (
      this.props.route.params &&
      this.props.route.params.userType === "DIETITIAN"
    );
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
        console.log(res, "locationAdminClient res")
        rawParticipants.push(...res);
      }
      return rawParticipants
  }

  async refreshParticipants(locations) {
    try {
      const locationIds = await getLocationIds();
      const locationType = this.isDietitian() ? "dietitianOfficeId" : "gymId";
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
