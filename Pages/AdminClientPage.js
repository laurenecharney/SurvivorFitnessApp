import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {AlphabetList} from "react-native-section-alphabet-list";
import {getParticipants} from '../APIServices/APIUtilities';


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class AdminClientPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            calls: [
                // {id:1,  value: "Abby Cohen", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:2,  value: "Alicia Yang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:3,  value: "Charles Wang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:4,  value: "Grace Jeong", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:5,  value: "Ilya Ermakov", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:6,  value: "Lauren Charney", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:7,  value: "Gabby Cohen", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:8,  value: "Felicia Yang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:9,  value: "Bucky Wang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:10,  value: "Gracie Jeong", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:11,  value: "Bilya Ermakov", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
                // {id:12,  value: "Corinne Charney", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"}
            ]
        };
    }
     async componentDidMount(){
         try {
             const res = await getParticipants(null,null);
            this.setState({calls: res
                .map(
                item => {
                 let newI = item;

                 newI.value = item.firstName && item.lastName ? (item.firstName + " " + item.lastName) : ""
                 newI.id = parseInt(item.id);
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
    openModal = () =>{
        this.setState({
            isModalVisible:true
        })
    }

    toggleModal = () =>{
        this.setState({
            isModalVisible:!this.state.isModalVisible
        })
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

    toggleAddModal = () =>{
        this.setState({
            isAddModalVisible:!this.state.isModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false
        })
    }

    renderModalSection = () => {

    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor:'#fff' }} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.headline}>Participants</Text>
                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listContainer}>
                <AlphabetList
                    data={this.state.calls}
                    indexLetterColor={'#AED803'}
                    renderCustomSectionHeader={(section) => (
                        <View style={{visibility: 'hidden'}}/>
                        // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
                        // <View style={styles.sectionHeaderContainer}>
                        //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                        // </View>
                    )}
                    renderCustomItem={(item) => (
                        <ScrollView>
                            <View style={styles.row}>
                                <View>
                                    <View style={styles.nameContainer}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClientInformationPage')}>
                                            <Text style={styles.nameTxt}>{item.value} </Text>
                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                <Icon name={"dumbbell"} color={"#AED803"}/>
                                                <Text style={styles.gymTxt}>{item.gym} > {item.trainer} </Text>
                                            </View>
                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                <Icon name={"food-apple"} color={"#AED803"}/>
                                                <Text style={styles.gymTxt}>{item.dietician} > {item.nutritionist}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.openModal()}
                                                          style={{
                                                              borderWidth:1,
                                                              borderColor:"#AED803",
                                                              alignItems:'center',
                                                              justifyContent:'center',
                                                              width:25,
                                                              height:25,
                                                              backgroundColor:'#fff',
                                                              borderRadius:50,
                                                          }}>

                                            <Text style={{color:"#AED803"}}>i</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                />
                </View>
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '40%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                                        <Text style={{fontSize: '19', color: '#AED803'}} >Participant Information</Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Name: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Age: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Email: </Text>
                                        <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Phone Number: </Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Type of Cancer: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Treatment Facility: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Surgeries: </Text>
                                        <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Forms of Treatment: </Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Trainer: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Dietitian: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Start Date: </Text>
                                        <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Goal(s): </Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Physician Notes: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Dietician: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Start Date: </Text>
                                        <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Goal(s): </Text>
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </Modal>
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeAddModal()} onSwipeComplete={()=>this.closeAddModal()} transparent={true} isVisible={this.state.isAddModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '95%',
                            height: '95%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeAddModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:10, width:'100%'}}>
                                        <Text style={styles.modalText} >Add Participant</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.childText}>First Name</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Last Name</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText} >Age</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Email</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Phone Number</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Gym</Text>
                                        <DropDownPicker
                                            items={[
                                                {label: 'Orange Theory', value: 'item1'},
                                                {label: 'Effects Fitness', value: 'item2'},
                                                {label: 'Next Level Fitness', value: 'item3'},
                                            ]}
                                            defaultIndex={0}
                                            containerStyle={styles.dropdown}
                                            onChangeItem={item => console.log(item.label, item.value)}
                                        />

                                        <Text style={styles.childText}>Dietician Office</Text>
                                        <DropDownPicker
                                            items={[
                                                {label: 'Renu Health', value: 'item1'},
                                                {label: 'Balance Nutrition', value: 'item2'},
                                                {label: 'ree Method Nutrition', value: 'item3'},
                                            ]}
                                            textColor = "#E6E7E6"
                                            defaultIndex={0}
                                            containerStyle={styles.dropdown}
                                            onChangeItem={item => console.log(item)}
                                        />
                                        <Text style={styles.childText}>Start Date</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Goal(s)</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>

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

            </View>
        );
    }
}

//diff sections of the modal for attributes to display. 
//Each one contains a prop name + key 

const styles = StyleSheet.create({
    headline: {
        fontSize: 25,
        marginTop: 50,
        marginLeft: 15,
        padding: 25,
        color: '#AED803',
    },

    settings:{
        color: '#E4E4E4',
        marginTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 0,
        marginRight: 30,
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
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        fontWeight: '600',
        color: '#3E3E3E',
        fontSize: 20,
        width:170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
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
    addNewContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 75,
        alignSelf: "center",
        margin: 5,
        marginTop: 50
    },
    addNewText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
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

    child:{
        backgroundColor: 'white',
        padding:10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width:'75%',
        borderRadius: 5,
        alignSelf:"center"

    },
    childText:{
        fontSize:13,
        color:"#B7DC21",
        marginLeft: 30,
        padding: 12
    },
    dropdown:{
        backgroundColor: 'white',
        padding:3,
        width:'78%',
        borderRadius: 5,
        alignSelf:"center"
    },
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
        width:170,
        paddingLeft: 10,
    },
    listContainer:{
        paddingBottom: '33%'
    }
});