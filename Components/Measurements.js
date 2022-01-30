import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { callUpdateSession } from './SessionLogger'


export const Measurements = ({ measurementData, updateMeasurementData}) => {

    const [data, setData] = useState(measurementData ? measurementData : emptyMeasurementData);

    const [expanded_general, setExpanded_general] = useState("false");
    const [expanded_skin_fold, setExpanded_skin_fold] = useState("false");
    const [expanded_girth, setExpanded_girth] = useState("false");
    const [expanded_treadmill, setExpanded_treadmill] = useState("false");

    const getMeasurementInfo = (measurementName) => {
        let ret = {};
        try {
            for(let i = 0; i < measurementData.length; ++i) {
                // if there were many many measurements, it might be smart to create a 
                // map from measurement name to value to avoid this iteration
                if(measurementData[i].name == measurementName) ret = measurementData[i];
            }
        } catch(e) {
            console.log(e);
        }
        return ret;
    }

    const toggleExpandGeneral=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded_general( !expanded_general)
      }
    const toggleExpandSkinFold=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded_skin_fold(!expanded_skin_fold)
    }
    const toggleExpandGirth=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded_girth(!expanded_girth)
    }
    const toggleExpandTreadmill=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded_treadmill(!expanded_treadmill)
    }    

    useEffect(() => {
        setData(measurementData)
    }, [measurementData])

    const Measurement = ({measurement, id, measurementInfo, updateValue, postfix}) => {
        const [value, onChangeValue] = useState(measurementInfo.value);
        const inputRef = useRef();
        const editText = useCallback(() => {
            inputRef.current.focus();
        });

        return(
            <View style={[styles.measurement, {}]}>
                <Text 
                    style = {styles.measurementText}
                    onPress={() => editText()}
                >{measurement}{": "}</Text>
                <TextInput 
                    ref={inputRef}
                    style={[styles.measurementText]}
                    value={value}
                    onChangeText={onChangeValue}
                    onEndEditing={() => updateValue(measurementInfo, value)}
                    onFocus={() => console.log("focus")}
                    // placeholder={"enter a value"}
                ></TextInput>
                    <Text style = {[styles.measurementText, styles.postfix]}
                    onPress={() => editText()}
                    >{postfix}</Text>                
            </View>
        )
    }

    const CategoryHeader = ({category, toggle, expanded}) => {
        return(
            <View style={styles.categoryHeaderContainer}>
                <TouchableOpacity 
                style={styles.categoryHeaderButton} 
                onPress={() => toggle()}>
                    <Text style={styles.title}>{category}</Text>
                    <Icon name={!expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"#D5D5D5"} />
                </TouchableOpacity>
            </View>
        )
    }

    const MeasurementCategory = ({category, dataLabels, expanded, toggleExpand}) => {
        return (
            <View style={styles.categoryContainer}>
                <CategoryHeader
                            category={category}
                            toggle={toggleExpand}
                            expanded={expanded}
                            measurements={labels.generalData}
                ></CategoryHeader>
                { 
                    !expanded &&
                    <View style={styles.measurementContainer}>
                        {
                            dataLabels.map((item, i) => (
                                <Measurement
                                    key={item.id}
                                    measurement={item.measurement}
                                    id={item.id}
                                    measurementInfo = {getMeasurementInfo(item.measurement)}
                                    updateValue={updateValue}
                                    postfix={item.unit}
                                    // measurementValue={data[item.id]}
                                />
                            ))
                        }
                    </View>
                }
            </View>
        )
    }

    const updateValue = (measurementInfo, newValue) => {
        const measurementId = measurementInfo.id;
        const temp = data
        for (let i = 0; i < data.length; ++i) {
            if (temp[i].id == measurementId) {
                temp[i].value = newValue;
                break;
            }
        }
        setData(temp);
        updateMeasurementData(temp);
    }

    return (
        <KeyboardAwareScrollView style={styles.categoriesContainer}>
                    <MeasurementCategory
                        category={"General Data"}
                        dataLabels={labels.generalData}
                        expanded={expanded_general}
                        toggleExpand={toggleExpandGeneral}
                    />
                    <MeasurementCategory
                        category={"Skin Fold Tests"}
                        dataLabels={labels.skinFoldTests}
                        expanded={expanded_skin_fold}
                        toggleExpand={toggleExpandSkinFold}
                    />
                    <MeasurementCategory
                        category={"Girth Measurements (in)"}
                        dataLabels={labels.girthMeasurementTests}
                        expanded={expanded_girth}
                        toggleExpand={toggleExpandGirth}
                    />
                    <MeasurementCategory
                        category={"6 Minute Treadmill Test"}
                        dataLabels={labels.treadmillTests}
                        expanded={expanded_treadmill}
                        toggleExpand={toggleExpandTreadmill}
                    />
            </KeyboardAwareScrollView>

    )
}


