import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {  
  getParticipants, 
  getParticipantByID, 
  updateParticipant,
  formatParticipants
} from '../APIServices/APIUtilities';
import { getUser, getLocationIds, getCurrentRole, getSpecialistType } from "../APIServices/deviceStorage";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const displayCategories = {
    firstName: "First Name: ",
    lastName: "Last Name: ",
    phoneNumber: "Phone Number: ",
    email: "Email: ",
    age: "Age: ",
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
];

export default class LocationAdminClientPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.callbackAction = this.callbackAction.bind(this)
    this.state = {
      isModalVisible: false,
      isEditModalVisible: false,
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
      specialistType: "",
      categories: templateCategories,
      updateUser:{
          id: "",
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          phoneNumber: "",
          startDate: "",
          goals: "",
          typeOfCancer: "",
          formsOfTreatment: "",
          surgeries: "",
          physicianNotes: "",
          dietitian: {
              
          },
          dietitianLocation: {
             
          },
          trainer: {
              
          },
          trainerLocation: {
              
          },
          treatmentProgramStatus: ""
      },
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

  // assignValue = (item) => {
  //   if (item.firstName && item.lastName) {
  //     item.value = item.firstName + " " + item.lastName;
  //   } else {
  //     item.value = ""
  //   }
  //   return item
  // }

  // assignKey = (item) => {
  //   item.key = parseInt(item.id);
  //   return item
  // }

  // assignSpecialists = (item) => {
  //   if (item.trainer) {
  //     item.trainer = item.trainer.firstName + " " + item.trainer.lastName;
  //   } else {
  //     item.trainer = "";
  //   }
  //   if (item.dietitian) {
  //     item.nutritionist = item.dietitian.firstName + " " + item.dietitian.lastName;
  //   } else {
  //     item.nutritionist = "";
  //   }
  //   return item
  // }

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

  formatParticipants = (rawParticipants) => {
    let formattedParticipants = rawParticipants.map(item => {
      let tempItem = this.assignValue(item);
      tempItem = this.assignKey(tempItem);
      tempItem = this.assignSpecialists(tempItem);
      return tempItem;
    })
    return formattedParticipants;
  }

  async refreshParticipants(locations) {
    try {
      const locationIds = await getLocationIds();
      const locationType = await this.isDietitian() ? "dietitianOfficeId" : "gymId";
      const res = await this.getParticipantsByLocationList(locationIds, locationType);
      
      // let tempParticipants = res2.map(item => {
      //   let tempItem = this.assignValue(item);
      //   tempItem = this.assignKey(tempItem);
      //   tempItem = this.assignSpecialists(tempItem);
      //   return tempItem;
      // })
      let tempParticipants = formatParticipants(res)

      this.setState({participants: tempParticipants})

    } catch (e) {
      console.log("Error fetching participants", e);
      alert("Could not fetch participants data");
    }
  }

  openModal = async (participant) =>{
    this.setState({
        isModalVisible:true,
        selectedParticipant: participant,
        updateUser: {
         id: participant.id,
         firstName: participant.firstName,
         lastName: participant.lastName,
         age: participant.age,
         email: participant.email,
         phoneNumber: participant.phoneNumber,
         startDate: participant.startDate,
         goals: participant.goals,
         typeOfCancer: participant.typeOfCancer,
         formsOfTreatment: participant.formsOfTreatment,
         surgeries: participant.surgeries,
         physicianNotes: participant.physicianNotes,
         dietitian: {id: participant.dietitian.id},
         dietitianLocation: {
             id: participant.dietitianLocation.id
         },
         trainer: {id: participant.trainer.id},
         trainerLocation: {
             id: participant.trainerLocation.id
         },
         treatmentProgramStatus: participant.treatmentProgramStatus
        }
    });
    try {
     const res = await getParticipantByID(participant.id);
     } catch (e){
         console.log(e);
         alert("Could not fetch participants data");
     }
 }

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  openEditModal = () => {
    this.setState({
      isModalVisible: false,
      isEditModalVisible: true,
    });
  };

  closeEditModal = async () => {
      this.setState({
          isEditModalVisible: false
      });
  };

  callbackAction(action){
    if(action == "back"){
        this.props.navigation.goBack()
    }
    else if(action == "add"){
        this.openAddModal()
    }
    else if(action == "close"){
        this.closeModal()
    }
    else if(action == "edit"){
        this.openEditModal()
    }
}

  updateInfo = async (newInformation) => {
    if(newInformation.age){
        this.state.updateUser.age = newInformation.age
    }
    if(newInformation.dietitianLocation){
        this.state.updateUser.dietitianLocation = {id: newInformation.dietitianLocation}
    }
    if(newInformation.email){
        this.state.updateUser.email = newInformation.email
    }
    if(newInformation.firstName){
        this.state.updateUser.firstName = newInformation.firstName
    }
    if(newInformation.formsOfTreatment){
        this.state.updateUser.formsOfTreatment = newInformation.formsOfTreatment
    }
    if(newInformation.goals){
        this.state.updateUser.goals = newInformation.goals
    }
    if(newInformation.lastName){
        this.state.updateUser.lastName = newInformation.lastName
    }
    if(newInformation.phoneNumber){
        this.state.updateUser.phoneNumber = newInformation.phoneNumber
    }
    if(newInformation.physicianNotes){
        this.state.updateUser.physicianNotes = newInformation.physicianNotes
    }
    if(newInformation.surgeries){
        this.state.updateUser.surgeries = newInformation.surgeries
    }
    if(newInformation.trainerLocation){
        this.state.updateUser.trainerLocation = {id: newInformation.trainerLocation}
    }
    if(newInformation.typeOfCancer){
        this.state.updateUser.typeOfCancer = {id: newInformation.typeOfCancer}
    }
    console.log("Client Obj",this.state.updateUser)
    console.log("Client ID", this.state.updateUser.id)
    const res = await updateParticipant(this.state.updateUser, this.state.updateUser.id)
    console.log("RES", res)
    this.state.selectedUser = res
    await this.refreshParticipants()
  }

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
            canEdit = {true}
            content = "Participants" 
            title = "Participant Information" 
            visible = {this.state.isModalVisible} 
            callback = {this.callbackAction}/>
         <AddEditModal 
            fields = {this.state.categories} 
            isAdd = {false}
            title = {"Edit Participant"} 
            visible = {this.state.isEditModalVisible} 
            information = {this.state.selectedParticipant}
            callback = {info => {
                if(info) this.updateInfo(info);
                this.closeEditModal();}}/>
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