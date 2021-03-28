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

export default class AllPatientsPage extends Component {
  state = {
    isModalVisible:false
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      calls: [
        {id:1,  name: "First Last"},
        {id:2,  name: "First Last"} ,
        {id:3,  name: "First Last"} ,
        {id:4,  name: "First Last"} ,
        {id:5,  name: "First Last"} ,
        {id:6,  name: "First Last"} ,
        {id:8,  name: "First Last"} ,
        {id:9,  name: "First Last"} ,
        {id:10, name: "First Last"} ,
        {id:11, name: "First Last"},
        {id:12,  name: "First Last"} ,
        {id:13,  name: "First Last"} ,
        {id:14,  name: "First Last"} ,
        {id:15,  name: "First Last"} ,
        {id:16,  name: "First Last"} ,
        {id:17,  name: "First Last"} ,
        {id:18, name: "First Last"} ,
        {id:19, name: "First Last"},
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
  renderItem = ({item}) => {
    return (
        <ScrollView>
            <View style={styles.row}>
                <View>
                    <View style={styles.nameContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClientInformationPage')}><Text style={styles.nameTxt}>{item.name}</Text></TouchableOpacity>
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
    );
  }

  render() {
    return(
      <View style={{ flex: 1, backgroundColor:'#fff' }} >
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
          <Text style={styles.headline}>Participants</Text>
          <Icon2 style={styles.settings} size={50} name={'md-ellipsis-horizontal'}/>
        </View>
        <FlatList 
          extraData={this.state}
          data={this.state.calls}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
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
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                          <Text style={{fontSize: '19', color: '#AED803'}} >Participant Information</Text>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Name: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Age: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Email: </Text>
                          <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Phone Number: </Text>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Type of Cancer: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Treatment Facility: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Surgeries: </Text>
                          <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Forms of Treatment: </Text>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Trainer: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Dietician: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Start Date: </Text>
                          <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Goal(s): </Text>
                        </View>
                        <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Physician Notes: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Dietician: </Text>
                          <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Start Date: </Text>
                          <Text style={{padding:5,fontSize: '15', color: '#797979'}} >Goal(s): </Text>
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
    fontWeight: '600',
    color: '#3E3E3E',
    fontSize: 23,
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
});