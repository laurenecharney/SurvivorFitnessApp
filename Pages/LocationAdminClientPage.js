import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {  
  getParticipants, 
  getParticipantByID, 
  updateParticipant,
  formatParticipants,
  getTrainers, 
  getDietitians
} from '../APIServices/APIUtilities';
import { getUser, getLocationIds, getCurrentRole, getSpecialistType } from "../APIServices/deviceStorage";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';


const templateCategories = [
  {key: "firstName",          input: "text",      label: "First Name: ",                  displayLabel: "", options: [], edit: true},
  {key: "lastName",           input: "text",      label: "Last Name: ",                   displayLabel: "", options: [], edit: true},
  {key: "phoneNumber",        input: "text",      label: "Phone Number: ",                displayLabel: "", options: [], edit: true},
  {key: "email",              input: "text",      label: "Email: ",                       displayLabel: "", options: [], edit: true},
  {key: "trainerName",        input: "picker",    label: "Trainer: ",                     displayLabel: "", options: [], edit: true},
  {key: "gym",                input: "picker",    label: "Training Location: ",           displayLabel: "", options: [], edit: false},
  {key: "dietitianName",      input: "picker",    label: "Dietitian: ",                   displayLabel: "", options: [], edit: true},
  {key: "office",             input: "picker",    label: "Dieititan Office: ",            displayLabel: "", options: [], edit: false},
  {key: "age",                input: "text",      label: "Age: ",                         displayLabel: "", options: [], edit: true},
  {key: "typeOfCancer",       input: "text",      label: "Type of Cancer: ",              displayLabel: "", options: [], edit: true},
  {key: "formsOfTreatment",   input: "text",      label: "Forms of Treatment: ",          displayLabel: "", options: [], edit: true},
  {key: "surgeries",          input: "text",      label: "Surgeries: ",                   displayLabel: "", options: [], edit: true},
  {key: "physicianNotes",     input: "text",      label: "Notes from Physician: ",        displayLabel: "", options: [], edit: true},
  {key: "goals",              input: "text",      label: "Goals: ",                       displayLabel: "", options: [], edit: true},
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
              id: ""
          },
          dietitianLocation: {
            id: ""
          },
          trainer: {
            id: ""
          },
          trainerLocation: {
            id: ""
          },
          treatmentProgramStatus: ""
      },
    };
  }

  async componentDidMount() {
    const specialistType = JSON.parse(await getSpecialistType())
    this.setState({specialistType: specialistType})
    let userLocations = JSON.parse(await getUser()).locations;
    this.setState({locations: userLocations});
    await this.refreshParticipants(userLocations);
    let trainers = [], dietitians = [];
    for(const loc of userLocations) {
        if(loc.type == "TRAINER_GYM"){
          const trainerRes = await getTrainers(loc.id)
          for(const trainer of trainerRes){
            trainers.push({label: trainer.firstName + " " + trainer.lastName, value: trainer.id});
          }
        }
        if(loc.type == "DIETICIAN_OFFICE"){
          const dietitianRes = await getDietitians(loc.id)
          for(const dietitian of dietitianRes){
            dietitians.push({label: dietitian.firstName + " " + dietitian.lastName, value: dietitian.id});
          }
        }
    }
   
    let temp = JSON.parse(JSON.stringify(this.state.categories));
    for(let category of temp) {
        if(category.key == "trainerName") {
          category.edit = specialistType === "TRAINER";
          category.options = trainers;

        }
        if(category.key == "dietitianName") {
          category.edit = specialistType === "DIETITIAN";
          category.options = dietitians;
        }
    }
    this.setState({categories: temp});
  }

  isDietitian = async () =>{
    const specialistType = JSON.parse(await getSpecialistType())
    const isDietitian = specialistType == "DIETITIAN"
    return isDietitian;
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
      const res = await this.getParticipantsByLocationList(locationIds, locationType);
    
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
         dietitian: participant.dietitianName != "unassigned" ? {id: participant.dietitian.id} : {},
         dietitianLocation: {
             id: participant.dietitianLocation.id
         },
         trainer: participant.trainerName != "unassigned" ? {id: participant.trainer.id} : {},
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
    if(newInformation.trainerName){
      this.state.updateUser.trainer = {id: newInformation.trainerName}
    }
    if(newInformation.dietitianName){
      this.state.updateUser.dietitian = {id: newInformation.dietitianName}
    }
    const res = await updateParticipant(this.state.updateUser, this.state.updateUser.id)
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
            showTrainer={true}
            showDietitian={true}
            listType="participants"/>
        <DisplayModal 
            // categories = {displayCategories} 
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