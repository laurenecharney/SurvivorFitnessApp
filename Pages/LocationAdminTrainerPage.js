import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getTrainers, getDietitians, getSpecialists } from "../APIServices/APIUtilities";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { getLocationIds } from "../APIServices/deviceStorage";

const categories = {
  firstName: "First name: ",
  lastName: "Last name: ",
  phoneNumber: "Phone Number: ",
  email: "Email: "
};
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
    };
  }

  async componentDidMount() {
    const specialistTypeRes = JSON.parse(await getSpecialistType());
    this.setState({specialistType: specialistTypeRes})
    this.setState({pageTitle: this.getUserType(true, specialistTypeRes)})
    await this.fetchInformation();
  }

  // given a list of location ids and a location type (gymId or dietitianOfficeId), returns a participant list
  getSpecialistsByLocationList = async (locationIds, specialistTypeParam) => {
    let rawSpecialists = [];

    for (let i = 0; i < 1; i++) {

      // for each location id, get participants at that location, add to a list
      let res = await getSpecialists(locationIds[i], specialistTypeParam, );
      rawSpecialists.push(...res);
    }
    return rawSpecialists
}


  async fetchInformation() {
    try {
      const locationIds = await getLocationIds();
      console.log("locationIds: ", locationIds);
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

  getDummyLocationIds() {
    
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
            categories = {categories} 
            information = {this.state.selectedUser}
            canEdit = {true}
            content = "Trainers" 
            title = "Trainer Information" 
            visible = {this.state.isModalVisible} 
            callback = {this.closeModal}/>
        <AddEditModal 
            categories = {categories} 
            isAdd = {true}
            title = {this.state.specialistType == "DIETITIAN" ? "Add Dietitian" : "Add Trainer"} 
            visible = {this.state.isAddModalVisible} 
            information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
            callback = {this.closeAddModal}
            userType = {this.state.specialistType}/>
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