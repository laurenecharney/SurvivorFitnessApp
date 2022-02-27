import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AlphabetList} from "react-native-section-alphabet-list";
import {getParticipants, getParticipantByID, addParticipant} from '../APIServices/APIUtilities';
import ModalHeader from '../Components/ModalComponents/ModalHeader';
import InformationRow from '../Components/ModalComponents/InformationRow';
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
import { ParticipantsList } from '../Components/ParticipantsList';


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const categories = {
    firstname: "First Name: ",
    lastname: "Last Name: ",
    age: "Age: ",
    email: "Email: ",
    phoneNumber: "Phone Number: ",
    gym: "Gym: ",
    dieticianOffice: "Dietician Office: ",
    startDate: "Start Date: ",
    goals: "Goal(s): ",
    // numberOfTrainings: "Number of Trainings: ",
    // numberOFAppointments: "Number of Appointments: ",
};

export default class AdminClientPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            calls: [],
            selectedParticipant: {},
            newParticipant: [
                {id: "firstname", val: "",},
                {id: "lastname", val: "",},
                {id: "age", val: "",},
                {id: "email", val: "",},
                {id: "phoneNumber", val: "",},
                {id: "gym", val: "",},
                {id: "dieticianOffice", val: "",},
                {id: "startDate", val: "",}, //probs want another datepicker
                {id: "goals", val: "",},
                {id: "numberOfTrainings", val: 24,},
                {id: "numberOFAppointments", val: 3}],
            //a way to implement editing a participant is preloading values on edit modal open,
            //then changing as the user changes values, then sending to endpoint
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    async componentDidMount(){
        try {
            const res = await getParticipants(null,null);
           this.setState({calls: res
               .map(
               item => {
                let newI = item;
                newI.value = item.firstName && item.lastName ? (item.firstName + " " + item.lastName) : ""
                newI.key = parseInt(item.id);
                newI.gym = item.trainerLocation ? item.trainerLocation.name : '';
                newI.trainer = item.trainer ? item.trainer.firstName + " " + item.trainer.lastName : '';
                newI.dietician = item.dietitianLocation ? item.dietitianLocation.name : '';
                newI.nutritionist = item.dietitian ? item.dietitian.firstName + " " + item.dietitian.lastName : ''; 
                return newI; 
               
               })})
          
       } catch (e){
           console.log(e);
           alert("Could not fetch participants data");
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
    toggleModal = () =>{
        this.setState({
            isModalVisible:!this.state.isModalVisible
        })
    }
    closeModal = () =>{
        this.setState({
            isModalVisible:false
        })
    }
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
    openAddModal = () =>{
        this.setState({
            isAddModalVisible:true
        })
    }
    toggleAddModal = () =>{
        this.setState({
            isAddModalVisible:!this.state.isModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false
        })
    }
    renderModalSection = () => {

    }

    setNPVal = (key, value) => {
        let temp = this.state.newParticipant.map(row => 
            ({id: row.id, val: row.id===key ? value : row.val}));
        this.setState({
            newParticipant: temp
        })
    }

    createNewParticipant = () => {
        let participant = {};
        for (const row of this.state.newParticipant) {
            participant[row.id] = row.val;
        }
        addParticipant(participant);
    }

    render() {
        return(
            <View style={styles.container} >
                <View style={styles.pageContainer}>
                    <Text style={styles.headline}>Participants</Text>
                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.listContainer}> */}
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    showLocations={true}
                    showTrainer={true}
                    showDietitian={true}
                />   
                {/* </View> */}
                <Modal 
                    propagateSwipe={true} 
                    animationIn="slideInUp" 
                    animationOut="slideOutDown" 
                    onBackdropPress={()=>this.closeModal()} 
                    onSwipeComplete={()=>this.closeModal()} 
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalStyle}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:30}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={styles.modalHeaderContainer}>
                                        <ModalHeader title = "Participant Information"/>
                                    </View>
                                    <View style={styles.modalInformationContainer}>
                                        <View  style={{justifyContent: 'space-between'}}>
                                            <TouchableOpacity onPress={()=>this.openEditModal()}>
                                                <Text style = {styles.editStyle}>edit</Text>
                                            </TouchableOpacity>
                                        </View>
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
                    <Modal 
                        propagateSwipe={true} 
                        animationIn="slideInUp" 
                        animationOut="slideOutDown" 
                        onBackdropPress={()=>this.closeEditModal()} 
                        onSwipeComplete={()=>this.closeEditModal()} 
                        isVisible={this.state.isEditModalVisible}>
                        <View style={styles.modalStyle}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={{paddingLeft:260, paddingTop:30}} onPress={()=>this.closeEditModal()}>
                                    <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                        <View style={styles.modalHeaderContainer}>
                                            <ModalHeader title = "Edit Participant Information"/>
                                        </View>
                                        <View style={{marginLeft:40,  paddingTop:10, paddingBottom:10, width:'75%'}}>
                                            {
                                                Object.keys(categories).map(key => (
                                                <EditInformationRow
                                                    key = {key}
                                                    title={categories[key]}
                                                    callback={() => console.log("clicked on edit "+key)}
                                                    />
                                                ))
                                            }
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
                    onBackdropPress={()=>this.closeAddModal()} 
                    onSwipeComplete={()=>this.closeAddModal()} 
                    transparent={true} 
                    isVisible={this.state.isAddModalVisible}>
                    <View style={styles.modalStyle}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeAddModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1, width: '75%', alignSelf: 'center'}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:10, width:'100%'}}>
                                        <Text style={styles.modalText} >Add Participant</Text>
                                    </View>
                                    {Object.keys(categories).map(key => (
                                        <EditInformationRow
                                            key = {key}
                                            title={categories[key]}
                                            callback={value => this.setNPVal(key, value)}
                                            />
                                        /** TODO
                                         * test add participant form - use console.log
                                         * api call? 
                                         * after merge, create default vals for number of sessions
                                         */
                                    ))}
                                    <View style={{marginTop: 20}}>
                                        <AppButton 
                                            title = {"Add"}
                                            onPress = {() => {
                                                this.createNewParticipant();
                                                this.closeAddModal();
                                                }}/>
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

