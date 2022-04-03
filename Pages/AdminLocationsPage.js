
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getLocations, getLocationByID, createLocation} from '../APIServices/APIUtilities';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';


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
            selectedLocation: {}
        }
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    }

    categories = [
        {key: "type", input: "toggle", label: "Select Location Type: ", option1: "Gym", option2: "Dietitian Office",},
        {key: "name", input: "text", label: "Location Name: ",},
        {key: "address", input: "text", label: "Address: ",},
        {key: "administrator", input: "picker", label: "Administrator: ", options: getUsers()},
    ];

    async componentDidMount(){
        await this.refreshLocations();
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

    openModal = async (item) =>{
        this.setState({
            isModalVisible:true,
            selectedLocation: item,
        });
        try {
            const res = await getLocationByID(item.id);
            this.setState({
                selectedLocation: res,
                name: res.name,
                location: res.address,
                admin: res.administrator ? res.administrator.firstName + " " + res.administrator.lastName : "" 
            })
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

    generateNewLocation = locInfo => {
        //preprocessing of input data. currently reorders fields
        let loc = {
            address: locInfo.address,
            administrator: locInfo.administrator, //needs to be object
            name: locInfo.name,
            type: locInfo.type,
        };
        console.log(JSON.stringify(loc));
        createLocation(loc);
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
                    categories = {categories} 
                    information = {this.state.selectedLocation}
                    content = "Location" 
                    title = "Location Information" 
                    visible = {this.state.isModalVisible} 
                    canEdit = {true}
                    callback = {this.closeModal}/>
                <AddEditModal 
                    fields = {categories}   //might be able to use keys from information instead
                    isAdd = {true}
                    isLocation = {true}
                    title = "Add Location" 
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