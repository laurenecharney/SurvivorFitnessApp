import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, 
  Platform,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'
import DateTextBox from '../Components/DateTextBox'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllSessionNotesByParticipantID } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { Measurements } from "../Components/Measurements";

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const SmallAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainerSmall}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const SessionModal = () => {
    <Modal
    propagateSwipe={true}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    >
        <View
            style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            }}
        >
            <View
            style={{
                backgroundColor: "#fff",
                width: "90%",
                height: "50%",
                borderRadius: "19",
                alignItems: "center", justifyContent: 'space-around'
            }}
            >
            </View>
        </View>
    </Modal>
}
export default class TrainerCheckpointPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            expanded_general: false,
            expanded_skin_fold: false,
            expanded_girth: false,
            expanded_treadmill: false,
            trainerNotes: "",
            isDateConfirmModalVisible: false,
            isDatePickerModalVisible: false,
            sessionDate: new Date(),
            edit: false
        }
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    closeDateConfirmModal = () => {
        this.setState({
            isDateConfirmModalVisible: false,
        })
    }
    closeDatePickerModal = () => {
        this.setState({
            isDatePickerModalVisible: false,
        })
    }

    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }

    getTimePickerWidth = () => {
        return 115 + 10 * (this.state.sessionDate.getDate() < 10? 0 : 1);
    }

    getAppButtonColor = () => {
        return edit? "white" : '#AED804';
    }


    async fetchUser() {
      const res = await getUser();
      this.setState({user: JSON.parse(res)})
      const res2 = await getAllSessionNotesByParticipantID(2);
    }


    async componentDidMount() {
        //TODO
        // await this.refreshList();
        await this.fetchUser();
      }

    //   async refreshList() {
    //     try {
    //       const locationId =
    //         this.props.route.params && this.props.route.params.locationId
    //           ? this.props.route.params.locationId
    //           : null;
    //       const arr =
    //         this.props.route.params &&
    //         this.props.route.params.userType === "DIETITIAN"
    //           ? await getDietitians(locationId)
    //           : await getTrainers(locationId);
    //       this.setState({
    //         calls: arr.map(item => {
    //           let newI = item;
    //           newI.value = item.firstName + " " + item.lastName;
    //           newI.id = parseInt(item.id);
    //           newI.gym = item.locations[0] ? item.locations[0].name : "";
    //           return newI;
    //         })
    //       });
    //     } catch (e) {
    //       console.log(e);
    //       alert("Could not fetch data.");
    //     }
    //   }


    render(){
        // const {edit,} = this.state;
        return(
            <View style = {styles.container}>
                {/* <View style={styles.fixedHeader}>

                </View > */}
                <ScrollView 
                    contentContainerStyle = {styles.scrollContentContainer}
                    style={styles.scrollViewStyle}
                >
                    <AppButton
                        title = {this.state.edit ? this.state.sessionDate.toLocaleDateString('en-US', {weekday: 'short', month: 'long', day: 'numeric'}) : "Log Session"}
                        onPress={()=>this.setState({edit: !this.state.edit, isDateConfirmModalVisible: true})}
                    />

                <DateTextBox edit = {this.state.edit}/>
                {
                    (this.props.trainerSessionSelected && this.props.isCheckpoint) &&
                    <Measurements></Measurements>
                }
                    <Modal
                        propagateSwipe={true}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                        onSwipeComplete={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                        isVisible={this.state.isDateConfirmModalVisible}
                    >
                        <View
                            style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                            }}
                        >
                            <View
                            style={{
                                backgroundColor: "#fff",
                                width: "90%",
                                height: "30%",
                                borderRadius: "19",
                                alignItems: "center", justifyContent: 'space-around'
                            }}
                            >
                                <TouchableOpacity
                                    style={{ paddingLeft: 260, paddingTop: 10 }}
                                    onPress={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                                >
                                    <Icon name={"close"} color={"#E4E4E4"} size={32} />
                                </TouchableOpacity>
                                <View style={{flex: 1, width: '100%'}}>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                                        <Text style={styles.heading}>
                                        {"Select Date"}
                                        </Text>
                                            <DateTimePicker
                                                style={{height: 40, width: this.getTimePickerWidth(), marginTop: 10, alignItems: "center"}}
                                                value={this.state.sessionDate}
                                                mode="date"
                                                display="calendar"
                                                onChange={(event, enteredDate) => {
                                                    this.setState({
                                                        sessionDate: enteredDate,
                                                    })
                                                }}
                                            />
                                        <View>
                                            <SmallAppButton
                                            title={"Log"}
                                            onPress={()=>this.setState({edit: true, isDateConfirmModalVisible: false})}
                                                />
                                        </View>

                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
           
        </ScrollView>
      
        </View>);
        }
        
    }


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        // backgroundColor: 'red',
        width: '100%',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 50,
        marginTop: 25,
        marginLeft: 100,
        color: '#3E3E3E',
        justifyContent: 'space-evenly',

    },
    scroll: {
        // paddingTop: 165,
        // paddingBottom: 200,
        overflow: 'hidden',
        // width: '100%'
        // zIndex: 0
        // paddingBottom: 300,
        // height:  100
        // position: 'absolute',
        // flexDirection: 'row',
    },
    heading:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },

    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    categoriesContainer: {
        paddingVertical: 30,
        
    },
    categoryContainer: {
        // padding: 10,
        flexDirection: 'row',
        // justifyContent:'space-between',
        // height:56,
        width: '80%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderColor: "#E6E7E6",

    },
    
    
    categoryRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        width: '100%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        paddingRight: '10%',
    },
    arrowIcon: {
        justifyContent: 'space-between',
        // alignItems: 
        paddingRight: '10%'
    },
    
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        marginLeft: 15,
        marginRight: 15
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    measurementContainer: {
        width: "80%"
    },
    measurement:{
        padding:10,
        borderBottomWidth: 1,
        borderColor: "#D5D5D5",
        marginLeft:30,
        flexDirection: 'row',

    },
    measurementText: {
        // color: "black"
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    notes: {
        width: '93%',
        // backgroundColor: 'blue',
        margin: 10,
        height: '35%',
        marginBottom: 20,
        top: 2,
        fontSize: 15,
        position: 'relative',
        
    },
    fixedHeader: {
        zIndex: 1,
        width: '100%',
        backgroundColor:'white',
        top: 0,
        left: 0,
        

        // position: 'absolute'
    },

    sessionNumber:{
       fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: '#838383',
        fontWeight: 'bold',
        paddingBottom: 20,
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: '10%',
        width: '80%',
        // marginLeft: '5%'
        marginTop: 40
        
    },
    appButtonContainerSmall: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: '20%',
        //width: '80%',
        // marginLeft: '5%'
        marginTop: 10
        
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        alignSelf: "center",

    },
    sessionNumberContainer: {
        elevation: 8,
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        // width: '90%',
        height: '7%',
        alignSelf: "center",
        margin: 20,
        justifyContent: "center",
    },
    sessionNumberText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    scrollContentContainer: {
        paddingBottom: 75,
        // overflow: 'hidden',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    scrollViewStyle: {
        maxHeight: '100%',
        width: '85%'
    }
});
