import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getTrainers, getDietitians } from "../APIServices/APIUtilities";
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const categories = {
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
    };
  }

  async componentDidMount() {
    const specialistTypeRes = JSON.parse(await getSpecialistType());
    this.setState({specialistType: specialistTypeRes})
    this.setState({pageTitle: "hello" + this.getUserType(true, specialistTypeRes)})
    await this.fetchInformation();
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
        console.log("specialistType: ", specialistType)
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
            title = "Add Trainer" 
            visible = {this.state.isAddModalVisible} 
            information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
            callback = {this.closeAddModal}/>
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