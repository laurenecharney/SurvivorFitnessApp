import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getTrainers, getDietitians, createUser} from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const defaultCategories = [
  {key: "firstName",          input: "text",      label: "First Name: ",          options: []},
  {key: "lastName",           input: "text",      label: "Last Name: ",           options: []},
  {key: "email",              input: "text",      label: "Email: ",               options: []},
  {key: "phoneNumber",        input: "text",      label: "Phone Number: ",        options: []},
  {key: "locations",          input: "picker",    label: "Choose Location: ",     options: []},
];

const displayCategories = {
  firstName: "First name: ",
  lastName: "Last name: ",
  phoneNumber: "Phone Number: ",
  email: "Email: "
};



import { AlphabetList } from "react-native-section-alphabet-list";
import ModalHeader from "../Components/ModalComponents/ModalHeader";
import InformationRow from "../Components/ModalComponents/InformationRow";
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
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
    this.state = {
      edit: false,
      name: "",
      email: "",
      phone: "",
      isModalVisible: false,
      isAddModalVisible: false,
      isGymModalVisible: false,
      isEditModalVisible: false,
      selectedUser: {},
      specialists: [],
      specialistType: "",
      categories: defaultCategories,
      adminLocations: [],
    };
  }

  async componentDidMount() {
    const specialistTypeRes = JSON.parse(await getSpecialistType());
    this.setState({specialistType: specialistTypeRes})
    this.setState({pageTitle: this.getUserType(true, specialistTypeRes)})
    await this.fetchInformation();

    let userLocations = JSON.parse(await getUser()).locations;
    let temp = userLocations.map(location => ({
      label: location.name, value: location.id
    }));
    this.setState({adminLocations: temp})

    let tempCat = JSON.parse(JSON.stringify(this.state.categories));
    for (field of tempCat) {
      if(field.key == "locations") field.options = this.state.adminLocations;
    }
    this.setState({categories: tempCat})
  }

  async fetchInformation() {
    try {
      const locationId = await getLocationId();
      let rawTrainerInfo = {}
      if (this.state.specialistType === "DIETITIAN") {
        rawTrainerInfo = await getDietitians(locationId)
      } else if (this.state.specialistType === "TRAINER") {
        rawTrainerInfo = await getTrainers(locationId)
      } else {
        rawTrainerInfo = "specialistType not set";  
      }
      this.setState({
        specialists: rawTrainerInfo.map(rawTrainer => {
          let formattedTrainer = JSON.parse(JSON.stringify(rawTrainer));
          formattedTrainer.value = rawTrainer.firstName + " " + rawTrainer.lastName;
          formattedTrainer.id = parseInt(rawTrainer.id);
          formattedTrainer.key = parseInt(rawTrainer.id);
          formattedTrainer.gym = rawTrainer.locations[0] ? rawTrainer.locations[0].name : "";
          return formattedTrainer;
        })
      });
    } catch (e) {
      console.log(e);
      alert("Could not fetch data.");
    }
  }

  openModal = item => {
    this.setState({
      isModalVisible:true,
      selectedUser: item,
      name: item.value
    });
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
    console.log("newInfo:", newInformation);
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
            locationId: newInformation.locations,
            userRoleType: this.state.specialistType
          },
        ]
      }
      console.log("user about to be APIed", user);
      await createUser(user);
      this.fetchInformation();
    }
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
          participantsInfo={this.state.specialists}
          openModal={item => this.openModal(item)}
          listType={this.state.specialistType}/>   
        <DisplayModal 
            categories = {displayCategories} 
            fields = {this.state.categories}
            information = {this.state.selectedUser}
            canEdit = {true}
            content = "Trainers" 
            title = "Trainer Information" 
            visible = {this.state.isModalVisible} 
            callback = {this.closeModal}/>
        <AddEditModal 
            fields = {this.state.categories} 
            isAdd = {true}
            title = {this.state.specialistType == "DIETITIAN" ? "Add Dietitian" : "Add Trainer"} 
            visible = {this.state.isAddModalVisible} 
            information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
            callback = {info => {
              this.closeAddModal();
              if(info) this.uploadUser(info);
            }}/>
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