import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getCurrentRole } from "../APIServices/deviceStorage";
import { Heading } from '../Components/Heading';
import { DisplayModal } from "../Components/ModalComponents/DisplayModal";

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
      currentRole: ""
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
           
          }
        )
        
        const currentRole = await getCurrentRole();
        console.log("currentRole", currentRole);
        this.setState({calls: temp, currentRole: JSON.parse(currentRole)});
      
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
      this.props.navigation.navigate("TrainerSettingsPage")
    }
  }

  openModal = async (participant) =>{
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
            showLocations={true}
            showTrainer={true}
            showDietitian={true}
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
