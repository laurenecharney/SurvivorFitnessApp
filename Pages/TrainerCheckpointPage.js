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

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const Category = (props) => {

    return(
        <View style={styles.categoryContainer}>
            <TouchableOpacity 
            style={styles.categoryRow} 
            onPress={()=>props.toggle()}>
                            <Text style={[styles.title, styles.font]}>{props.categoryType}</Text>
                            {/* <Icon name={'keyboard-arrow-down'} size={30} color={'#838383'} style={styles.arrowIcon}/> */}
                            <Icon name={props.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
            </TouchableOpacity>
        </View>
    )
}

const Measurement = (props) => {
    return(
        <View style={styles.child}>
            <Text style = {{color: "#D5D5D5"}}>{props.measurementName}{" " + props.measurementValue}</Text>
        </View>
        
    )
}

export default class TrainerCheckpointPage  extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: {},
            expanded_general: false,
            expanded_skin_fold: false,
            expanded_girth: false,
            expanded_treadmill: false,
            weight: 150,//"Weight (lbs)",
            BMI: "BMI",
            body_fat_pct: "Body Fat Percentage",
            total_body_fat: "Total Body Fat (lbs)",
            lean_mass: "Lean Mass", 
            blood_pressure: "Blood Pressure (mm Hg)",
            range_of_motion:  "Range of Motion",
            resting_hr: "Resting HR (bpm)",
            Abdominal_skin_fold: "Abdominal",
            ChestSkinFold: "Chest",
            Midaxillary: "Midaxillary",
            Subscapular: "Subscapular",
            Supraillac: "Supraillac",
            Thigh: "Thigh",
            Tricep: "Tricep",
            Abdominal_girth: "Abdominal",
            Biceps: "Biceps",
            Calf: "Calf",
            ChestGirth: "Chest",
            Hip: "Hip",
            Shoulders: "Shoulders",
           ThighGirth: "Thigh",
            Waist: "Waist",
            Total_Inches_Lost: "Total Inches Lost",
            Distance: "Distance",
            Speed: "Speed",
            HR: "HR",
            BR: "BR",
            trainerNotes: "",
            edit: false

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }


    toggleExpandGeneral=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_general : !this.state.expanded_general})
      }
    toggleExpandSkinFold=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_skin_fold : !this.state.expanded_skin_fold})
    }
    toggleExpandGirth=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_girth : !this.state.expanded_girth})
    }
    toggleExpandTreadmill=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_treadmill : !this.state.expanded_treadmill})
    }


    async fetchUser() {
      console.log("I AM HERE 2")
      const res = await getUser();
      console.log("I am here 3")
      this.setState({user: JSON.parse(res)})
      console.log("USER:\n", this.state.user)
      console.log(JSON.parse(res).locations[0].id) 
      console.log("I am here 4")
      const res2 = await getAllSessionNotesByParticipantID(2);
      console.log("i am here 4")
      console.log("NOTES:\n", res2)
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
                
                    <Category
                        categoryType="General Data"
                        toggle={this.toggleExpandGeneral}
                        expanded={this.state.expanded_general}
                    ></Category>
                    {
                        this.state.expanded_general &&
                        <View style={styles.measurementContainer}>
                            <Measurement
                                measurementName="Weight"
                                measurementValue={this.state.weight}>
                            </Measurement> 
                            <Measurement
                                measurementName="BMI"
                                measurementValue="">
                            </Measurement>  
                            <Measurement
                                measurementName="Body Fat Percentage"
                                measurementValue="">
                            </Measurement>  

                        </View>               
                        // <View style={styles.child}>
                        //     <Text style = {{color: "#D5D5D5"}}>Weight: {this.state.weight =="Weight (lbs)" ? "": this.state.weight} lbs</Text>
                        //     </View>
    
                    }

                    <Category
                        categoryType="Skin Fold Tests"
                        toggle={this.toggleExpandSkinFold}
                        expanded={this.state.expanded_skin_fold}
                    ></Category>
                    <Category
                        categoryType="Girth Measurements (in)"
                        toggle={this.toggleExpandGirth}
                        expanded={this.state.expanded_girth}
                    ></Category>
                    <Category
                        categoryType="6 Minute Treadmill Test"
                        toggle={this.toggleExpandTreadmill}
                        expanded={this.state.expanded_treadmill}
                    ></Category>
                    
            {/* <View style={styles.wrapper}>      */}
                <View style={styles.notes}>
                    <Text style = {styles.title}> Notes: </Text>
                    <MultilineInputSaveComponent
                        edit={this.state.edit}
                        value={this.state.trainerNotes}
                        placeholder = "Record Routine, exercise reps ... "
                        changeText = {newValue => this.changeText(newValue)}
                        //heading = "Trainer Notes"
                    />

                    {/* <Text style={{fontSize: 10, padding: 10,margin:10}}>
                        *If needed, please contact ____ with any concerns or questions.
                    </Text> */}

                    <Text style = {styles.title}> Admin Notes: </Text>
                    <MultilineInputSaveComponent
                        edit={false}
                        value={"Lorem Impsum dolor"}
                        placeholder = ""
                        changeText = {newValue => this.changeText(newValue)}
                        //heading = "Admin Notes"
                    />
                </View>
        
                    
            {/* </View>    */}
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
    categoryContainer: {
        // backgroundColor: 'blue',
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
    measurementContainer: {
        width: "70%"
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
    child:{
        // backgroundColor: 'blue',
        padding:16,
        borderBottomWidth: 1,
        borderColor: "#D5D5D5",
        // width:'60%',
        marginLeft:30,
        flexDirection: 'row',
        // width: '100%'

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
