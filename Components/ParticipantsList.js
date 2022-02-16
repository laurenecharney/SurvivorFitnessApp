import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AlphabetList } from "react-native-section-alphabet-list";
// import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { callUpdateSession } from './SessionLogger'


const callsString = ' [{"id":1476,"firstName":"Punita","lastName":"Septus","age":33,"email":"Punita.Septus@website.com","phoneNumber":"123 456 7890","startDate":1640116118038,"goals":"goals","typeOfCancer":"typeOfCancer","formsOfTreatment":"forms of treatment","surgeries":"surgeries","physicianNotes":"loremipsu","dietitian":{"id":6,"firstName":"Maple","lastName":"Tina","locations":[],"roles":[]},"dietitianLocation":{"id":19,"name":"Healthy Food Laboratory","type":"DIETICIAN_OFFICE"},"trainer":"Marciana Magne","trainerLocation":{"id":17,"name":"Life Fitness Academy","type":"TRAINER_GYM"},"treatmentProgramStatus":"IN_PROGRESS","value":"Punita Septus","key":1476,"gym":"Life Fitness Academy","dietician":"Healthy Food Laboratory","nutritionist":"Maple Tina"},{"id":1580,"firstName":"Celestino","lastName":"Maureen","age":34,"email":"Celestino.Maureen@website.com","phoneNumber":"123 456 7890","startDate":1640116118039,"goals":"goals","typeOfCancer":"typeOfCancer","formsOfTreatment":"forms of treatment","surgeries":"surgeries","physicianNotes":"loremipsu","dietitian":{"id":6,"firstName":"Maple","lastName":"Tina","locations":[],"roles":[]},"dietitianLocation":{"id":19,"name":"Healthy Food Laboratory","type":"DIETICIAN_OFFICE"},"trainer":"Marciana Magne","trainerLocation":{"id":17,"name":"Life Fitness Academy","type":"TRAINER_GYM"},"treatmentProgramStatus":"IN_PROGRESS","value":"Celestino Maureen","key":1580,"gym":"Life Fitness Academy","dietician":"Healthy Food Laboratory","nutritionist":"Maple Tina"}] ';
const info = JSON.parse(callsString)

export const ParticipantsList = ({participantsInfo, openModal, showTrainer, showDietitian, showLocations, listType}) => {
    const navigation = useNavigation();

    const TrainerText = ({item}) => {
      return (
        <View style={styles.subTextContainer}>
            <Icon name={"dumbbell"} color={"#AED803"} />
            <Text style={styles.subText}> {showLocations && item.gym + " >" }  {item.trainer} </Text>
        </View>
      ) 
    }

    const DietitianText = ({item}) => {
      return (
        <View style={[styles.subTextContainer, showTrainer && {paddingTop: 5}]}>
            <Icon name={"food-apple"} color={"#AED803"}/>
            <Text style={styles.subText}>{showLocations && item.dietitianLocation.name + " >"} {item.nutritionist}</Text>
        </View>
      )
    }

    const navigate = ({item}) => {
        if (listType === "participants") {
          const routeParams =
                    {
                        id: item.id,
                        name: item.firstName + ' ' + item.lastName
                    } ;
          navigation.navigate('ClientInformationPage', routeParams);
        }
    }

    return (
        <View style={styles.container}>
          <AlphabetList
            data={participantsInfo}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
                <View style={{ visibility: "hidden" }} />
            )}
            renderCustomItem={item => (
                <View style={styles.row}>
                  <View style={styles.nameContainer}>
                    <View>
                      <TouchableOpacity
                          onPress={() => {
                            navigate({item})
                          }}
                      >
                          <Text style={styles.nameTxt}>{item.value}</Text>
                          {
                            showTrainer &&
                            <TrainerText item={item}/>
                          }
                          {
                            showDietitian &&
                            <DietitianText item={item}/>
                          }
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => openModal(item)}
                      style={styles.infoButton}
                      hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                    >
                        <Text style={styles.infoTxt}>i</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )}
          />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      paddingBottom: '33%'
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
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1,
      width: "100%",
      paddingLeft:10,
      paddingRight:10
      },
      nameTxt: {
          fontWeight: '400',
          color: '#3E3E3E',
          fontSize: 18,
          paddingBottom: 10,
          
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
      participantButton: {
        
      },
      subText: {
        color: "#cfcfcf",
        fontSize: 12,
      },
      subTextContainer: {
        flexDirection: "row",
        flex: 1,
      }

});