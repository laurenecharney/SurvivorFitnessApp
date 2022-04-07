import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getCurrentRole, getSpecialistType } from "../APIServices/deviceStorage";
import { Heading } from '../Components/Heading';
import { DisplayModal } from "../Components/ModalComponents/DisplayModal";

export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const showAlert = () =>
  Alert.alert(
    "Are you sure you want to remove participant?",
    "Removal cannnot be undone.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Remove", onPress: () => console.log("Remove Pressed") }
    ]
  );

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

export default class AllPatientsPage extends Component {
  state = {
    isModalVisible: false
  };
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
    this.state = {
      isModalVisible: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
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
      currentRole: "",
      specialistType: "",
      userType: "",
      categories: templateCategories,

    };
  }

  async componentDidMount(){
    try {
      const paramKey =
      this.props.route.params && this.props.route.params.participantsParam
        ? Object.keys(this.props.route.params.participantsParam)[0]
        : null;
    const paramValue = paramKey
      ? this.props.route.params.participantsParam[paramKey]
      : null;
    const res = await getParticipants(paramKey, paramValue);
        let temp = res.map(
          item => {
            let newI = item;
            newI.value = item.firstName && item.lastName ? (item.firstName + " " + item.lastName) : ""
            newI.key = parseInt(item.id);
            newI.gym = item.trainerLocation ? item.trainerLocation.name : '';
            newI.trainer = item.trainer ? item.trainer.firstName + " " + item.trainer.lastName : '';
            newI.dietician = item.dietitianLocation ? item.dietitianLocation.name : '';
            newI.nutritionist = item.dietitian ? item.dietitian.firstName + " " + item.dietitian.lastName : ''; 
            return newI; 
           
           })        
        const currentRole = await getCurrentRole();
        const specialistTypeRes = JSON.parse(await getSpecialistType());
        this.setState({
            calls: temp, 
            currentRole: JSON.parse(currentRole),
            specialistType: specialistTypeRes
          });
        

      
    } catch (e){
        console.log(e);
        alert("Could not fetch participants data");
    }
  }

  getHideSettingsIcon() {
    return this.props.route.params && this.props.route.params.hideSettingsIcon;
  }

  action() {
    if(this.getHideSettingsIcon()){
      this.props.navigation.goBack()
    }
    else{
      this.props.navigation.navigate("SettingsPage")
    }
  }

  openModal = async (participant) =>{
    // console.lo
    this.setState({
        isModalVisible:true,
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
}
  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Heading 
          title = "Participants"
          titleOnly = {false}
          displayAddButton = {false}
          displayBackButton = {this.getHideSettingsIcon()}
          displaySettingsButton = {!this.getHideSettingsIcon()}
          callback = {this.action}/>
        <ParticipantsList
            participantsInfo={this.state.calls}
            openModal={item => this.openModal(item)}
            showTrainer={this.state.specialistType === "TRAINER" || this.state.currentRole === "SUPER_ADMIN"}
            showDietitian={this.state.specialistType === "DIETITIAN" || this.state.currentRole === "SUPER_ADMIN"}
            listType="participants"
            showLocations={this.state.currentRole === "SUPER_ADMIN"}
        />      
        <DisplayModal 
            categories = {displayCategories} 
            fields = {this.state.categories}
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
