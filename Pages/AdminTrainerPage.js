import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {getTrainers} from '../APIServices/APIUtilities';
import { getSpecialistType } from '../APIServices/deviceStorage';
import { DisplayModal } from '../Components/ModalComponents/DisplayModal';
import { Heading } from '../Components/Heading';
import { ParticipantsList } from '../Components/ParticipantsList';

const categories = {
    value: "Name: ",
    gym: "Affiliate Location: ",
    phoneNumber: "Phone Number: ",
    email: "Email: "
};

export default class AdminTrainerPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.state = {
            isModalVisible: false,
            trainersData: [
            ],
            selectedTrainer: [],
            specialistType: "",
        };
    }

    async componentDidMount(){
        const specialistTypeRes = JSON.parse(await getSpecialistType());
        console.log("specialistTypeRes: ", specialistTypeRes);
        this.setState({specialistType: specialistTypeRes})
        await this.refreshTrainers();
    }
    
    async refreshTrainers(){
        try {
            const locationId = this.props.route.params && this.props.route.params.locationId ? 
            this.props.route.params.locationId : null;

            const arr = await getTrainers(locationId);
            this.setState({
               trainersData: arr.map(
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
                console.log("Error fetching trainers: ", e);
            }
    }

    openModal = (item) =>{
        this.setState({
            isModalVisible:true,
            selectedTrainer: item
        });
    }

    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            selectedTrainer: {}
        })
    }

    getShowBackButton() {
        return this.props.route.params && this.props.route.params.showBackButton;
    }

    back() {
        this.props.navigation.goBack()
    }

    render() {
        return(
            <View style={styles.container} >
                <Heading 
                    title = "Trainers"
                    titleOnly = {!this.getShowBackButton()}
                    displayAddButton = {false}
                    displayBackButton = {this.getShowBackButton()}
                    displaySettingsButton = {false}
                    callback = {this.back}/>
                <ParticipantsList
                    participantsInfo={this.state.trainersData}
                    openModal={item => this.openModal(item)}
                    listType={this.state.specialistType}
                    showSpecialistLocations={true}/> 
                <DisplayModal 
                    categories = {categories} 
                    information = {this.state.selectedTrainer}
                    content = "Trainers" 
                    title = "Trainer Information" 
                    visible = {this.state.isModalVisible} 
                    canEdit = {false}
                    callback = {this.closeModal}/>
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