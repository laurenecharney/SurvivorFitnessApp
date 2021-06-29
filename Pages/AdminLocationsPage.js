import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {getLocations, getLocationByID} from '../APIServices/APIUtilities';
import {getLocationByID, getLocations} from '../APIServices/APIUtilities';
import deviceStorage from '../APIServices/deviceStorage';
export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);
import { AlphabetList } from "react-native-section-alphabet-list";

export default class AdminLocationsPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            isModalVisible: false,
            isAddModalVisible: false,
            isGymModalVisible: false,
            isDieticianModalVisible: false,
            name:"",
            location:"",
            admin:"",
            calls: [
         
            ],
            selectedLocation: {}
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    async componentDidMount(){
        await this.refreshLocations();
    }

    async refreshLocations(){
        try {
            const arr = await getLocations();
            this.setState({
               calls: arr.map(
                item => {
                    let newI = item;
                    newI.value = item.name
                    newI.id = parseInt(item.id)
                    newI.type = item.type
                    newI.icon = item.type === "TRAINER_GYM" ? 'dumbbell' : 'food-apple'
                    return newI;
                }
           )});
            } catch (e){
                console.log(e);
                alert("Could not fetch locations.");
            }
    }
    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }

     openModal = async (item) =>{
        this.setState({
            isModalVisible:true,
            selectedLocation: item,
        });
        try {
            const res = await getLocationByID(item.id);
            this.setState({
                selectedLocation: res,
                name: res.name,
                location: res.address,
                admin: res.administrator ? res.administrator.firstName + " " + res.administrator.lastName : "" 
            })
        } catch (e){
            alert("Could not retrieve location information")
        }
        
    }

    toggleModal = () =>{
        this.setState({
            isModalVisible:!this.state.isModalVisible
        })
    }
    closeModal = () =>{
        this.setState({
            isModalVisible:false,
            edit: false
        })
    }
    openAddModal = () =>{
        this.setState({
            isAddModalVisible:true
        })
    }

    toggleAddModal = () =>{
        this.setState({
            isAddModalVisible:!this.state.isAddModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false,
            edit: false

        })
    }
    openGymModal = () =>{
        this.setState({
            isGymModalVisible:true,
        })
    }

    toggleGymModal = () =>{
        this.setState({
            isGymModalVisible:!this.state.isGymModalVisible
        })
    }
    closeGymModal = () =>{
        this.setState({
            isGymModalVisible:false,
            edit: false

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
            isDieticianModalVisible:false,
            edit: false
        })
    }


    render() {
        return(
            <View style={{ flex: 1, backgroundColor:'#fff' }} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 40}}>
                    <Text style={styles.headline}>Locations</Text>
                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listContainer}>
                { <AlphabetList
                    data={this.state.calls}
                    indexLetterSize={46}
                    indexLetterColor={'#AED803'}
                    renderCustomSectionHeader={(section) => (
                        <View style={{visibility: 'hidden'}}/>
                        // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
                       // <View style={styles.sectionHeaderContainer}>
                       //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                       // </View>
                    )}
                    renderCustomItem={(item) => (
                        <View style={styles.row}>
                            <View>
                                <View style={styles.nameContainer}>
                                    <TouchableOpacity onPress={() => {
                                    const page = item && item.type === 'TRAINER_GYM' ? 'AdminTrainerPage' : 'AdminDieticianPage';
                                    this.props.navigation.navigate(page, 
                                    {locationId: item.id})
                                    }}>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Icon name={item.icon} style={styles.icon} size={25}/>
                                            <Text style={styles.nameTxt}>{item.value}</Text>
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.openModal(item)}
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
                    )}
                />}
                </View>
                <Modal propagateSwipe={true} 
                animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} 
                onSwipeComplete={()=>this.closeModal()} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '50%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                                        <Text style={{fontSize: 19, color: '#AED803'}} >Gym Information</Text>
                                    </View>
                        
                                    <View style={{marginLeft:40,  paddingTop:10, paddingBottom:10, width:'75%'}}>
                                       <View style={{flexDirection:"row", padding: 5}}>
                                        <Text style={{padding:5, fontSize: 15, color: '#797979'}} >Name: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.name || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="black"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newName => this.setState({name: newName})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{flexDirection:"row", padding: 5}}>
                                        <Text style={{padding:5, fontSize: 15, color: '#797979'}} >Address: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            ref={(input) => { this.secondTextInput = input; }}
                                            editable={this.state.edit}
                                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.location || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="black"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newLocation => this.setState({location: newLocation})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{flexDirection:"row", padding:5}}>
                                        <Text style={{padding:5, fontSize: 15, color: '#797979'}} >Admin: </Text>
                                        <View style={styles.child}>
                                        { 
                                            <TextInput style = {styles.input}
                                            editable={this.state.edit}
                                            ref={(input) => { this.thirdTextInput = input; }}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.admin || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="black"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newAdmin => this.setState({admin: newAdmin})}
                                            />
                                            }

                                        </View>
                                        </View>
                                    </View>
                                    <AppButton
                                        title = {this.state.edit ? "SAVE" : "EDIT"}
                                        onPress={()=>this.setState({edit: !this.state.edit})}
                                    />
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
                                        title = {"Dietitian Office"}
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
                                        <Text style={styles.modalText} >Add Dietitian Office</Text>
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
        fontWeight: "600"
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
    },    
    sectionHeaderContainer:{
        backgroundColor: '#E4E4E4'
    },
    sectionHeaderLabel:{
        fontSize: 16,
        paddingLeft: 10
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        marginTop: 10,
          height: 34
      },
      headingText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
      },
    title:{
        top: 7,
        fontSize: 16,
        fontWeight:'bold',
        color: '#838383',
    },
    listContainer:{
        paddingBottom: '33%'
    }

});