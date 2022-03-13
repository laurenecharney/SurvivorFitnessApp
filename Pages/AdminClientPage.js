import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AlphabetList} from "react-native-section-alphabet-list";
import {getParticipants, getParticipantByID, addParticipant} from '../APIServices/APIUtilities';
import ModalHeader from '../Components/ModalComponents/ModalHeader';
import InformationRow from '../Components/ModalComponents/InformationRow';
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import AddInformationRow from '../Components/ModalComponents/AddInformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const categories = {
    firstName: "First Name: ",
    lastName: "Last Name: ",
    phoneNumber: "Phone Number: ",
    email: "Email: ",
    //age: "Age: ",
    typeOfCancer: "Type of Cancer: ",
    treatmentFacility: "Treatment Facility: ",
    surgeries: "Surgeries: ",
    formsOfTreatment: "Forms of Treatment: ",
    physicianNotes: "Physician Notes: ",
    trainer: "Trainer: ",
    gym: "Gym: ",
    nutritionist: "Dietitian: ",
    dieticianOffice: "Dietitian Office: ",
    //startDate: "Start Date: ",
    goals: "Goal(s): ",

};

const categoriesOld = {
    firstName: "First Name: ",
    lastName: "Last Name: ",
    age: "Age: ",
    email: "Email: ",
    phoneNumber: "Phone Number: ",
    gym: "Gym: ",
    dietitianOffice: "Dietician Office: ",
    startDate: "Start Date: ",
    goals: "Goal(s): ",
    // numberOfTrainings: "Number of Trainings: ",
    // numberOFAppointments: "Number of Appointments: ",
};

export default class AdminClientPage extends Component {
    state = {
        isModalVisible:false,
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
                {id: "firstName", val: "",},
                {id: "lastName", val: "",},
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
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    }

    async componentDidMount(){
        this.resetPartipantList();
   }

    resetPartipantList = async () => {
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
           selectedParticipant: participant,
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

    closeModal = () =>{
        this.setState({
            isModalVisible:false
        })
    }

    openAddModal = () =>{
        this.setState({
            isAddModalVisible:true
        })
    }

    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false,
        })
    }

    setNPVal = (key, value) => {
        console.log(key, value)
        let temp = JSON.parse(JSON.stringify(this.state.newParticipant));
        for (let i = 0; i < this.state.newParticipant.length; i++){
            if (this.state.newParticipant[i].id === key){
                temp[i].val = value;
            }
        }
        // let temp = this.state.newParticipant.map(row => 
        //     ({id: row.id, val: row.id===key ? value : row.val}));
            console.log(temp)
        this.setState({
            newParticipant: temp
        })
    }

    createNewParticipant = async () => {
        let participant = {};
        for (const row of this.state.newParticipant) {
            console.log(row.id, row.val);
            participant[row.id] = row.val;
        }
        await addParticipant(participant);
        this.resetPartipantList();
    }

    render() {
        return(
            <View style={styles.container}>
                <Heading 
                    title = "Participants"
                    titleOnly = {false}
                    displayAddButton = {true}
                    displayBackButton = {false}
                    displaySettingsButton = {false}
                    callback = {this.openAddModal}/>
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    showLocations={true}
                    showTrainer={true}
                    showDietitian={true}
                    listType="participants"
                />  
                  
                {/* </View> */}
                {/* <Modal 
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
                </Modal> */}
                {/* <Modal 
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
                            <View style={{flex: 1}}>
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
                                        // TODO
                                         // test add participant form - use console.log
                                         // api call? 
                                         // after merge, create default vals for number of sessions
                                         //
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
                </Modal> */}
 
                <DisplayModal 
                    categories = {categories} 
                    information = {this.state.selectedParticipant}
                    canEdit = {true}
                    content = "Participants" 
                    title = "Participant Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.closeModal}/>
                <AddEditModal 
                    categories = {categories} 
                    isAdd = {true}
                    title = "Add Participant" 
                    visible = {this.state.isAddModalVisible} 
                    information = {this.state.selectedParticipant}
                    closeModal = {this.closeAddModal}
                    createParticipant = {() => {
                        console.log("create participant");
                        this.createNewParticipant();
                        this.closeAddModal();
                    }}
                    setValue={this.setNPVal}/>
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