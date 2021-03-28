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



export default class AdminLocationsPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            calls: [
                {id:1,  name: "Effects Fitness", icon: "dumbbell"},
                {id:2,  name: "Balance Nutrition", icon:"food-apple"} ,
                {id:3,  name: "Free Method Nutrition", icon:"food-apple"} ,
                {id:4,  name: "Horizon Nutrition", icon:"food-apple"} ,
                {id:5,  name: "Next Level Fitness", icon:"dumbbell"} ,
                {id:6,  name: "Orange Theory", icon:"dumbbell"} ,
                {id:8,  name: "Renu Health", icon:"dumbbell"} ,
                {id:9,  name: "Location 9", icon:"?"} ,
                {id:10, name: "Location 10", icon:"?"} ,
                {id:11, name: "Location 11", icon:"?"},
                {id:12,  name: "Location 12", icon:"?"} ,
                {id:13,  name: "Location 13", icon:"?"} ,
                {id:14,  name: "Location 14", icon:"?"} ,
                {id:15,  name: "Location 15", icon:"?"} ,
                {id:16,  name: "Location 16", icon:"?"} ,
                {id:17,  name: "Location 17", icon:"?"} ,
                {id:18, name: "Location 18", icon:"?"} ,
                {id:19, name: "Location 19", icon:"?"},
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ClientInformationPage')}>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Icon name={item.icon} style={styles.icon} size={25}/>
                                <Text style={styles.nameTxt}>{item.name}</Text>
                            </View>

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
        );
    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor:'#fff' }} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.headline}>Locations</Text>
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
                            height: '40%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                                        <Text style={{fontSize: '19', color: '#AED803'}} >Gym Information</Text>
                                    </View>
                                    <View style={{marginLeft:40,  paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Name: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Location: </Text>
                                        <Text style={{padding:5, fontSize: '15', color: '#797979'}} >Administrator: </Text>
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
        marginLeft: 15,
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
        padding: 40,
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
        fontSize: 20,
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
    icon:{
        color: '#E4E4E4',
        paddingRight: 10,
    }
});