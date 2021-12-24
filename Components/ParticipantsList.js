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

export const ParticipantsList = ({participantsInfo, openModal, showTrainer, showDietitian, showLocations}) => {
    const navigation = useNavigation();
    const [showParticipants, setShowParticipants] = useState(false);


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
                    <TouchableOpacity style={styles.participantButton}
                        onPress={() => {
                            const routeParams =
                                {
                                    id: item.id,
                                    name: item.firstName + ' ' + item.lastName
                                } ;
                            navigation.navigate('ClientInformationPage', routeParams);
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
                    <TouchableOpacity
                      onPress={() => openModal(item)}
                      style={styles.infoButton}
                      hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                    >
                        <Text style={styles.infoButtonText}>i</Text>
                    </TouchableOpacity>
                </View>
            )}
          />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#E6E6E6",
        backgroundColor: "#fff",
        width: "75%",
        borderBottomWidth: 0.25,
        borderTopWidth: 0.25,
        justifyContent: "space-between",
        alignSelf: 'center',
        paddingVertical: 15,
        height: 90
      },
    nameTxt: {
      fontWeight: "400",
      color: "#3E3E3E",
      fontSize: 18,
      paddingBottom: 5,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 280
      },
      infoButton: {
        borderWidth: 1,
        borderColor: "#AED803",
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        backgroundColor: "#fff",
        borderRadius: 50,

      },
      infoButtonText: { 
          color: "#AED803"
          
      },
      participantButton: {
      },
      subText: {
        color: "#cfcfcf",
        fontSize: 12,
        paddingLeft: 10
      },
      subTextContainer: {
        flexDirection: "row",
        flex: 1,
      }

});