import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
import InformationRow from "../Components/ModalComponents/InformationRow";
import ModalHeader from "../Components/ModalComponents/ModalHeader";
import { ParticipantsList } from "../Components/ParticipantsList";
import { getUser, getCurrentRole } from "../APIServices/deviceStorage";

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

export default class AllPatientsPage extends Component {
  state = {
    isModalVisible: false
  };
  constructor(props) {
    super(props);
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

  render() {
    return (
      <View style={styles.container} >
        <View>
          {this.getHideSettingsIcon() && 
            <View style={styles.backHeading}>
              <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                <Icon3 name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"}  />
              </TouchableOpacity>
              <Text style={styles.backHeadline}>Participants</Text>
            </View>
          }
          {!this.getHideSettingsIcon() && (
            <View style={styles.settingsHeading}>
              <Text style={styles.headline}>Participants</Text>
              <TouchableOpacity
                style={{ paddingLeft: 125 }}
                onPress={() =>
                  this.props.navigation.navigate("TrainerSettingsPage")
                }
              >
                <Icon2 style={styles.settings} size={30} name={"settings"} />
                {/* <Image source={require('../assets/Group -1.png')} style={styles.logo} /> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ParticipantsList
            participantsInfo={this.state.calls}
            openModal={item => this.openModal(item)}
            showTrainer={this.state.currentRole === "TRAINER"}
            showDietitian={this.state.currentRole === "DIETITIAN"}
            listType="participants"
            // showLocations={true}
            // showDietitian={true}
        />        
        <Modal
          propagateSwipe={true}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => this.closeModal()}
          onSwipeComplete={() => this.closeModal()}
          isVisible={this.state.isModalVisible}
        >
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
                  <View style={styles.modalInformationContainer}>
                      <InformationRow title = "Name: " value = {this.state.selectedParticipant.value}/>
                      <InformationRow title = "Age: " value = {this.state.selectedParticipant.age}/>
                      <InformationRow title = "Email: " value = {this.state.selectedParticipant.email}/>
                      <InformationRow title = "Phone Number: " value = {this.state.selectedParticipant.phoneNumber}/>
                  </View>
                  <View style={styles.modalInformationContainer}>
                      <InformationRow title = "Type of Cancer: " value = {this.state.selectedParticipant.typeOfCancer}/>
                      <InformationRow title = "Treatment Facility: " value = "Fill"/>
                      <InformationRow title = "Surgeries: " value = {this.state.selectedParticipant.surgeries}/>
                      <InformationRow title = "Forms of Treatment: " value = {this.state.selectedParticipant.formsOfTreatment}/>
                      <InformationRow title = "Physician Notes: " value = {this.state.selectedParticipant.physicianNotes}/>
                  </View>
                  <View style={styles.modalInformationContainer}>
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
  container:{
    flex: 1, 
    backgroundColor:'#fff'
  },
  settingsHeading:{
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      paddingRight : 25,
      borderColor: '#E4E4E4',
      borderBottomWidth: 1
  },
  headline: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 10,
    padding: 25,
    color: '#AED803',
    fontWeight: '400',
  },
  backHeading:{
    flexDirection: "row", 
  },
  backHeadline: {
      fontSize: 25,
      marginTop: 50,
      paddingTop: 25,
      paddingBottom:25,
      color: "#AED803",
      fontWeight: "400",
      textAlign:'left'
  },
  backButton:{
      color: "#E4E4E4",
      marginTop: 65,
  },
  settings: {
    color: "#E4E4E4",
    marginTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 0,
    marginRight: 30
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    padding: 50
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    fontWeight: "400",
    color: "#3E3E3E",
    fontSize: 18,
    width: 170
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
    fontSize: 12,
    color: "#fff",
    alignSelf: "center"
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
modalContainer:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
},
modalStyle:{
  backgroundColor: "#fff",
  width: '90%',
  height: '70%',
  borderRadius:19
},
modalInformationContainer:{
  marginLeft:40, 
  borderBottomWidth:1, 
  borderBottomColor: "#E4E4E4", 
  paddingTop:10, 
  paddingBottom:10, 
  width:'75%'
},
close:{
  paddingLeft:260, 
  paddingTop:30
},
modalHeaderContainer:{
  marginLeft:40, 
  borderBottomWidth:1, 
  borderBottomColor: "#E4E4E4", 
  paddingBottom:20, 
  width:'75%'},
});
