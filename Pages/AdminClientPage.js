import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getParticipants, getParticipantByID, addParticipant, getLocations} from '../APIServices/APIUtilities';
import { ParticipantsList } from '../Components/ParticipantsList';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';

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
    // {key: "numberOfTrainerSessions", input: "text", label: "Number of Trainer Sessions: ", options: []},
    // {key: "numberOfDietitianSessions", input: "text", label: "Number of Dietitian Sessions: ", options: []},
    // startDate -- datePicker??
    // sessions where measurements are taken
    // measurements -- these two need to be multiselects
];



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
            categories: defaultCategories,
            // newParticipant: [
            //     {id: "firstname", val: "",},
            //     {id: "lastname", val: "",},
            //     {id: "age", val: "",},
            //     {id: "email", val: "",},
            //     {id: "phoneNumber", val: "",},
            //     {id: "gym", val: "",},
            //     {id: "dieticianOffice", val: "",},
            //     {id: "startDate", val: "",}, //probs want another datepicker
            //     {id: "goals", val: "",},
            //     {id: "numberOfTrainings", val: 24,},
            //     {id: "numberOFAppointments", val: 3}]
            //a way to implement editing a participant is preloading values on edit modal open,
            //then changing as the user changes values, then sending to endpoint
        }
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    }

    async componentDidMount(){
        await this.refreshParticipants();

        try {
            const res = await getLocations();
            console.log(">>>>LOCATIONS: ", res);
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

    // setNPVal = (key, value) => {
    //     let temp = this.state.newParticipant.map(row => 
    //         ({id: row.id, val: row.id===key ? value : row.val}));
    //     this.setState({
    //         newParticipant: temp
    //     })
    // }

    createNewParticipant = async input => {
        if(input.dietitianLocation) 
            input.dietitianLocation = {id: input.dietitianLocation}
        if(input.trainerLocation) 
            input.trainerLocation = {id: input.trainerLocation}
        if(input.age) 
            input.age = parseInt(input.age);

        try{
            let res = await addParticipant(input);
            console.log("res", JSON.stringify(res));
        } catch(e) {
            console.log(e);
            alert("Could not add new participant");
        }
        
        await this.refreshParticipants();
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
                    categories = {this.state.categories} //NEEDS TO BE THIS.STATE.CATEGORIES
                    information = {this.state.selectedParticipant}
                    canEdit = {true}
                    content = "Participants" 
                    title = "Participant Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.closeModal}/>
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