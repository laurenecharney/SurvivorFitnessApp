
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getLocations, getLocationByID} from '../APIServices/APIUtilities';
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

const categories = {
    name: "Name: ",
    address: "Address: ",
    admin: "Administrator: ",
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
                    listType="locations"
                    showSpecialistLocations={false}/>   
                <DisplayModal 
                    categories = {categories} 
                    information = {this.state.selectedLocation}
                    content = "Location" 
                    title = "Location Information" 
                    visible = {this.state.isModalVisible} 
                    canEdit = {true}
                    callback = {this.closeModal}/>
                <AddEditModal 
                    categories = {categories} 
                    content = ""
                    isAdd = {true}
                    title = "Add Locations" 
                    visible = {this.state.isAddModalVisible} 
                    callback = {this.closeAddModal}/>
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