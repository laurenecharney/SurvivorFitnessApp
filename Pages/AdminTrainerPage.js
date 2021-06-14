import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    FlatList,
    Button,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import {AlphabetList} from "react-native-section-alphabet-list";
import {getTrainers} from '../APIServices/APIUtilities';
import ModalRow from '../Components/ModalComponents/ModalRow'

export default class AdminTrainerPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            calls: [
            ],
            selectedTrainer: [],
        };
    }
    async componentDidMount(){
        await this.refreshTrainers();
    }
    
    async refreshTrainers(){
        try {
            const locationId = this.props.route.params && this.props.route.params.locationId ? 
            this.props.route.params.locationId : null;
            console.log(this.props.route);
            const arr = await getTrainers(locationId);
            console.log("REFRESH TRAINERS")
            console.log(arr)
            this.setState({
               calls: arr.map(
                item => {
                    let newI = item;
                    newI.value = item.firstName + " " + item.lastName
                    newI.id = parseInt(item.id)
                    newI.gym = item.locations[0] ? item.locations[0].name : '';
                    return newI;
                }
           )})
                
           ;
            } catch (e){
                console.log(e);
                alert("Could not fetch trainers.");
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


    render() {
       
        return(
            <View style={{ flex: 1, backgroundColor:'#fff' }} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.headline}>Trainers</Text>
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
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TrainerPatientsPage', 
                                        {trainerUserId: item.id})}>
                                            <Text style={styles.nameTxt}>{item.value}</Text>
                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                {item.gym && <Icon3 name={"location"} size={20} color={"#AED803"}/>}
                                                <Text style={styles.gymTxt}>{item.gym}</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.openModal(item)}
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
                            height: '25%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:10, width:'75%'}}>
                                        <Text style={{fontSize: '19', color: '#AED803'}} >Trainer Information</Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        {[
                                            {displayKey: 'Name:', displayValue: this.state.selectedTrainer.value},
                                            {displayKey: 'Affiliate Location:', displayValue: this.state.selectedTrainer.gym},
                                            {displayKey: 'Phone Number:', displayValue: this.state.selectedTrainer.phoneNumber},
                                            {displayKey: 'Email', displayValue: this.state.selectedTrainer.email}
                                        ].map(row => 
                                            <ModalRow 
                                            displayKey={row.displayKey}
                                            displayValue={row.displayValue}/>
                                        
                                        )}
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

const styles = StyleSheet.create({
    headline: {
        fontSize: 25,
        marginTop: 50,
        marginLeft: 10,
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
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
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
    listContainer: {
        paddingBottom: '33%'
    }
});