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
        <View style={styles.pageContainer}>
          <Text style={styles.headline}>Participants</Text>
        </View>
        <View style={styles.listContainer}>
          <AlphabetList
            data={this.state.participants}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
              <View style={{ visibility: "hidden" }} />
              // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
              // <View style={styles.sectionHeaderContainer}>
              //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
              // </View>
            )}
            renderCustomItem={(item, i) => (
              // <ScrollView key={i}>
                <View style={styles.row} key={i}>
                  <View>
                    <View style={styles.nameContainer}>
                      <TouchableOpacity 
                        onPress={() => {
                            const routeParams =
                                {
                                    id: item.id,
                                    name: item.firstName + ' ' + item.lastName
                                } ;
                            this.props.navigation.navigate('ClientInformationPage', routeParams);
                        }}
                      >
                        <Text style={styles.nameTxt}>{item.value} </Text>
                        <View style={styles.descriptionContainer}>
                          <Icon name={this.isDietitian() ? "food-apple" : "dumbbell"} color={"#AED803"} />
                          <Text style={styles.gymTxt}> {this.isDietitian() ? item.nutritionist : item.trainer} </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.openModal(item)} style={styles.infoButton}>
                        <Text style={styles.infoTxt}>i</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              // </ScrollView>
            )}
          />
        </View>
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
    marginLeft: 15,
    padding: 25,
    color: "#AED803"
  },
  container:{
    flex: 1, 
    backgroundColor:'#fff'
  },
  heading:{
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      paddingRight : 25
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    padding: 40
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    fontWeight: "600",
    color: "#3E3E3E",
    fontSize: 20,
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
    fontSize: 18,
    color: "#fff",
    alignSelf: "center"
  },
  gymTxt: {
    color: "#cfcfcf",
    fontSize: 12,
    width: 170,
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
    height: '70%',
    borderRadius: 19
  },
  close:{
    paddingLeft:260,
    paddingTop:30
  },
  informationModalContainer:{
    marginLeft:40, 
    borderBottomWidth:1, 
    borderBottomColor: "#E4E4E4", 
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
