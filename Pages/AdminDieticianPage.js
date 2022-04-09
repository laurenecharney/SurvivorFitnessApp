import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { getDietitians, createUser, getLocations, updateProfile, getLocationByID} from "../APIServices/APIUtilities";
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

  const  defaultCategories  = [
    {key: "firstName",          input: "text",      label: "First Name: ",          options: []},
    {key: "lastName",           input: "text",      label: "Last Name: ",           options: []},
    {key: "email",              input: "text",      label: "Email: ",               options: []},
    {key: "phoneNumber",        input: "text",      label: "Phone Number: ",        options: []},
    {key: "locations",          input: "picker",    label: "Choose Location: ",     options: []},
  ];
  
  const displayCategories = {
      value: "Name: ",
      gym: "Affiliate Location: ",
      phoneNumber: "Phone Number: ",
      email: "Email: "
  };

export default class AdminDieticianPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.callbackAction = this.callbackAction.bind(this)
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            calls: [],
            selectedDietician: {},
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
                        userRoleType: "DIETITIAN"
                    },
                    ]
            }
        };
    }

    async componentDidMount(){
        this.setState({specialistType: "DIETITIAN"})
        await this.refreshDietitians();

        //get list of dietician locations
        let locations = await getLocations();
        let temp = locations.filter(location => location.type === "DIETICIAN_OFFICE").map(location => ({
            label: location.name, value: location.id
        }));

        this.setState({adminLocations: temp})
        console.log(this.state.adminLocations)
        // console.log(this.state.adminLocations)
        //update categories with locations
        let tempCat = JSON.parse(JSON.stringify(this.state.categories));
        for (field of tempCat) {
            if(field.key == "locations") field.options = this.state.adminLocations;
        }
        this.setState({categories: tempCat})
        //console.log("Categories", this.state.categories)
    }

    async refreshDietitians(){
        try {
            const locationId = this.props.route.params && this.props.route.params.locationId ? 
            this.props.route.params.locationId : null;
            const arr = await getDietitians(locationId);
            this.setState({
               calls: arr.map(
                item => {
                    let newI = item;
                    newI.value = item.firstName + " " + item.lastName
                    newI.key = parseInt(item.id)
                    newI.gym = item.locations[0] ? item.locations[0].name : '';
                    return newI;
                }
           )})
            
           ;
            } catch (e){
                alert("Could not fetch dietitians.");
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
            selectedDietician: item,
        });
        console.log(this.state.updateUser)
    }

    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            selectedDietician: {}
        })
    }

    openAddModal = () => {
        this.setState({
          isAddModalVisible: true
        });
        console.log("I TRIED TO OPEN THE ADD MODAL")
      };
    
    closeAddModal = async () => {
        await this.refreshDietitians();
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

    uploadUser = async (newInformation) => {
        if((newInformation.value != "") && 
            (newInformation.phoneNumber != "") && 
            (newInformation.email != "")) {
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
                locationId: newInformation.locations,
                userRoleType: this.state.specialistType
            },
            ]
        }
        const res = await createUser(user);
        this.refreshDietitians();
        }
    }

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
        if(newInformation.locations){
            let selectedLocation = await getLocationByID(newInformation.locations);
            let location = [{locationId:selectedLocation.id, userRoleType:"DIETITIAN"}]
            this.state.updateUser.locationAssignments = location
        }
        console.log(this.state.updateUser)
        const res = await updateProfile(this.state.updateUser, this.state.updateUser.user.id)
        console.log(res)
        this.state.selectedDietician = res
        await this.refreshDietitians()
        // this.closeEditModal()
    }

    render() {
        return(
            <View style={styles.container} >
                <Heading 
                    title = "Dietitians"
                    titleOnly = {false}
                    displayAddButton = {!this.getShowBackButton()}
                    displayBackButton = {this.getShowBackButton()}
                    displaySettingsButton = {false}
                    callback = {this.callbackAction}/>
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    listType={this.state.specialistType}
                    showSpecialistLocations={true}/> 
                <DisplayModal 
                    categories = {displayCategories} 
                    fields = {this.state.categories}
                    information = {this.state.selectedDietician}
                    canEdit = {true}
                    content = "Dietitian" 
                    title = "Dietitian Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.callbackAction}/> 
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {true}
                    title = {"Add Dietitian"} 
                    visible = {this.state.isAddModalVisible} 
                    information = {{firstName: "", lastName: "", phoneNumber: "", email: "", }}
                    callback = {info => {
                        if(info) this.uploadUser(info);
                        this.closeAddModal();}}/>
                <AddEditModal 
                    fields = {this.state.categories} 
                    isAdd = {false}
                    title = {"Edit Dietitian"} 
                    visible = {this.state.isEditModalVisible} 
                    information = {this.state.selectedDietician}
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