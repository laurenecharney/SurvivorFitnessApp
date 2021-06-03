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
  Settings,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {AlphabetList} from "react-native-section-alphabet-list";

export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const showAlert = () =>
  Alert.alert(
    "Are you sure you want to remove participant?",
    "Removal cannnot be undone.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Remove", onPress: () => console.log("Remove Pressed") }
    ]
  );

export default class AllPatientsPage extends Component {
  state = {
    isModalVisible:false
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      calls: [
        {id:1,  value: "Abby Cohen", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:2,  value: "Alicia Yang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:3,  value: "Charles Wang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:4,  value: "Grace Jeong", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:5,  value: "Ilya Ermakov", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:6,  value: "Lauren Charney", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:7,  value: "Gabby Cohen", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:8,  value: "Felicia Yang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:9,  value: "Bucky Wang", gym: "Orange Theory", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:10,  value: "Gracie Jeong", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:11,  value: "Bilya Ermakov", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"},
        {id:12,  value: "Corinne Charney", gym: "Effects Fitness", dietician: "Balance Nutrition", trainer: "trainer", nutritionist: "dietician"}
      ]
    };
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

  render() {
    return(
      <View style={{ flex: 1, backgroundColor:'#fff' }} >
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
          <Text style={styles.headline}>Participants</Text>
          <TouchableOpacity style={{paddingLeft: 87}} onPress={() => this.props.navigation.navigate('TrainerSettingsPage')}>
            <Icon2 style={styles.settings} size={30} name={'settings'}/>
            {/* <Image source={require('../assets/Group -1.png')} style={styles.logo} /> */}
          </TouchableOpacity>
        </View>
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
                          <Text style={styles.nameTxt}>{item.value}</Text>
                        
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
        <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} isVisible={this.state.isModalVisible}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                  <View style={{
                    backgroundColor: "#fff",
                    width: '90%',
                    height: '75%',
                    borderRadius:'19'}}>
                      <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeModal()}>
                        <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                      </TouchableOpacity>
                      <View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%', justifyContent: "center"}}>
                          <Text style={{fontSize: '19', color: '#AED803', fontWeight: "600"}} >Participant Information</Text>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%', justifyContent:"center"}}>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Name:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Grace Jeong </Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Age:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >45</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Phone Number:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >734-536-3809</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Email:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >grace@survivorfitness.com</Text>
                          </View>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                            <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Trainer:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Lauren Charney</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Dietitian:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Charles Wang</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Start Date</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >1/21/2021</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Goal(s)</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Build muscle</Text>
                          </View>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                        <View style={{flexDirection:"row", width:"75%"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Type of Cancer:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Lymphoma</Text>
                          </View>
                          <View style={{flexDirection:"row", width:"50%"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Treatment Facility:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Vanderbilt Medical Center</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Surgeries:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >N/A</Text>
                          </View>
                          <View style={{flexDirection:"row"}}> 
                            <Text style={{padding:10, fontSize: '13', color: '#AED803', fontWeight: '500'}} >Forms of Treatment:</Text>
                            <Text style={{padding:10, fontSize: '13', color: '#797979', fontWeight:'400', width:"75%"}} >Chemotherapy</Text>
                          </View>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10}}>
                          <View>
                            <Text style={{padding:10, fontSize: '15', color: '#797979'}} >Participant Progress Completed? </Text>
                            <View style={styles.appButtonContainer}>
                              <TouchableOpacity onPress={() => showAlert()}>
                                <Text style={styles.appButtonText}>Remove Participant</Text>
                              </TouchableOpacity>
                            </View>

                          </View>
                          
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
    marginLeft: 25,
    padding: 25,
    color: '#AED803',
    fontWeight: '500'
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
    padding: 50,
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
    fontWeight: '400',
    color: '#3E3E3E',
    fontSize: 18,
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
    fontSize: 12,
    color: "#fff",
    alignSelf: "center",
},
});