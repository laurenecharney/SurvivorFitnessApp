import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getParticipants, getParticipantByID, addParticipant, getLocations, updateParticipant, formatParticipants, getTrainers, getDietitians} from '../APIServices/APIUtilities';
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

const defaultCategories = [
    {key: "firstName",          input: "text",      label: "First Name: ",                  options: [], edit: true},
    {key: "lastName",           input: "text",      label: "Last Name: ",                   options: [], edit: true},
    {key: "phoneNumber",        input: "text",      label: "Phone Number: ",                options: [], edit: true},
    {key: "email",              input: "text",      label: "Email: ",                       options: [], edit: true},
    {key: "trainer",            input: "picker",    label: "Trainer: ",                     options: [], edit: false},
    {key: "gym",                input: "picker",    label: "Choose Training Location: ",    options: [], edit: true},
    {key: "nutritionist",       input: "picker",    label: "Dietitian: ",                   options: [], edit: false},
    {key: "office",             input: "picker",    label: "Choose Dieititan Office: ",     options: [], edit: true},
    {key: "age",                input: "text",      label: "Age: ",                         options: [], edit: true},
    {key: "typeOfCancer",       input: "text",      label: "Type of Cancer: ",              options: [], edit: true},
    {key: "formsOfTreatment",   input: "text",      label: "Forms of Treatment: ",          options: [], edit: true},
    {key: "surgeries",          input: "text",      label: "Surgeries: ",                   options: [], edit: true},
    {key: "physicianNotes",     input: "text",      label: "Notes from Physician: ",        options: [], edit: true},
    {key: "goals",              input: "text",      label: "Goals: ",                       options: [], edit: true},
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
            participantsInfo: [],
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
                if(category.key == "gym") category.options = gyms;
                if(category.key == "office") category.options = dOffices;
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
        let tempParticipants = formatParticipants(res)
        this.setState({participantsInfo: tempParticipants})

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
            dietitian: participant.nutritionist != "unassigned" ? {id: participant.dietitian.id} : {},
            dietitianLocation: {
                id: participant.dietitianLocation.id
            },
            trainer: participant.trainer != "unassigned" ? {id: participant.trainer.id} : {},
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
        if(input.office) 
            input.dietitianLocation = {id: input.office}
        if(input.gym) 
            input.trainerLocation = {id: input.gym}
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
        const res = await updateParticipant(this.state.updateUser, this.state.updateUser.id)
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
                    participantsInfo={this.state.participantsInfo}
                    openModal={item => this.openModal(item)}
                    showLocations={true}
                    showTrainer={true}
                    showDietitian={true}
                    listType="participants"/>   
                <DisplayModal 
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