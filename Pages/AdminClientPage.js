import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getParticipants, getParticipantByID, addParticipant, getLocations, updateParticipant} from '../APIServices/APIUtilities';
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const displayCategories = {
    firstName: "First Name: ",
    lastName: "Last Name: ",
    phoneNumber: "Phone Number: ",
    email: "Email: ",
    age: "Age: ",
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

const defaultCategories = [
    {key: "firstName",          input: "text",      label: "First Name: ",                  options: []},
    {key: "lastName",           input: "text",      label: "Last Name: ",                   options: []},
    {key: "age",                input: "text",      label: "Age: ",                         options: []},
    {key: "email",              input: "text",      label: "Email: ",                       options: []},
    {key: "phoneNumber",        input: "text",      label: "Phone Number: ",                options: []},
    {key: "trainerLocation",    input: "picker",    label: "Choose Training Location: ",    options: []},
    {key: "dietitianLocation",  input: "picker",    label: "Choose Dieititan Office: ",     options: []},
    {key: "goals",              input: "text",      label: "Goals: ",                       options: []},
    {key: "typeOfCancer",       input: "text",      label: "Type of Cancer: ",              options: []},
    {key: "formsOfTreatment",   input: "text",      label: "Forms of Treatment: ",          options: []},
    {key: "surgeries",          input: "text",      label: "Surgeries: ",                   options: []},
    {key: "physicianNotes",     input: "text",      label: "Notes from Physician: ",        options: []},
];



export default class AdminClientPage extends Component {
    state = {
        isModalVisible:false,
    }

    constructor(props) {
        super(props);
        this.callbackAction = this.callbackAction.bind(this)
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            calls: [],
            selectedParticipant: {},
            categories: defaultCategories,
            updateUser:{
                id: "",
                firstName: "",
                lastName: "",
                age: "",
                email: "",
                phoneNumber: "",
                startDate: "",
                goals: "",
                typeOfCancer: "",
                formsOfTreatment: "",
                surgeries: "",
                physicianNotes: "",
                dietitian: {
                    
                },
                dietitianLocation: {
                   
                },
                trainer: {
                    
                },
                trainerLocation: {
                    
                },
                treatmentProgramStatus: ""
            },
        }
    }

    async componentDidMount(){
        await this.refreshParticipants();
        try {
            const res = await getLocations();
            let gyms = [], dOffices = [];
            for(const loc of res) {
                if(loc.type == "TRAINER_GYM")
                    gyms.push({label: loc.name, value: loc.id});
                if(loc.type == "DIETICIAN_OFFICE")
                    dOffices.push({label: loc.name, value: loc.id});
            }
            let temp = JSON.parse(JSON.stringify(this.state.categories));
            for(let category of temp) {
                if(category.key == "trainerLocation") category.options = gyms;
                if(category.key == "dietitianLocation") category.options = dOffices;
            }
            this.setState({categories: temp});
        } catch (e) {
            console.log(e);
            alert("Could not fetch locations data");
        }
    }

    refreshParticipants = async () => {
    try {
        const res = await getParticipants(null,null);
        this.setState({calls: res
            .map(item => {
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
           updateUser: {
            id: participant.id,
            firstName: participant.firstName,
            lastName: participant.lastName,
            age: participant.age,
            email: participant.email,
            phoneNumber: participant.phoneNumber,
            startDate: participant.startDate,
            goals: participant.goals,
            typeOfCancer: participant.typeOfCancer,
            formsOfTreatment: participant.formsOfTreatment,
            surgeries: participant.surgeries,
            physicianNotes: participant.physicianNotes,
            dietitian: {id: participant.dietitian.id},
            dietitianLocation: {
                id: participant.dietitianLocation.id
            },
            trainer: {id: participant.trainer.id},
            trainerLocation: {
                id: participant.trainerLocation.id
            },
            treatmentProgramStatus: participant.treatmentProgramStatus
           }
       });
       try {
        const res = await getParticipantByID(participant.id);
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

    openEditModal = () => {
        this.setState({
          isModalVisible: false,
          isEditModalVisible: true,
        });
    };
    
    closeEditModal = async () => {
        this.setState({
            isEditModalVisible: false
        });
    };

    callbackAction(action){
        if(action == "back"){
            this.props.navigation.goBack()
        }
        else if(action == "add"){
            this.openAddModal()
        }
        else if(action == "close"){
            this.closeModal()
        }
        else if(action == "edit"){
            this.openEditModal()
        }
    }

    createNewParticipant = async input => {
        if(input.dietitianLocation) 
            input.dietitianLocation = {id: input.dietitianLocation}
        if(input.trainerLocation) 
            input.trainerLocation = {id: input.trainerLocation}
        if(input.age) 
            input.age = parseInt(input.age);

        try{
            let res = await addParticipant(input);
        } catch(e) {
            console.log(e);
            alert("Could not add new participant");
        }
        await this.refreshParticipants();
    }

    updateInfo = async (newInformation) => {
        if(newInformation.age){
            this.state.updateUser.age = newInformation.age
        }
        if(newInformation.dietitianLocation){
            this.state.updateUser.dietitianLocation = {id: newInformation.dietitianLocation}
        }
        if(newInformation.email){
            this.state.updateUser.email = newInformation.email
        }
        if(newInformation.firstName){
            this.state.updateUser.firstName = newInformation.firstName
        }
        if(newInformation.formsOfTreatment){
            this.state.updateUser.formsOfTreatment = newInformation.formsOfTreatment
        }
        if(newInformation.goals){
            this.state.updateUser.goals = newInformation.goals
        }
        if(newInformation.lastName){
            this.state.updateUser.lastName = newInformation.lastName
        }
        if(newInformation.phoneNumber){
            this.state.updateUser.phoneNumber = newInformation.phoneNumber
        }
        if(newInformation.physicianNotes){
            this.state.updateUser.physicianNotes = newInformation.physicianNotes
        }
        if(newInformation.surgeries){
            this.state.updateUser.surgeries = newInformation.surgeries
        }
        if(newInformation.trainerLocation){
            this.state.updateUser.trainerLocation = {id: newInformation.trainerLocation}
        }
        if(newInformation.typeOfCancer){
            this.state.updateUser.typeOfCancer = {id: newInformation.typeOfCancer}
        }
        console.log("Client Obj",this.state.updateUser)
        console.log("Client ID", this.state.updateUser.id)
        const res = await updateParticipant(this.state.updateUser, this.state.updateUser.id)
        console.log("RES", res)
        this.state.selectedUser = res
        await this.refreshParticipants()
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
                    listType="participants"/>   
                <DisplayModal 
                    categories = {displayCategories} 
                    fields = {this.state.categories}
                    information = {this.state.selectedParticipant}
                    canEdit = {true}
                    content = "Participants" 
                    title = "Participant Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.callbackAction}/>   
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {true}
                    title = "Add Participant" 
                    visible = {this.state.isAddModalVisible} 
                    information = {this.state.selectedParticipant}
                    callback = {input => {
                        this.closeAddModal(); 
                        if(input) this.createNewParticipant(input);}
                    }/>
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {false}
                    title = {"Edit Participant"} 
                    visible = {this.state.isEditModalVisible} 
                    information = {this.state.selectedParticipant}
                    callback = {info => {
                        if(info) this.updateInfo(info);
                        this.closeEditModal();}}/>
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