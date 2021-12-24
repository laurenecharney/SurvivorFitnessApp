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
  Settings
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { AlphabetList } from "react-native-section-alphabet-list";
import { getParticipants, getParticipantByID } from "../APIServices/APIUtilities";
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
         //name: (res.firstName + " " + res.lastName),
         //dietician: (res.dietitian.firstName+ " " + res.dietitian.lastName),
         //trainer: (res.trainer.firstName+ " " + res.trainer.lastName),
         //age: res.age,
         //email: res.email,
         //phoneNumber: res.phoneNumber,
         //cancer: res.typeOfCancer,
         //formsOfTreatments: res.formsOfTreatment,
         //goals: res.goals,
         //doctNotes: res.physicianNotes,
         //startDate: res.startDate.substring(0,10),
         //surgeries: res.surgeries,
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
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 25
          }}
        >
          {this.getHideSettingsIcon() && 
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon3 name={"keyboard-arrow-left"} size={50} color={"#BEBEBE"} />
          </TouchableOpacity>
  }
          <Text style={styles.headline}>Participants</Text>
          {!this.getHideSettingsIcon() && (
            <TouchableOpacity
              style={{ paddingLeft: 87 }}
              onPress={() =>
                this.props.navigation.navigate("TrainerSettingsPage")
              }
            >
              <Icon2 style={styles.settings} size={30} name={"settings"} />
              {/* <Image source={require('../assets/Group -1.png')} style={styles.logo} /> */}
            </TouchableOpacity>
          )}
        </View>
        <ParticipantsList
            participantsInfo={this.state.calls}
            openModal={item => this.openModal(item)}
            showTrainer={this.state.currentRole === "TRAINER"}
            showDietitian={this.state.currentRole === "DIETITIAN"}
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
          <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '70%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:30}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                                        <Text style={{fontSize: 19, color: '#AED803', fontWeight: "500"}} >Participant Information</Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Name: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.value}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Age: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.age}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Email: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.email}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Phone Number: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.phoneNumber}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Type of Cancer: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.typeOfCancer}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Treatment Facility: </Text>
                                            <Text style={styles.modalText}>Fill</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Surgeries: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.surgeries}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Forms of Treatment: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.formsOfTreatment}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Physician Notes: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.physicianNotes}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Trainer: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.trainer}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Dietitian: </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.nutritionist}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Start Date: </Text>
                                            <Text style={styles.modalText}>{this.state.startDate}</Text>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <Text style={styles.modalLabel} >Goal(s): </Text>
                                            <Text style={styles.modalText}>{this.state.selectedParticipant.goals}</Text>
                                        </View>
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
    marginLeft: 25,
    padding: 25,
    color: "#AED803",
    fontWeight: "500"
  },
  modalLabel: {
    fontSize: 15,
    color: '#AED803'
  },
  modalText: {
    color: '#797979'
  },
  modalRow: {
    flexDirection:"row",
    paddingBottom:25,
    width:'75%'
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
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60
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
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15
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
  }
});