const styles = StyleSheet.create({
    
    categoriesContainer: {
        paddingVertical: 8,
        width: '84%'
    },
    categoryContainer: {
        width: "100%",
    },
    categoryHeaderContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",

    },
    categoryHeaderButton: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        width: '100%',
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: .1,
        borderColor: '#D5D5D5',//"#C9C9C9",
        paddingRight: '15%',
    },
    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    measurementContainer: {
        width: "80%",
    },
    measurement:{
        paddingTop:25,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#D5D5D5",
        marginLeft: '10%',
        flexDirection: 'row',
    },
    measurementText: {
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',

        // minWidth: 30,
    },
    postfix: {
        flex: 1,
        paddingLeft: 5,
    }
});


const labels = {
    generalData: [
        {
            measurement: "Weight",
            id: "weight",
            unit: "lbs",
        },
        {
            measurement: "BMI",
            id: "BMI",
            unit: "",
        },
        {
            measurement: "Body Fat Percentage",
            id: "body_fat_pct",
            unit: "%",
        },
        {
            measurement: "Lean Mass",
            id: "lean_mass",
            unit: "lbs",
        },
        {
            measurement: "Blood Pressure",
            id: "blood_pressure",
            unit: "mmHg",
        },
        {
            measurement: "Range of Motion",
            id: "range_of_motion",
            unit: "",
        }
    ],
    skinFoldTests: [
        {
            measurement: "Abdominal Skin Fold",
            id: "Abdominal_skin_fold",
            unit: "",
        },
        {
            measurement: "Chest Skin Fold",
            id: "ChestSkinFold",
            unit: "",
        },
        {
            measurement: "Midaxillary",
            id: "Midaxillary",
            unit: "",
        },
        {
            measurement: "Subscapular",
            id: "Subscapular",
            unit: "",
        },
        {
            measurement: "Supraillac",
            id: "Supraillac",
            unit: "",
        },
        {
            measurement: "Thigh",
            id: "Thigh",
            unit: "",
        },
        {
            measurement: "Tricep",
            id: "Tricep",
            unit: "",
        },
    ],

    girthMeasurementTests: [
        {
            measurement: "Abdominal Girth",
            id: "Abdominal_girth",
            unit: "in",
        },
        {
            measurement: "Bicep Girth",
            id: "Bicep_girth",
            unit: "in",
        },
        {
            measurement: "Calf Girth",
            id: "Calf_girth",
            unit: "in",
        },
        {
            measurement: "Chest Girth",
            id: "ChestGirth",
            unit: "in",
        },
        {
            measurement: "Hip Girth",
            id: "Hip_girth",
            unit: "in",
        },
        {
            measurement: "Thigh Girth",
            id: "ThighGirth",
            unit: "in",
        },
        {
            measurement: "Waist Girth",
            id: "Waist_girth",
            unit: "in",
        },
        {
            measurement: "Total Inches Lost",
            id: "Total_Inches_Lost",
            unit: "in",
        }
    ],
    treadmillTests: [
        {
            measurement: "Distance",
            id: "Distance",
            unit: "",
        },
        {
            measurement: "Speed",
            id: "Speed",
            unit: "",
        },
        {
            measurement: "HR",
            id: "HR"
        },
        {
            measurement: "BR",
            id: "BR"
        },
    ]
}


const emptyMeasurementData = [
    {
        "id": 26,
        "name": "Weight",
        "value": "",
        "category": "General Data",
        "unit": "lbs"
    },
    {
        "id": 27,
        "name": "BMI",
        "value": "",
        "category": "General Data",
        "unit": "kg/m^2"
    },
    {
        "id": 28,
        "name": "Body Fat Percentage",
        "value": "",
        "category": "General Data",
        "unit": "%"
    },
    {
        "id": 29,
        "name": "Lean Mass",
        "value": "",
        "category": "General Data",
        "unit": "lbs"
    },
    {
        "id": 30,
        "name": "Blood Pressure",
        "value": "",
        "category": "General Data",
        "unit": "mm Hg"
    },
    {
        "id": 31,
        "name": "Range of Motion",
        "value": "",
        "category": "General Data",
        "unit": "degree"
    },
    {
        "id": 32,
        "name": "Abdominal Skin Fold",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 33,
        "name": "Chest Skin Fold",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 34,
        "name": "Midaxillary",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 35,
        "name": "Subscapular",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 36,
        "name": "Supraillac",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 37,
        "name": "Thigh",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 38,
        "name": "Tricep",
        "value": "",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "id": 39,
        "name": "Abdominal Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 40,
        "name": "Bicep Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 41,
        "name": "Calf Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 42,
        "name": "Chest Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 43,
        "name": "Hip Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 44,
        "name": "Thigh Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 45,
        "name": "Waist Girth",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 46,
        "name": "Total Inches Lost",
        "value": "",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "id": 47,
        "name": "Distance",
        "value": "",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "id": 48,
        "name": "Speed",
        "value": "",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "id": 49,
        "name": "HR",
        "value": "",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "id": 50,
        "name": "BR",
        "value": "",
        "category": "Treadmill Tests",
        "unit": "unit"
    }
]

