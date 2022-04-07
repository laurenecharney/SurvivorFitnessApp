
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { getLocations, 
         getLocationByID, 
         createLocation,
         getAllSpecialists } from '../APIServices/APIUtilities';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

const categoriesTemplate = [
    {key: "type", input: "toggle", label: "Select Location Type: ", options: ["Gym", "Dietitian Office"]},
    {key: "name", input: "text", label: "Location Name: ", options: []},
    {key: "address", input: "text", label: "Address: ", options: []},
    {key: "administrator", input: "picker", label: "Administrator: ", options: []} //options populate by getUsers on mount
];

const displayCategories = {
    name: "Location Name: ",
    address: "Address: ",
    administrator: "Administrator: ",
};

export default class AdminLocationsPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            isGymModalVisible: false,
            isDieticianModalVisible: false,
            name:"",
            address:"",
            location:"",
            admin:"",
            calls: [
         
            ],
            categories: categoriesTemplate,
            selectedLocation: {
                name:"",
                address:"",
                administrator:""
            }

        }
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    }

    async componentDidMount(){
        await this.refreshLocations();
        let tempCategories = JSON.parse(JSON.stringify(this.state.categories))
        for (field of tempCategories) {
            if(field.key == "administrator") field.options = await this.getUsers();
        }
        this.setState({categories: tempCategories})

    }

    async refreshLocations(){
        try {
            const arr = await getLocations();
            this.setState({
               calls: arr.map(
                //item is a location object
                item => {
                    let newI = item;                // set newItem to be identical to oldItem
                    newI.value = item.name          // set newItem.value to be the name of the location object
                    newI.id = parseInt(item.id)
                    newI.type = item.type
                    newI.icon = item.type === "TRAINER_GYM" ? 'dumbbell' : 'food-apple'
                    return newI;
                }
           )});
        } catch (e){
            console.log(e);
            alert("Could not fetch locations.");
        }
    }

    async getUsers() {
        let res;
        try {
            res = await getAllSpecialists();
        } catch (e){
            alert("Could not retrieve list of specialists")
        }
        let users = res.specialists.map(item => ({
            label: item.firstName + " " + item.lastName,
            value: item.id,
            key: item.id,
        }))
        return users;
    }

    openModal = async (item) =>{
        this.setState({
            isModalVisible:true,
            selectedLocation: item,
        });
        try {
            const res = await getLocationByID(item.id);
            this.setState({
                selectedLocation: {
                    name: res.name,
                    address: res.address,
                    administrator: res.administrator ? res.administrator.firstName + " " + res.administrator.lastName : "" 
                }
            })
            //console.log(this.state.selectedLocation)
        } catch (e){
            alert("Could not retrieve location information")
        }
        
    }
    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            edit: false
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
            edit: false

        })
    }

    generateNewLocation = async (locInfo) => {
        //preprocessing of input data. currently reorders fields
        let loc = {
            address: locInfo.address,
            administrator: {id: locInfo.administrator},
            name: locInfo.name,
            type: locInfo.type=="Gym" ? "TRAINER_GYM" : "DIETICIAN_OFFICE",
        };
        await createLocation(loc);
        await this.refreshLocations();
    }

    render() {
        return(
            <View style={styles.container} >
                <Heading 
                    title = "Locations"
                    titleOnly = {false}
                    displayAddButton = {true}
                    displayBackButton = {false}
                    displaySettingsButton = {false}
                    callback = {this.openAddModal}/>
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    listType="locations"/>   
                <DisplayModal 
                    categories = {displayCategories} 
                    fields = {this.state.categories}
                    information = {this.state.selectedLocation}
                    canEdit = {true}
                    content = "Location" 
                    title = "Location Information" 
                    visible = {this.state.isModalVisible} 
                    callback = {this.closeModal}/> 
                <AddEditModal 
                    fields = {this.state.categories}   //might be able to use keys from information instead
                    isAdd = {true}
                    isLocation = {true}
                    title = {"Add Location"}
                    visible = {this.state.isAddModalVisible} 
                    information = {this.state.selectedLocation} 
                    callback = {input => {
                        this.closeAddModal(); 
                        if(input) this.generateNewLocation(input);}
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