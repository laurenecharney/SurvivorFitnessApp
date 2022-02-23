
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getLocations, getLocationByID} from '../APIServices/APIUtilities';
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import InformationRow from '../Components/ModalComponents/InformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
import { AlphabetList } from "react-native-section-alphabet-list";
import ModalHeader from '../Components/ModalComponents/ModalHeader';
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
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
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
                <View style={styles.listContainer}>
                    { <AlphabetList
                        data={this.state.calls}
                        indexLetterSize={46}
                        indexLetterColor={'#AED803'}
                        renderCustomSectionHeader={(section) => (
                            <View style={{visibility: 'hidden'}}/>
                            // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
                        // <View style={styles.sectionHeaderContainer}>
                        //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                        // </View>
                        )}
                        renderCustomItem={(item) => (
                            <View style={styles.row}>
                                <View>
                                    <View style={styles.nameContainer}>
                                        <TouchableOpacity onPress={() => {
                                        const page = item && item.type === 'TRAINER_GYM' ? 'AdminTrainerPage' : 'AdminDieticianPage';
                                        this.props.navigation.navigate(page, 
                                        {locationId: item.id, showBackButton: true})
                                        }}>
                                            <View style={styles.locationContainer}>
                                                <View style={styles.iconContainer}>
                                                    <Icon name={item.icon} style={styles.icon} size={25}/>
                                                </View>
                                                <Text style={styles.nameTxt}>{item.value}</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.openModal(item)} style={styles.infoButton}>
                                                <Text style={styles.infoTxt}>i</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />}
                </View>
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
        headline: {
            fontSize: 25,
            marginTop: 50,
            marginLeft: 10,
            padding: 25,
            color: '#AED803',
            fontWeight: '400',
        },
        iconContainer:{
            alignItems:'center',
            justifyContent:'center',
            width:35,
            height:35,
            backgroundColor:'#F8F8F8',
            borderRadius:6,
        },
        container:{
            flex: 1, 
            backgroundColor:'#fff'
        },
        heading:{
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center", 
            paddingRight : 25,
            borderColor: '#E4E4E4',
            borderBottomWidth: 1
        },
        row: {
            flexDirection: 'row',
            borderColor: '#E6E6E6',
            backgroundColor: '#fff',
            borderBottomWidth: 0.25,
            borderTopWidth:0.25,
            paddingTop: 35,
            paddingBottom: 35,
            width:"85%",
            alignSelf:'center',
            paddingRight:10,
            justifyContent: 'center', //Centered horizontally
        },
        nameContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            width: "90%",
            paddingLeft:10,
        },
        nameTxt: {
            fontWeight: '400',
            color: '#3E3E3E',
            fontSize: 18,
            paddingTop:5,
            width: "90%",
            paddingLeft: 20
        },
        icon:{
            color: '#E4E4E4',
            position: 'relative'
        },
        addButtonContainer: {
            backgroundColor:'#AED804',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: 48,
            alignSelf: "center",
            margin: 5,
            marginTop: 50
        },
        addButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        },
        modalText:{
                fontSize: 18,
                paddingTop: 20,
                alignSelf: "center",
                fontWeight: "bold",
                color: "#AED803",
        },
        appButtonContainer: {
            backgroundColor:'#AED804',
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 12,
            width: 150,
            alignSelf: "center",
            margin: 10
        },
        appButtonText: {
            fontSize: 18,
            color: "#fff",
            alignSelf: "center",
        },
        editStyle: {
            fontSize: 14,
            color: "#AED803",
            alignSelf: "center",
            alignSelf: 'flex-end'
        },   
        sectionHeaderContainer:{
            backgroundColor: '#E4E4E4'
        },
        sectionHeaderLabel:{
            fontSize: 16,
            paddingLeft: 10
        },
        listContainer:{
            paddingBottom: '33%'
        },
        modalHeaderContainer:{
            marginLeft:40, 
            borderBottomWidth:1, 
            borderBottomColor: "#E4E4E4", 
            paddingBottom:20, 
            width:'75%'
        },
        locationContainer:{
            flexDirection: "row", 
            justifyContent: "space-between"
        },
        infoButton:{
            borderWidth:1,
            borderColor:"#AED803",
            alignItems:'center',
            justifyContent:'center',
            width:25,
            height:25,
            backgroundColor:'#fff',
            borderRadius:50,
        },
        infoTxt:{
            color:"#AED803" 
        },
        modalContainer:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalStyle:{
            backgroundColor: "#fff",
            width: '90%',
            height: '40%',
            borderRadius:19
        },
        close:{
            paddingLeft:260, 
            paddingTop:30
        },
        modalInformationContainer:{
            marginLeft:40, 
            paddingTop:10, 
            paddingBottom:10, 
            width:'75%',
        },
        editModalStyle:{
            backgroundColor: "#fff",
            width: '90%',
            height: '60%',
            borderRadius:19
        },
        addNewModalStyle:{
            backgroundColor: "#fff",
            width: '90%',
            height: '60%',
            borderRadius:19
        }
});