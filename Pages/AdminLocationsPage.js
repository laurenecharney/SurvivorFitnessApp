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
    TextInput,
    Dimensions,
    FlatList,
    Button,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import TextBoxSingleLine from '../Components/TextBoxSingleLine.js';
import TextBoxComponent from "../Components/TextBoxComponent";

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class AdminLocationsPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            isGymModalVisible: false,
            isDieticianModalVisible: false,
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
    openAddModal = () =>{
        this.setState({
            isAddModalVisible:true
        })
    }

    toggleAddModal = () =>{
        this.setState({
            isAddModalVisible:!this.state.isModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false
        })
    }
    openGymModal = () =>{
        this.setState({
            isGymModalVisible:true,
        })
    }

    toggleGymModal = () =>{
        this.setState({
            isGymModalVisible:!this.state.isModalVisible
        })
    }
    closeGymModal = () =>{
        this.setState({
            isGymModalVisible:false
        })
    }

    openDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:true,
        })
    }

    toggleDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:!this.state.isDieticianModalVisible
        })
    }
    closeDieticianModal = () =>{
        this.setState({
            isDieticianModalVisible:false
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
                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
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
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeAddModal()} onSwipeComplete={()=>this.closeAddModal()} isVisible={this.state.isAddModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '40%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeAddModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:30, width:'100%'}}>
                                        <Text style={styles.modalText} >Add New Location</Text>
                                    </View>
                                    <AppButton
                                        title = {"Gym"}
                                        onPress={()=>this.openGymModal()}/>
                                    <AppButton
                                        title = {"Dietician Office"}
                                        onPress={()=>this.openDieticianModal()}/>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                    <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeGymModal()} onSwipeComplete={()=>this.closeGymModal()} transparent={true} isVisible={this.state.isGymModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '60%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeGymModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:10, width:'100%'}}>
                                        <Text style={styles.modalText} >Add Gym</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.childText}>Name</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>
                                        <Text style={styles.childText} >Address</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>
                                        <Text style={styles.childText}>Administrator</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>

                                    </View>
                                    <View style={{marginTop: 20}}>
                                        <AppButton
                                            title = {"Add"}/>
                                    </View>
                                    
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </Modal>
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeDieticianModal()} onSwipeComplete={()=>this.closeDieticianModal()} transparent={true} isVisible={this.state.isDieticianModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '60%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeDieticianModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:10, width:'100%'}}>
                                        <Text style={styles.modalText} >Add Dietician Office</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.childText}>Name</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>
                                        <Text style={styles.childText} >Address</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>
                                        <Text style={styles.childText}>Administrator</Text>
                                        <View style={styles.child}>
                                            <TextInput style = {styles.input}
                                                blurOnSubmit={false}
                                                underlineColorAndroid = "transparent"
                                                color="black"
                                                autoCapitalize = "sentences"
                                                />
                                        </View>

                                    </View>
                                    <View style={{marginTop: 20}}>
                                        <AppButton
                                            title = {"Add"}/>
                                    </View>
                                    
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </Modal>
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
    },
    addButtonContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 48,
        alignSelf: "center",
        margin: 5,
        marginTop: 50
    },
    addButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    modalText:{
            fontSize: 18,
            paddingTop: 20,
            alignSelf: "center",
            fontWeight: "bold",
            color: "#AED803",
    },
    addNewContainer: {
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 75,
        alignSelf: "center",
        margin: 5,
        marginTop: 50
    },
    addNewText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
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
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },

    child:{
        backgroundColor: 'white',
        padding:10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width:'75%',
        borderRadius: 5,
        alignSelf:"center"

    },
    childText:{
        fontSize:13,
        color:"#B7DC21",
        marginLeft: 30,
        padding: 12     
    }

});