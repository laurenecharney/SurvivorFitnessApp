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
import { getAllSessionNotesByParticipantID } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
import { Measurements } from "../Components/Measurements";

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class TrainerCheckpointPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: {},
            expanded_general: false,
            expanded_skin_fold: false,
            expanded_girth: false,
            expanded_treadmill: false,
            trainerNotes: "",
            edit: false,


        }
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }



    async fetchUser() {
    //   console.log("I AM HERE 2")
      const res = await getUser();
    //   console.log("I am here 3")
      this.setState({user: JSON.parse(res)})
    //   console.log("USER:\n", this.state.user)
    //   console.log(JSON.parse(res).locations[0].id) 
    //   console.log("I am here 4")
      const res2 = await getAllSessionNotesByParticipantID(2);
    //   console.log("i am here 4")
    //   console.log("NOTES:\n", res2)
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
                <ScrollView contentContainerStyle = {

                    {
                        position: 'fixed',
                        paddingBottom: 75,
                        // overflow: 'hidden',
                        // backgroundColor: 'green',
                        alignItems: 'center'
                    }
                } 
                    style={{maxHeight: '100%', width: '85%'}}
                >
                    <AppButton
                            title = {this.state.edit ? "Save" : "Log Session"}
                            onPress={()=>this.setState({edit: !this.state.edit})}
                        />   
                    
                        <DateTextBox edit = {this.state.edit}/>
                {(this.props.trainerSessionSelected && this.props.isCheckpoint) &&
                
                <Measurements></Measurements>
    }
           
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
        paddingVertical: 30
    },
    categoryContainer: {
        // padding: 10,
        flexDirection: 'row',
        // justifyContent:'space-between',
        // height:56,
        width: '80%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",

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
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
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
});