//diff sections of the modal for attributes to display. 
//Each one contains a prop name + key 

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:'#fff'
    },
    pageContainer:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25,
        borderColor: '#E4E4E4',
        borderBottomWidth: 1
    },
    participantOverviewRow:{
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    headline: {
        fontSize: 25,
        marginTop: 50,
        marginLeft: 10,
        padding: 25,
        color: '#AED803',
        fontWeight: '400',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        borderBottomWidth: 0.25,
        borderTopWidth:0.25,
        paddingTop: 35,
        paddingBottom: 35,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
    },
    nameTxt: {
        fontWeight: '400',
        color: '#3E3E3E',
        fontSize: 18,
        paddingTop:5,
        width: "90%",
        paddingLeft: 20
    },
    editStyle: {
        fontSize: 14,
        color: "#AED803",
        alignSelf: "center",
        alignSelf: 'flex-end'
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
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
        width:170,
        paddingLeft: 10,
    },
    listContainer:{
        paddingBottom: '33%'
    },
    modalHeaderContainer:{
        marginLeft:40, 
        borderBottomWidth:1, 
        borderBottomColor: "#E4E4E4", 
        paddingBottom:20, 
        width:'75%'},
    modalInformationContainer:{
        marginLeft:40, 
        borderBottomWidth:1, 
        borderBottomColor: "#E4E4E4", 
        paddingTop:10, 
        paddingBottom:10, 
        width:'75%'
    },
    infoModalIcon:{
        borderWidth:1,
        borderColor:"#AED803",
        alignItems:'center',
        justifyContent:'center',
        width:25,
        height:25,
        backgroundColor:'#fff',
        borderRadius:50,
    },
    modalStyle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView:{
        backgroundColor: "#fff",
        width: '95%',
        height: '90%',
        borderRadius:19
        
    }
});