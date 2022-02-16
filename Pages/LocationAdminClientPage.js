import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
  Button,
  TextInput
} from "react-native";
//import AlphabetList from "react-native-flatlist-alphabet";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from "react-native-dropdown-picker";
import { AlphabetList } from "react-native-section-alphabet-list";
import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import ModalHeader from "../Components/ModalComponents/ModalHeader";
import InformationRow from "../Components/ModalComponents/InformationRow";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getCurrentRole } from "../APIServices/deviceStorage";
export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default class LocationAdminClientPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isAddModalVisible: false,
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
    //TODO
    await this.refreshParticipants();
    const currentRole = await getCurrentRole();
    console.log("My role is:\n", currentRole);
  }

  isDietitian() {
    return (
      this.props.route.params &&
      this.props.route.params.userType === "DIETITIAN"
    );
  }

  async refreshParticipants() {
    console.log("refresh participants - locationAdminClientPage")
    try {
      const locationId = this.props.route.params
        ? this.props.route.params.locationId
        : null;
      const res =  
      this.isDietitian() ? await getParticipants("dietitianOfficeId", locationId) : await getParticipants("gymId", locationId);
      this.setState({
        participants: res.map(item => {
          let newI = item;

          newI.value =
            item.firstName && item.lastName
              ? item.firstName + " " + item.lastName
              : "";
          newI.key = parseInt(item.id);
          newI.trainer = item.trainer
            ? item.trainer.firstName + " " + item.trainer.lastName
            : "";
          newI.nutritionist = item.dietitian
            ? item.dietitian.firstName + " " + item.dietitian.lastName
            : "";
          return newI;
        })
      });
      console.log(res)
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

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
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

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.heading}>
          <Text style={styles.headline}>Participants</Text>
        </View>
        <ParticipantsList
            participantsInfo={this.state.participants}
            openModal={item => this.openModal(item)}
            showTrainer={!this.isDietitian()}
            showDietitian={this.isDietitian()}
            listType="participants"
          />
        <Modal 
          propagateSwipe={true} 
          animationIn="slideInUp" 
          animationOut="slideOutDown" 
          onBackdropPress={()=>this.closeModal()} 
          onSwipeComplete={()=>this.closeModal()} 
          isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
              <View style={styles.modalStyle}>
                  <TouchableOpacity style={styles.close} onPress={()=>this.closeModal()}>
                      <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={styles.modalHeaderContainer}>
                          <ModalHeader title = "Participant Information"/>
                      </View>
                      <View style={styles.informationModalContainer}>
                          <InformationRow title = "Name: " value = {this.state.selectedParticipant.value}/>
                          <InformationRow title = "Age: " value = {this.state.selectedParticipant.age}/>
                          <InformationRow title = "Email: " value = {this.state.selectedParticipant.email}/>
                          <InformationRow title = "Phone Number: " value = {this.state.selectedParticipant.phoneNumber}/>
                      </View>
                      <View style={styles.informationModalContainer}>
                          <InformationRow title = "Type of Cancer: " value = {this.state.selectedParticipant.typeOfCancer}/>
                          <InformationRow title = "Treatment Facility: " value = "Fill"/>
                          <InformationRow title = "Surgeries: " value = {this.state.selectedParticipant.surgeries}/>
                          <InformationRow title = "Forms of Treatment: " value = {this.state.selectedParticipant.formsOfTreatment}/>
                          <InformationRow title = "Physician Notes: " value = {this.state.selectedParticipant.physicianNotes}/>
                      </View>
                      <View style={styles.informationModalContainer}>
                          <InformationRow title = "Trainer: " value = {this.state.selectedParticipant.trainer}/>
                          <InformationRow title = "Dietician: " value = {this.state.selectedParticipant.nutritionist}/>
                          <InformationRow title = "Start Date: " value = {this.state.selectedParticipant.startDate}/>
                          <InformationRow title = "Goal(s): " value = {this.state.selectedParticipant.goals}/>
                      </View>
                    </ScrollView>
                  </View>
              </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 10,
    padding: 25,
    color: '#AED803',
    fontWeight: '400',
},
iconContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:35,
    height:35,
    backgroundColor:'#F8F8F8',
    borderRadius:6,
},
container:{
    flex: 1, 
    backgroundColor:'#fff'
},
heading:{
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingRight : 25,
    borderColor: '#E4E4E4',
    borderBottomWidth: 1
},
  row: {
    flexDirection: 'row',
    borderColor: '#E6E6E6',
    backgroundColor: '#fff',
    borderBottomWidth: 0.25,
    borderTopWidth:0.25,
    paddingTop: 35,
    paddingBottom: 35,
    width:"85%",
    alignSelf:'center',
    paddingRight:10,
    justifyContent: 'center', //Centered horizontally
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: "90%",
    paddingLeft:10,
  },
  nameTxt: {
      fontWeight: '400',
      color: '#3E3E3E',
      fontSize: 18,
      width: "100%",
  },
  appButtonContainer: {
    backgroundColor: "#AED804",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: 150,
    alignSelf: "center",
    margin: 10
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center"
  },  modalText: {
    fontSize: 18,
    paddingTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#AED803"
  },
  addNewContainer: {
    backgroundColor: "#AED804",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 75,
    alignSelf: "center",
    margin: 5,
    marginTop: 50
  },
  addNewText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center"
  },
  editStyle: {
    fontSize: 14,
    color: "#AED803",
    alignSelf: "center",
    alignSelf: 'flex-end'
  },
  appButtonContainer: {
    backgroundColor: "#AED804",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: 150,
    alignSelf: "center",
    margin: 10
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center"
  },

  child: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    width: "75%",
    borderRadius: 5,
    alignSelf: "center"
  },
  childText: {
    fontSize: 13,
    color: "#B7DC21",
    marginLeft: 30,
    padding: 12
  },
  sectionHeaderContainer: {
    backgroundColor: "#E4E4E4"
  },
  sectionHeaderLabel: {
    fontSize: 16,
    paddingLeft: 10
  },
  listContainer: {
    paddingBottom: "33%"
  },
  infoButton:{
    borderWidth:1,
    borderColor:"#AED803",
    alignItems:'center',
    justifyContent:'center',
    width:25,
    height:25,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  infoTxt:{
      color:"#AED803" 
  },
  descriptionContainer:{
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  modalContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalStyle:{
    backgroundColor: "#fff",
    width: '90%',
    height: '90%',
    borderRadius: 19
  },
  editModalStyle:{
    backgroundColor: "#fff",
    width: '90%',
    height: '60%',
    borderRadius: 19
  },
  close:{
    paddingLeft:260,
    paddingTop:30
  },
  informationModalContainer:{
    marginLeft:40,  
    paddingTop:10, 
    paddingBottom:10, 
    width:'75%'
  },
  modalHeaderContainer:{
    marginLeft:40, 
    borderBottomWidth:1, 
    borderBottomColor: "#E4E4E4", 
    paddingBottom:20, 
    width:'75%'
},
});
