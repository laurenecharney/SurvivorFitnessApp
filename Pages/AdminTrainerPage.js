import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { getTrainers, createUser, getLocations, updateProfile, getLocationByID, formatSpecialists} from "../APIServices/APIUtilities";
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

const  defaultCategories  = [
  {key: "firstName",          input: "text",      label: "First Name: ",          options: [], edit: true},
  {key: "lastName",           input: "text",      label: "Last Name: ",           options: [], edit: true},
  {key: "email",              input: "text",      label: "Email: ",               options: [], edit: true},
  {key: "phoneNumber",        input: "text",      label: "Phone Number: ",        options: [], edit: true},
  {key: "locationsString",    input: "picker",    label: "Choose Location: ",     options: [], edit: true},
];

export default class AdminTrainerPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.callbackAction = this.callbackAction.bind(this)
        this.state = {
            edit: false,
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            trainersData: [
            ],
            selectedTrainer: [],
            specialistType: "",
            categories: defaultCategories,
            adminLocations: [],
            contactInformation:{
                firstName: "",
                lastName: "",
                email:"",
                phoneNumber:""
            },
            updateUser:{
                user: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    id: "",
                    isSuperAdmin: "false"
                    },
                locationAssignments: [
                    {
                        locationId: "",
                        userRoleType: "TRAINER"
                    },
                ]
            }
        };
    }

    async componentDidMount(){
        //get list of trainers
        this.setState({specialistType: "TRAINER"})
        await this.refreshTrainers();

        //get list of GYM locations 
        let locations = await getLocations();
        let temp = locations.filter(location => location.type === "TRAINER_GYM").map(location => ({
            label: location.name, value: location.id
        }));

        this.setState({adminLocations: temp})
        //update categories with locations
        let tempCat = JSON.parse(JSON.stringify(this.state.categories));
        for (field of tempCat) {
            if(field.key == "locationsString") field.options = this.state.adminLocations;
        }
        this.setState({categories: tempCat})
    }
    
    async refreshTrainers(){
        try {
            const locationId = this.props.route.params && this.props.route.params.locationId ? 
            this.props.route.params.locationId : null;

            const arr = await getTrainers(locationId);

            let tempFormattedTrainers = formatSpecialists(arr);
            this.setState({trainersData: tempFormattedTrainers});
            } catch (e){
                console.log("Error fetching trainers: ", e);
            }
    }

    openModal = (item) =>{
        let admin = false
        if(item.roles.includes("SUPER_ADMIN")){
          admin = true
        }
        this.state.updateUser.user.firstName = item.firstName
        this.state.updateUser.user.lastName = item.lastName
        this.state.updateUser.user.email = item.email
        this.state.updateUser.user.phoneNumber= item.phoneNumber
        this.state.updateUser.user.isSuperAdmin = admin
        this.state.updateUser.user.id = item.id
        this.state.updateUser.locationAssignments[0].locationId = item.locations[0].id
        this.setState({
            isModalVisible:true,
            selectedTrainer: item,
        });
    }

    closeModal = async () =>{
        this.setState({
            isModalVisible:false,
            selectedTrainer: {}
        })
    }

    openAddModal = () => {
        this.setState({
          isAddModalVisible: true
        });
    };
    
    closeAddModal = async () => {
        await this.refreshTrainers();
        this.setState({
            isAddModalVisible: false
        });
    };

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
    

    updateInfo = async (newInformation) => {
        if(newInformation.firstName){
            this.state.updateUser.user.firstName = newInformation.firstName
        }
        if(newInformation.lastName){
            this.state.updateUser.user.lastName = newInformation.lastName
        }
        if(newInformation.email){
            this.state.updateUser.user.email = newInformation.email
        }
        if(newInformation.phoneNumber){
            this.state.updateUser.user.phoneNumber = newInformation.phoneNumber
        }
        if(newInformation.locationsString){
            let selectedLocation = await getLocationByID(newInformation.locationsString);
            let location = [{locationId:selectedLocation.id, userRoleType:this.state.specialistType}]
            this.state.updateUser.locationAssignments = location
        } else {
            console.log("no locations!!!!!!!")
        }
        const res = await updateProfile(this.state.updateUser, this.state.updateUser.user.id)
        this.state.selectedTrainer = res
        await this.refreshTrainers()
        // this.closeEditModal()
    }

    getShowBackButton() {
        return this.props.route.params && this.props.route.params.showBackButton;
    }

    back() {
        this.props.navigation.goBack()
    }

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


    uploadUser = async newInformation => {
        if((newInformation.firstName) && (newInformation.lastName) &&
            (newInformation.phoneNumber) && 
            (newInformation.email)) {
            if (newInformation.locationsString) {
                let user = {
                    user: {
                    firstName: newInformation.firstName,
                    lastName: newInformation.lastName,
                    email: newInformation.email,
                    phoneNumber: newInformation.phoneNumber,
                    isSuperAdmin: "false"
                    },
                    locationAssignments: [
                    {
                        locationId: newInformation.locationsString,
                        userRoleType: this.state.specialistType
                    },
                    ]
                }
                const res = await createUser(user);
                this.refreshTrainers();
            }  else {
                    let user = {
                        user: {
                        firstName: newInformation.firstName,
                        lastName: newInformation.lastName,
                        email: newInformation.email,
                        phoneNumber: newInformation.phoneNumber,
                        isSuperAdmin: "false"
                        },
                        locationAssignments: []
                    }
                    const res = await createUser(user);
                    this.refreshTrainers();
            }
        } else {
            Alert.alert("Please fill out all fields")
        }
    
    }

    render() {
        return(
            <View style={styles.container} >
                <Heading 
                    title = "Trainers"
                    titleOnly = {false}
                    displayAddButton = {!this.getShowBackButton()}
                    displayBackButton = {this.getShowBackButton()}
                    displaySettingsButton = {false}
                    callback = {this.callbackAction}/>
                <ParticipantsList
                    participantsInfo={this.state.trainersData}
                    openModal={item => this.openModal(item)}
                    listType={this.state.specialistType}
                    showSpecialistLocations={true}/> 
               <DisplayModal 
                    // categories = {displayCategories} 
                    fields = {this.state.categories}
                    information = {this.state.selectedTrainer}
                    canEdit = {true}
                    content = "Trainer" 
                    title = "Trainer Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.callbackAction}/> 
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {true}
                    title = {"Add Trainer"} 
                    visible = {this.state.isAddModalVisible} 
                    information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
                    callback = {info => {
                        if(info) this.uploadUser(info);
                        this.closeAddModal();}}/>
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {false}
                    title = {"Edit Trainer"} 
                    visible = {this.state.isEditModalVisible} 
                    information = {this.state.selectedTrainer}
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