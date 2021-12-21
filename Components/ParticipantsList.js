import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { AlphabetList } from "react-native-section-alphabet-list";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { callUpdateSession } from './SessionLogger'


const callsString = ' [{"id":1476,"firstName":"Punita","lastName":"Septus","age":33,"email":"Punita.Septus@website.com","phoneNumber":"123 456 7890","startDate":1640116118038,"goals":"goals","typeOfCancer":"typeOfCancer","formsOfTreatment":"forms of treatment","surgeries":"surgeries","physicianNotes":"loremipsu","dietitian":{"id":6,"firstName":"Maple","lastName":"Tina","locations":[],"roles":[]},"dietitianLocation":{"id":19,"name":"Healthy Food Laboratory","type":"DIETICIAN_OFFICE"},"trainer":"Marciana Magne","trainerLocation":{"id":17,"name":"Life Fitness Academy","type":"TRAINER_GYM"},"treatmentProgramStatus":"IN_PROGRESS","value":"Punita Septus","key":1476,"gym":"Life Fitness Academy","dietician":"Healthy Food Laboratory","nutritionist":"Maple Tina"},{"id":1580,"firstName":"Celestino","lastName":"Maureen","age":34,"email":"Celestino.Maureen@website.com","phoneNumber":"123 456 7890","startDate":1640116118039,"goals":"goals","typeOfCancer":"typeOfCancer","formsOfTreatment":"forms of treatment","surgeries":"surgeries","physicianNotes":"loremipsu","dietitian":{"id":6,"firstName":"Maple","lastName":"Tina","locations":[],"roles":[]},"dietitianLocation":{"id":19,"name":"Healthy Food Laboratory","type":"DIETICIAN_OFFICE"},"trainer":"Marciana Magne","trainerLocation":{"id":17,"name":"Life Fitness Academy","type":"TRAINER_GYM"},"treatmentProgramStatus":"IN_PROGRESS","value":"Celestino Maureen","key":1580,"gym":"Life Fitness Academy","dietician":"Healthy Food Laboratory","nutritionist":"Maple Tina"}] ';
const info = JSON.parse(callsString)

export const ParticipantsList = ({participantsInfo, openModal}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <AlphabetList
            data={info}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
              <View style={{ visibility: "hidden" }} />
  
            )}
            renderCustomItem={item => (
                <View style={styles.row}>
                  <View>
                    <View style={styles.nameContainer}>
                    <TouchableOpacity 
                      onPress={() => {
                          console.log("press")
                          const routeParams =
                              {
                                  id: item.id,
                                  name: item.firstName + ' ' + item.lastName
                              } ;
                          navigation.navigate('ClientInformationPage', routeParams);
                      }}
                    >
                        <Text style={styles.nameTxt}>{item.value}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openModal(item)}
                        style={styles.infoButton}
                        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                      >
                        <Text style={styles.infoButtonText}>i</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            )}
          />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: 50,
        // width: 50,
        // backgroundColor: 'red',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#E6E6E6",
        backgroundColor: "#fff",
        borderBottomWidth: 0.25,
        borderTopWidth: 0.25,
        padding: 50
      },
    nameTxt: {
    fontWeight: "400",
    color: "#3E3E3E",
    fontSize: 18,
    width: 170
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
        borderRadius: 50
      },
      infoButtonText: { 
          color: "#AED803"
      }
});