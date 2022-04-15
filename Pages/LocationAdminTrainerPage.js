import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getTrainers, getDietitians, createUser, getSpecialists, updateProfile, getLocationByID, formatSpecialists} from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
// import { getTrainers, getDietitians, getSpecialists } from "../APIServices/APIUtilities";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { getLocationIds } from "../APIServices/deviceStorage";

const defaultCategories = [
  {key: "firstName",          input: "text",      label: "First Name: ",          options: [], edit: true},
  {key: "lastName",           input: "text",      label: "Last Name: ",           options: [], edit: true},
  {key: "email",              input: "text",      label: "Email: ",               options: [], edit: true},
  {key: "phoneNumber",        input: "text",      label: "Phone Number: ",        options: [], edit: true},
  {key: "locationsString",    input: "picker",    label: "Location(s): ",            options: [], edit: true},
];

import { getCurrentRole, getLocationId, getSpecialistType } from '../APIServices/deviceStorage';

export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default class LocationAdminTrainerPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.callbackAction = this.callbackAction.bind(this)
    this.state = {
      edit: false,
      name: "",
      email: "",
      phone: "",
      isModalVisible: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      selectedUser: {},
      specialists: [],
      specialistType: "",
      categories: defaultCategories,
      adminLocations: [],
      contactInformation:{
        firstName: "",
        lastName: "",
        email:"",
        phoneNumber:""
      },
      updateUser:{
        user: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            id: "",
            isSuperAdmin: "false"
            },
            locationAssignments: [
            {
                locationId: "",
                userRoleType: ""
            },
            ]
      }
    };
  }

  async componentDidMount() {
    const specialistTypeRes = JSON.parse(await getSpecialistType());
    this.setState({specialistType: specialistTypeRes})
    this.setState({pageTitle: this.getUserType(true, specialistTypeRes)})
    await this.fetchInformation();
    let user = JSON.parse(await getUser())
    let userLocations = user.locations;
    console.log(user, "user^")
    let temp = userLocations.map(location => ({
      label: location.name, value: location.id
    }));
    this.setState({adminLocations: temp})
    let tempCat = JSON.parse(JSON.stringify(this.state.categories));
    for (field of tempCat) {
      if(field.key == "locationsString") field.options = this.state.adminLocations;
    }
    this.setState({categories: tempCat})
  }

  // given a list of location ids and a location type (gymId or dietitianOfficeId), returns a participant list
  getSpecialistsByLocationList = async (locationIds, specialistTypeParam) => {
    let rawSpecialists = [];
    for (let i = 0; i < 1; i++) {
      // for each location id, get participants at that location, add to a list
      let res = await getSpecialists(locationIds[i], specialistTypeParam);
      rawSpecialists.push(...res);
    }
    return rawSpecialists
}


  async fetchInformation() {
    try {
      const locationIds = await getLocationIds();
      let specialistUrlParam = "";

      let rawTrainerInfo = {}
      if (this.state.specialistType === "DIETITIAN") {
        specialistUrlParam = "dietitians"
      } else if (this.state.specialistType === "TRAINER") {
        specialistUrlParam = "trainers"
      } else {
        rawTrainerInfo = "specialistType not set";  
      }
      rawTrainerInfo = await this.getSpecialistsByLocationList(locationIds, specialistUrlParam)
      let formattedTrainerInfo = formatSpecialists(rawTrainerInfo)
      this.setState({specialists: formattedTrainerInfo});

    } catch (e) {
      console.log(e);
      alert("Could not fetch data.");
    }
  }

  openModal = item => {
    let admin = false
    if(item.roles.includes("SUPER_ADMIN")){
      admin = true
    }
    this.state.updateUser.user.firstName = item.firstName
    this.state.updateUser.user.lastName = item.lastName
    this.state.updateUser.user.email = item.email
    this.state.updateUser.user.phoneNumber= item.phoneNumber
    this.state.updateUser.user.isSuperAdmin = admin
    this.state.updateUser.user.id = item.id
    this.state.updateUser.locationAssignments[0].locationId = item.locations[0].id
    this.state.updateUser.locationAssignments[0].userRoleType = this.state.specialistType
    this.setState({
        isModalVisible:true,
        selectedUser: item,
    });
    // console.log(this.state.updateUser)
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  openAddModal = () => {
    this.setState({
      isAddModalVisible: true
    });
  };

  closeAddModal = () => {
    this.setState({
      isAddModalVisible: false
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

  //returns either trainer, trainers, dietitian, dietitians depending on context of user + plural
  getUserType(plural, userType) {
    let returnUserType = ""; 
    if (userType === "DIETITIAN") {
      returnUserType = "Dietitian";
    } else if (userType === "TRAINER") {
      returnUserType = "Trainer";
    } else {
      returnUserType = "User";
    }
    if (plural) {
      returnUserType = returnUserType + "s";
    }
    return returnUserType;
  }

  uploadUser = async newInformation => {
    if((newInformation.value != "") && 
        (newInformation.phoneNumber != "") && 
        (newInformation.email != "")) {
      let user = {
        user: {
          firstName: newInformation.firstName,
          lastName: newInformation.lastName,
          email: newInformation.email,
          phoneNumber: newInformation.phoneNumber,
          isSuperAdmin: "false"
        },
        locationAssignments: [
          {
            locationId: newInformation.locationsString,
            userRoleType: this.state.specialistType
          },
        ]
      }

      let res = await createUser(user);
      this.fetchInformation();
    }
  }

  updateInfo = async (newInformation) => {
    if(newInformation.firstName){
        this.state.updateUser.user.firstName = newInformation.firstName
    }
    if(newInformation.lastName){
        this.state.updateUser.user.lastName = newInformation.lastName
    }
    if(newInformation.email){
        this.state.updateUser.user.email = newInformation.email
    }
    if(newInformation.phoneNumber){
        this.state.updateUser.user.phoneNumber = newInformation.phoneNumber
    }
    if(newInformation.locations){
        let selectedLocation = await getLocationByID(newInformation.locations);
        let location = [{locationId:selectedLocation.id, userRoleType:this.state.specialistType}]
        this.state.updateUser.locationAssignments = location
    }
    console.log(this.state.updateUser)
    const res = await updateProfile(this.state.updateUser, this.state.updateUser.user.id)
    console.log(res)
    this.state.selectedTrainer = res
    await this.fetchInformation()
    // this.closeEditModal()
}

  render() {
    return (
      <View style={styles.container} >
        <Heading 
          title = {this.state.pageTitle}
          titleOnly = {false}
          displayAddButton = {true}
          displayBackButton = {false}
          displaySettingsButton = {false}
          callback = {this.openAddModal}/>
        <ParticipantsList
          isName = {true}
          participantsInfo={this.state.specialists}
          openModal={item => this.openModal(item)}
          listType={this.state.specialistType}/>   
        <DisplayModal 
            fields = {this.state.categories}
            information = {this.state.selectedUser}
            canEdit = {true}
            content = {this.state.specialistType == "DIETITIAN" ? "Dietitian" : "Trainer"} 
            title = {this.state.specialistType == "DIETITIAN" ? "Dietitian Information" : "Trainer Information"} 
            visible = {this.state.isModalVisible} 
            callback = {this.callbackAction}/> 
        <AddEditModal 
            fields = {this.state.categories} 
            isAdd = {true}
            title = {this.state.specialistType == "DIETITIAN" ? "Add Dietitian" : "Add Trainer"} 
            visible = {this.state.isAddModalVisible} 
            information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
            callback = {info => {
                if(info) this.uploadUser(info);
                this.closeAddModal();}}/>
        <AddEditModal 
            fields = {this.state.categories} 
            isAdd = {false}
            title = {this.state.specialistType == "DIETITIAN" ? "Edit Dietitian Information" : "Edit Trainer Information"} 
            visible = {this.state.isEditModalVisible} 
            information = {this.state.selectedUser}
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