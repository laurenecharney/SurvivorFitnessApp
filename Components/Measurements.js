import React, { Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, 
  Platform,
  LayoutAnimation,
  TextInput,
  FlatList,
  SafeAreaView
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'
import DateTextBox from '../Components/DateTextBox'
import { getAllSessionNotesByParticipantID } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";









export const Measurements = ({ onPress, title }) => {

    const [data, setData] = useState(measurementData);
    const [expanded_general, setExpanded_general] = useState("false");
    const [expanded_skin_fold, setExpanded_skin_fold] = useState("false");
    const [expanded_girth, setExpanded_girth] = useState("false");
    const [expanded_treadmill, setExpanded_treadmill] = useState("false");

    const toggleExpandGeneral=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded_general( !expanded_general)
      }
    const toggleExpandSkinFold=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_skin_fold : !expanded_skin_fold})
    }
    const toggleExpandGirth=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_girth : !expanded_girth})
    }
    const toggleExpandTreadmill=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_treadmill : expanded_treadmill})
    }

    const Measurement = ({item, }) => {
        console.log(item)
        console.log(item.name)
        console.log("Measurement Name: ",data[item.name])
        return(
            <View style={styles.measurement}>
                <Text style = {styles.measurementText}>{item.measurement}{": " + data[item.id]}</Text>
            </View>
            
        )
    }

    const Category = ({categoryType, toggle}) => {
        const [expanded, setExpanded] = useState(false);
    
        const toggleExpansion = () => {
            setExpanded(!expanded)
            console.log("EXPAND MEASUREMENTS")
        }
    
        return(
            <View style={styles.categoryContainer}>
                <TouchableOpacity 
                style={styles.categoryRow} 
                onPress={() => toggle()}>
                    <Text style={styles.title}>{categoryType}</Text>
                    <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
                    
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.categoriesContainer}>
                    <Category
                        categoryType="General Data"
                        toggle={toggleExpandGeneral}
                        expanded={expanded_general}
                        measurements={labels.generalData}
                    >


                    </Category>
                    {
                        expanded_general &&

                        <View style={styles.measurementContainer}>
                            <FlatList
                                data={labels.generalData}
                                renderItem={Measurement}
                                keyExtractor={item => item.id}
                            />

                        </View>
                        

                    }
                    {
                        // expanded_general &&
                        // <View style={styles.measurementContainer}>
                        //     <Measurement
                        //         name="Weight"
                        //         strID="weight"
                        //         measurementValue={data.weight}>
                        //     </Measurement> 
                        //     <Measurement
                        //         name="BMI"
                        //         strID="BMI"
                        //         measurementValue={data.BMI}>
                        //     </Measurement>  
                        //     <Measurement
                        //         name="Body Fat Percentage"
                        //         strID="body_fat_pct"
                        //         measurementValue={data.body_fat_pct}>
                        //     </Measurement>  
                        //     <Measurement
                        //         name="Lean Mass"
                        //         strID="lean_mass"
                        //         measurementValue={data.lean_mass}>
                        //     </Measurement> 

                        // </View>               
    
                    }


                    <Category
                        categoryType="Skin Fold Tests"
                        toggle={toggleExpandSkinFold}
                        expanded={expanded_skin_fold}
                    ></Category>
                    {
                        // expanded_skin_fold &&
                        // <View style={styles.measurementContainer}>
                        //     <Measurement
                        //         measurementName="Abdominal"
                        //         measurementValue={data.Abdominal_skin_fold}>
                        //     </Measurement> 
                        //     <Measurement
                        //         measurementName="Chest"
                        //         measurementValue={data.ChestSkinFold}>
                        //     </Measurement>  
                        //     <Measurement
                        //         measurementName="Midaxillar"
                        //         measurementValue={data.Midaxillary}>
                        //     </Measurement>  
                        //     <Measurement
                        //         measurementName="Subscapular"
                        //         measurementValue={data.Subscapular}>
                        //     </Measurement> 
                        // </View>               
    
                    }
                    <Category
                        categoryType="Girth Measurements (in)"
                        toggle={toggleExpandGirth}
                        expanded={expanded_girth}
                    ></Category>
                    <Category
                        categoryType="6 Minute Treadmill Test"
                        toggle={toggleExpandTreadmill}
                        expanded={expanded_treadmill}
                    ></Category>
                </View>
    )
}


const styles = StyleSheet.create({
    
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
    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
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
    }
});


const labels = {
    generalData: [
        {
            measurement: "weight",
            id: "weight"
        },
        {
            measurement: "BMI",
            id: "BMI"
        },
        {
            measurement: "Body Fat Percentage",
            id: "body_fat_pct"
        },
        {
            measurement: "Lean Mass",
            id: "lean_mass"
        },
    ]
}

const measurementData = {
    weight: "150 lbs",//"Weight (lbs)",
    BMI: "23.1",
    body_fat_pct: "15.3%",
    total_body_fat: "23 lbs",
    lean_mass: "133 lbs", 
    blood_pressure: "120/80 mm Hg",
    range_of_motion:  "Range of Motion",
    resting_hr: "Resting HR (bpm)",
    Abdominal_skin_fold: "15",
    ChestSkinFold: "10",
    Midaxillary: "12",
    Subscapular: "8",
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
    BR: "BR"

}