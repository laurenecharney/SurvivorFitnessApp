import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getTrainers, getDietitians } from "../APIServices/APIUtilities";
import { AlphabetList } from "react-native-section-alphabet-list";
import ModalHeader from "../Components/ModalComponents/ModalHeader";
import InformationRow from "../Components/ModalComponents/InformationRow";
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
import { ParticipantsList } from '../Components/ParticipantsList';
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
    //TODO
    
    const specialistTypeRes = JSON.parse(await getSpecialistType());
    this.setState({specialistType: specialistTypeRes})
    this.setState({pageTitle: this.getUserType(true, specialistTypeRes)})
    await this.fetchInformation();
  }

  async fetchInformation() {

    
    try {
      const locationId = await getLocationId();

      let rawTrainerInfo = {}
      console.log("specialistType", this.state.specialistType)
      if (this.state.specialistType === "DIETITIAN") {
        console.log("get dietitians")
        rawTrainerInfo = await getDietitians(locationId)
      } else {
        console.log("get Trainers")
        console.log("locationId", locationId)
        rawTrainerInfo = await getTrainers(locationId)
      }

          if (this.props.route.params) {
              console.log(this.props.route.params.userType, "\nUSERTYPE^")
          } else {
            console.log("no params")
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
    console.log(item)
    this.setState({
      isModalVisible:true,
      selectedTrainer: item,
      name: item.value
  });
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

  openEditModal = () =>{
    this.setState({
        isEditModalVisible:true,
        edit: true
    })
  }
  toggleEditModal = () =>{
      this.setState({
          isEditModalVisible:!this.state.isEditModalVisible
      })
  }
  closeEditModal = () =>{
      this.setState({
          isEditModalVisible:false,
          edit: false
      })
  }
  openAddModal = () => {
    this.setState({
      isAddModalVisible: true
    });
  };

  toggleAddModal = () => {
    this.setState({
      isAddModalVisible: !this.state.isAddModalVisible
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
        <View style={styles.heading}>
          <Text style={styles.headline}>{this.state.pageTitle}</Text>
          <View style={styles.addButtonContainer} >
            <TouchableOpacity onPress={()=>this.openAddModal()}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
           </View>
        </View>
        
          { true ?
            <ParticipantsList
                    participantsInfo={this.state.specialists}
                    openModal={item => this.openModal(item)}
                    listType={this.state.specialistType}
                />   
          :
          <View style={styles.listContainer}>
          <AlphabetList
            data={this.state.specialists}
            indexLetterSize={46}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
              <View style={{ visibility: "hidden" }} />
              // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
              // <View style={styles.sectionHeaderContainer}>
              //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
              // </View>
            )}
            renderCustomItem={item => (
              <View style={styles.row}>
                <View>
                  <View style={styles.nameContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        const routeParams =
                          this.props.route.params &&
                          this.props.route.params.userType === "DIETITIAN"
                            ? {
                                hideSettingsIcon: true,
                                participantsParam: {dietitianUserId: item.id}
                              }
                            : {
                                hideSettingsIcon: true,
                                participantsParam: {trainerUserId: item.id}
                              };
                        console.log("ROUTE PARAMS");
                        console.log(routeParams);
                        this.props.navigation.navigate(
                          "AllPatientsPage",
                          routeParams
                        );
                      }}
                    >
                      <View style={styles.locationContainer}>
                        <Text style={styles.nameTxt}>{item.value}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openModal(item)} style={styles.infoButton}>
                      <Text style={styles.infoTxt}>i</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          </View>
                    }
        
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
                          <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                          <Text style={{ fontSize: 19, color: "#AED803" }}>{this.getUserType(false) + " Information"}</Text>
                          </View>
                          <View style={styles.informationModalContainer}>
                            <View  style={{justifyContent: 'space-between'}}>
                              <TouchableOpacity onPress={()=>this.openEditModal()}>
                                  <Text style = {styles.editStyle}>edit</Text>
                              </TouchableOpacity>
                            </View>
                            <InformationRow title = "Name: " value = {this.state.name}/>
                            <InformationRow title = "Email: " value = {this.state.email}/>
                            <InformationRow title = "Phone Number: " value = {this.state.phoneNumber}/>
                          </View>
                      </ScrollView>
                  </View>

              </View>
            </View>
            <Modal 
              propagateSwipe={true} 
              animationIn="slideInUp" 
              animationOut="slideOutDown" 
              onBackdropPress={()=>this.closeEditModal()} 
              onSwipeComplete={()=>this.closeEditModal()} 
              isVisible={this.state.isEditModalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.editModalStyle}>
                  <TouchableOpacity style={styles.close} onPress={()=>this.closeEditModal()}>
                      <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={styles.modalHeaderContainer}>
                        <ModalHeader title = "Edit Information"/>
                      </View>
                      <View style={{marginLeft:40,  paddingTop:10, paddingBottom:10, width:'75%'}}>
                        <EditInformationRow title = "Name: " value = {this.state.name} edit = {this.state.edit}/>
                        <EditInformationRow title = "Phone Number: " value = {this.state.phoneNumber} edit = {this.state.edit}/>
                        <EditInformationRow title = "Email: " value = {this.state.email} edit = {this.state.edit}/>
                        <RemoveButton/>
                        <AppButton
                            title={this.state.edit ? "SAVE" : "EDIT"}
                            onPress={() => {()=>this.closeEditModal()}}
                            />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>  
            </Modal>
        </Modal>
        <Modal
          propagateSwipe={true}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => this.closeAddModal()}
          onSwipeComplete={() => this.closeAddModal()}
          isVisible={this.state.isAddModalVisible}>
          <View style={styles.modalContainer}>
                <View style={styles.editModalStyle}>
              <TouchableOpacity style={styles.close} onPress={() => this.closeAddModal()}>
                <Icon name={"close"} color={"#E4E4E4"} size={32} />
              </TouchableOpacity>
              <View style={{ flex: 1, width: '75%', alignSelf: 'center' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={{paddingBottom:10, width:'100%'}}>
                    <Text style={styles.modalText}>{"Add " + this.getUserType(false)}</Text>
                  </View>
                  <EditInformationRow title = "Name: " value = "" edit = {true}/>
                  <EditInformationRow title = "Phone Number: " value = "" edit = {true}/>
                  <EditInformationRow title = "Email: " value = "" edit = {true}/>
                  <View style={{marginTop: 20}}>
                      <AppButton title = {"Add"}/>
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
  paddingTop: 30,
  paddingBottom: 30,
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
icon:{
    color: '#E4E4E4',
    position: 'relative'
},
addButtonContainer: {
  backgroundColor:'#AED804',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 10,
  width: 48,
  alignSelf: "center",
  margin: 5,
  marginTop: 50
},
addButtonText: {
  fontSize: 18,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
},
modalText:{
        fontSize: 18,
        paddingTop: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "#AED803",
},
appButtonContainer: {
    backgroundColor:'#AED804',
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
    alignSelf: "center",
},
editStyle: {
    fontSize: 14,
    color: "#AED803",
    alignSelf: "center",
    alignSelf: 'flex-end'
},   
sectionHeaderContainer:{
    backgroundColor: '#E4E4E4'
},
sectionHeaderLabel:{
    fontSize: 16,
    paddingLeft: 10
},
listContainer:{
    paddingBottom: '33%'
},
modalHeaderContainer:{
    marginLeft:40, 
    borderBottomWidth:1, 
    borderBottomColor: "#E4E4E4", 
    paddingBottom:20, 
    width:'75%'
},
locationContainer:{
  flexDirection: "row", 
  justifyContent: "space-between"
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
  height: '40%',
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
editModalStyle:{
    backgroundColor: "#fff",
    width: '90%',
    height: '60%',
    borderRadius:19
},
addNewModalStyle:{
    backgroundColor: "#fff",
    width: '90%',
    height: '60%',
    borderRadius:19
}
});
