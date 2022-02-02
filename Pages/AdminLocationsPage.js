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
import AddInformationRow from '../Components/ModalComponents/AddInformationRow';
import EditInformationRow from '../Components/ModalComponents/EditInformationRow';
import InformationRow from '../Components/ModalComponents/InformationRow';
import RemoveButton from '../Components/ModalComponents/RemoveButton';
import { AlphabetList } from "react-native-section-alphabet-list";
import ModalHeader from '../Components/ModalComponents/ModalHeader';

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

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
    toggleModal = () =>{
        this.setState({
            isModalVisible:!this.state.isModalVisible
        })
    }
    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            edit: false
        })
    }
    openEditModal = () =>{
        this.setState({
            isEditModalVisible:true,
            edit: true
        })
    }
    toggleEditModal = () =>{
        this.setState({
            isEditModalVisible:!this.state.isEditModalVisible
        })
    }
    closeEditModal = () =>{
        this.setState({
            isEditModalVisible:false,
            isModalVisible:false,
            edit: false
        })
    }
    openAddModal = () =>{
        this.setState({
            isAddModalVisible:true
        })
    }
    toggleAddModal = () =>{
        this.setState({
            isAddModalVisible:!this.state.isAddModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false,
            edit: false

        })
    }
    openGymModal = () =>{
        this.setState({
            isGymModalVisible:true,
        })
    }

    toggleGymModal = () =>{
        this.setState({
            isGymModalVisible:!this.state.isGymModalVisible
        })
    }
    closeGymModal = () =>{
        this.setState({
            isGymModalVisible:false,
            edit: false

        })
    }
    openDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:true,
        })
    }
    toggleDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:!this.state.isDieticianModalVisible
        })
    }
    closeDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:false,
            edit: false
        })
    }


    render() {
        return(
            <View style={styles.container} >
                <View style={styles.heading}>
                    <Text style={styles.headline}>Locations</Text>
                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                                    {locationId: item.id})
                                    }}>
                                        <View style={styles.locationContainer}>
                                            <Icon name={item.icon} style={styles.icon} size={25}/>
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
                <Modal 
                    propagateSwipe={true} 
                    animationIn="slideInUp" 
                    animationOut="slideOutDown" 
                    onBackdropPress={()=>this.closeModal()} 
                    onSwipeComplete={()=>this.closeModal()} 
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalStyle}>
                            <TouchableOpacity style={styles.close} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={styles.modalHeaderContainer}>
                                        <ModalHeader title = "Location Information"/>
                                    </View>
                                    <View style={styles.modalInformationContainer}>
                                        <View  style={{justifyContent: 'space-between'}}>
                                            <TouchableOpacity onPress={()=>this.openEditModal()}>
                                                <Text style = {styles.editStyle}>edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <InformationRow title = "Name: " value = {this.state.name}/>
                                        <InformationRow title = "Address: " value = {this.state.location}/>
                                        <InformationRow title = "Admin: " value = {this.state.admin}/>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <Modal 
                        propagateSwipe={true} 
                        animationIn="slideInUp" 
                        animationOut="slideOutDown" 
                        onBackdropPress={()=>this.closeEditModal()} 
                        onSwipeComplete={()=>this.closeEditModal()} 
                        isVisible={this.state.isEditModalVisible}>
                        <View style={styles.modalContainer}>
                            <View style={styles.editModalStyle}>
                                <TouchableOpacity style={styles.close} onPress={()=>this.closeEditModal()}>
                                    <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>

                                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={styles.modalHeaderContainer}>
                                            <ModalHeader title = "Edit Location"/>
                                        </View>
                                        <View style={styles.modalInformationContainer}>
                                            <EditInformationRow title = "Name: " value = {this.state.name} edit = {this.state.edit}/>
                                            <EditInformationRow title = "Address: " value = {this.state.location} edit = {this.state.edit}/>
                                            <EditInformationRow title = "Admin: " value = {this.state.admin} edit = {this.state.edit}/>
                                            <RemoveButton/>
                                            <AppButton
                                                title={this.state.edit ? "SAVE" : "EDIT"}
                                                onPress={() => {()=>this.closeEditModal()}}
                                                />
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>  
                    </Modal>
                </Modal>
                <Modal 
                    propagateSwipe={true} 
                    animationIn="slideInUp" 
                    animationOut="slideOutDown" 
                    onBackdropPress={()=>this.closeAddModal()} 
                    onSwipeComplete={()=>this.closeAddModal()} 
                    isVisible={this.state.isAddModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalStyle}>
                            <TouchableOpacity style={styles.close} onPress={()=>this.closeAddModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:30, width:'100%'}}>
                                        <Text style={styles.modalText} >Add New Location</Text>
                                    </View>
                                    <AppButton
                                        title = {"Gym"}
                                        onPress={()=>this.openGymModal()}/>
                                    <AppButton
                                        title = {"Dietitian Office"}
                                        onPress={()=>this.openDieticianModal()}/>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <Modal 
                        propagateSwipe={true} 
                        animationIn="slideInUp" 
                        animationOut="slideOutDown" 
                        onBackdropPress={()=>this.closeGymModal()} 
                        onSwipeComplete={()=>this.closeGymModal()} 
                        transparent={true} 
                        isVisible={this.state.isGymModalVisible}>
                        <View style={styles.modalContainer}>
                            <View style={styles.addNewModalStyle}>
                                <TouchableOpacity style={styles.close} onPress={()=>this.closeGymModal()}>
                                    <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                        <View style={{paddingBottom:10, width:'100%'}}>
                                            <Text style={styles.modalText} >Add Gym</Text>
                                        </View>
                                        <View>
                                            <AddInformationRow title = "Name: "/>
                                            <AddInformationRow title = "Address: "/>
                                            <AddInformationRow title = "Admin: "/>
                                        </View>
                                        <View style={{marginTop: 20}}>
                                            <AppButton
                                                title = {"Add"}/>
                                        </View>
                                        
                                    </ScrollView>
                                </View>

                            </View>
                        </View>
                    </Modal>
                    <Modal 
                        propagateSwipe={true} 
                        animationIn="slideInUp" 
                        animationOut="slideOutDown" 
                        onBackdropPress={()=>this.closeDieticianModal()} 
                        onSwipeComplete={()=>this.closeDieticianModal()} 
                        transparent={true} 
                        isVisible={this.state.isDieticianModalVisible}>
                        <View style={styles.modalContainer}>
                            <View style={styles.addNewModalStyle}>
                                <TouchableOpacity style={styles.close} onPress={()=>this.closeDieticianModal()}>
                                    <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                        <View style={{paddingBottom:10, width:'100%'}}>
                                            <Text style={styles.modalText} >Add Dietitian Office</Text>
                                        </View>
                                        <View>
                                            <AddInformationRow title = "Name: "/>
                                            <AddInformationRow title = "Address: "/>
                                            <AddInformationRow title = "Admin: "/>
                                        </View>
                                        <View style={{marginTop: 20}}>
                                            <AppButton
                                                title = {"Add"}/>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Modal>
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
    },
    container:{
        flex: 1, 
        backgroundColor:'#fff'
    },
    heading:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingRight : 25
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        borderBottomWidth: 0.25,
        borderTopWidth:0.25,
        padding: 40,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        fontWeight: '400',
        color: '#3E3E3E',
        fontSize: 18,
        width:170,
    },
    icon:{
        color: '#E4E4E4',
        paddingRight: 10,
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