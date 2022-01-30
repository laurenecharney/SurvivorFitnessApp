import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {AlphabetList} from "react-native-section-alphabet-list";
import {getParticipants, getParticipantByID} from '../APIServices/APIUtilities';
// import { color } from 'react-native-reanimated';
import { ParticipantsList } from '../Components/ParticipantsList';


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class AdminClientPage extends Component {
    state = {
        isModalVisible:false
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isAddModalVisible: false,
            isEditModalVisible: false,
            name:"",
            age:"",
            email:"",
            phoneNumber:"",
            cancer:"",
            treatmentFacility:"",
            surgeries:"",
            formsOfTreatments:"",
            doctNotes:"",
            trainer:"",
            dietitian:"",
            startDate:"",
            goals:"",
            calls: [
            ],
            selectedParticipant: {},
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    async componentDidMount(){
        try {
            const res = await getParticipants(null,null);
           this.setState({calls: res
               .map(
               item => {
                let newI = item;
                newI.value = item.firstName && item.lastName ? (item.firstName + " " + item.lastName) : ""
                newI.key = parseInt(item.id);
                newI.gym = item.trainerLocation ? item.trainerLocation.name : '';
                newI.trainer = item.trainer ? item.trainer.firstName + " " + item.trainer.lastName : '';
                newI.dietician = item.dietitianLocation ? item.dietitianLocation.name : '';
                newI.nutritionist = item.dietitian ? item.dietitian.firstName + " " + item.dietitian.lastName : ''; 
                return newI; 
               
               })})
          
       } catch (e){
           console.log(e);
           alert("Could not fetch participants data");
       }

   }
   openModal = async (participant) =>{
       this.setState({
           isModalVisible:true,
           selectedParticipant: participant
       });
       try {
        const res = await getParticipantByID(participant.id);
        this.setState({
            //name: (res.firstName + " " + res.lastName),
            //dietician: (res.dietitian.firstName+ " " + res.dietitian.lastName),
            //trainer: (res.trainer.firstName+ " " + res.trainer.lastName),
            //age: res.age,
            //email: res.email,
            //phoneNumber: res.phoneNumber,
            //cancer: res.typeOfCancer,
            //formsOfTreatments: res.formsOfTreatment,
            //goals: res.goals,
            //doctNotes: res.physicianNotes,
            //startDate: res.startDate.substring(0,10),
            //surgeries: res.surgeries,
        })
       
        

    } catch (e){
        console.log(e);
        alert("Could not fetch participants data");
    }


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
    openEditModal = () =>{
        this.setState({
            isEditModalVisible:true,
            edit: true
        })
    }

    toggleEditModal = () =>{
        this.setState({
            isEditModalVisible:!this.state.isEditModalVisible
        })
    }
    closeEditModal = () =>{
        this.setState({
            isEditModalVisible:false,
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
            isAddModalVisible:!this.state.isModalVisible
        })
    }
    closeAddModal = () =>{
        this.setState({
            isAddModalVisible:false
        })
    }

    renderModalSection = () => {

    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor:'#fff' }} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight : 25}}>
                    <Text style={styles.headline}>Participants (super admin)</Text>

                    <View style={styles.addButtonContainer} >
                        <TouchableOpacity onPress={()=>this.openAddModal()}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ParticipantsList
                    participantsInfo={this.state.calls}
                    openModal={item => this.openModal(item)}
                    showLocations={true}
                    showTrainer={true}
                    showDietitian={true}
                />   
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '70%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:30}} onPress={()=>this.closeModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:30, width:'75%'}}>
                                        <Text style={{fontSize: 19, color: '#AED803', fontWeight: "500"}} >Participant Information</Text>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View  style={{justifyContent: 'space-between'}}>
                                            <TouchableOpacity onPress={()=>this.openEditModal()}>
                                                <Text style = {styles.editStyle}>edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther} >Name: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.value}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther} >Age: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.age}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther} >Email: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.email}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Phone Number: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.phoneNumber}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Type of Cancer: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.typeOfCancer}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Treatment Facility: </Text>
                                            <Text style={{color: '#797979'}}>Fill</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Surgeries: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.surgeries}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Forms of Treatment: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.formsOfTreatment}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther} >Physician Notes: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.physicianNotes}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingTop:10, paddingBottom:10, width:'75%'}}>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Trainer: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.trainer}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther} >Dietitian: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.nutritionist}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Start Date: </Text>
                                            <Text style={{color: '#797979'}}>{this.state.startDate}</Text>
                                        </View>
                                        <View style={{flexDirection:"row", paddingBottom:25,width:'75%' }}>
                                            <Text style={styles.participantInfoOther}  >Goal(s): </Text>
                                            <Text style={{color: '#797979'}}>{this.state.selectedParticipant.goals}</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                    <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeEditModal()} onSwipeComplete={()=>this.closeEditModal()} isVisible={this.state.isEditModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '90%',
                            height: '90%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:30}} onPress={()=>this.closeEditModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>

                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    
                                    <View style={{marginLeft:40, borderBottomWidth:1, borderBottomColor: "#E4E4E4", paddingBottom:20, width:'75%'}}>
                                        <Text style={{fontSize: 19, color: '#AED803', fontWeight: "500"}} >Edit Participant Information</Text>
                                    </View>
                                    <View style={{marginLeft:40,  paddingTop:10, paddingBottom:10, width:'75%'}}>
                                    <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Name: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.name || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newName => this.setState({name: newName})}
                                            />
                                        }

                                        </View>
                                        </View>

                                        
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Phone: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.phoneNumber || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newPhoneNumber => this.setState({phoneNumber: newPhoneNumber})}
                                            />
                                        }

                                        </View>
                                        </View>

                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Email: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.email || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newEmail => this.setState({email: newEmail})}
                                            />
                                        }

                                        </View>
                                        </View>

                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo}>Type of Cancer: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.typeOfCancer || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newTypeOfCancer => this.setState({typeOfCancer: newTypeOfCancer})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Treatment Facility: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.treatmentFacility || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newTreatmentFacility => this.setState({treatmentFacility: newTreatmentFacility})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Surgeries: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.surgeries || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newSurgeries => this.setState({surgeries: newSurgeries})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo}>Forms of Treatmnet: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.formsOfTreatments|| ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newFOT => this.setState({formsOfTreatments: newFOT})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo}>Physician Notes: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.doctNotes || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newDoctNotes => this.setState({doctNotes: newDoctNotes})}
                                            />
                                        }

                                        </View>
                                        </View>
                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Trainer: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.trainer || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newTrainer => this.setState({trainer: newTrainer})}
                                            />
                                        }

                                        </View>
                                        </View>

                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Dietitian: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.dietitian || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newDietician => this.setState({dietitian: newDietician})}
                                            />
                                        }

                                        </View>
                                        </View>

                                        <View style={{paddingBottom: 20}}>
                                        <Text style={styles.participantInfo} >Start Date: </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.startDate || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newStartDate => this.setState({startDate: newStartDate})}
                                            />
                                        }

                                        </View>
                                        </View>


                                        <View style={{paddingBottom: 20}}>
                                        <Text sstyle={styles.participantInfo} >Goal(s): </Text>
                                        <View style={styles.child}>
                                        {
                                            <TextInput style = {styles.input}
                                            returnKeyType="done"
                                            editable={this.state.edit}
                                            //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            blurOnSubmit={false}
                                            underlineColorAndroid = "transparent"
                                            defaultValue = {this.state.goals || ''}
                                            placeholderTextColor = "#D5D5D5"
                                            color="#797979"
                                            autoCapitalize = "sentences"
                                            onChangeText = {newGoals => this.setState({goals: newGoals})}
                                            />
                                        }

                                        </View>
                                        </View>
                                    
                                        
                                        <TouchableOpacity>
                                            <Text style = {{fontSize: 14, color: "#AED803",alignSelf: "center"}}>remove</Text>
                                        </TouchableOpacity>
                                        <AppButton
                                            title={this.state.edit ? "SAVE" : "EDIT"}
                                            onPress={() => {()=>this.closeEditModal()}}
                                            />

                                        </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>  
                    </Modal>
                </Modal>
                <Modal propagateSwipe={true} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeAddModal()} onSwipeComplete={()=>this.closeAddModal()} transparent={true} isVisible={this.state.isAddModalVisible}>
                    <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: "#fff",
                            width: '95%',
                            height: '95%',
                            borderRadius:'19'}}>
                            <TouchableOpacity style={{paddingLeft:260, paddingTop:10}} onPress={()=>this.closeAddModal()}>
                                <Icon name={'close'} color={'#E4E4E4'} size={32}/>
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{paddingBottom:10, width:'100%'}}>
                                        <Text style={styles.modalText} >Add Participant</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.childText}>First Name</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Last Name</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText} >Age</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Email</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Phone Number</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Gym</Text>
                                        <DropDownPicker
                                            items={[
                                                {label: 'Orange Theory', value: 'item1'},
                                                {label: 'Effects Fitness', value: 'item2'},
                                                {label: 'Next Level Fitness', value: 'item3'},
                                            ]}
                                            defaultIndex={0}
                                            containerStyle={styles.dropdown}
                                            onChangeItem={item => console.log(item.label, item.value)}
                                        />

                                        <Text style={styles.childText}>Dietitian Office</Text>
                                        <DropDownPicker
                                            items={[
                                                {label: 'Renu Health', value: 'item1'},
                                                {label: 'Balance Nutrition', value: 'item2'},
                                                {label: 'ree Method Nutrition', value: 'item3'},
                                            ]}
                                            textColor = "#E6E7E6"
                                            defaultIndex={0}
                                            containerStyle={styles.dropdown}
                                            onChangeItem={item => console.log(item)}
                                        />
                                        <Text style={styles.childText}>Start Date</Text>
                                        <View style={styles.childPt2}>
                                            <TextInput style = {styles.input}
                                                       blurOnSubmit={false}
                                                       underlineColorAndroid = "transparent"
                                                       color="black"
                                                       autoCapitalize = "sentences"
                                            />
                                        </View>
                                        <Text style={styles.childText}>Goal(s)</Text>
                                        <View style={styles.childPt2}>
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

            </View>
        );
    }
}

//diff sections of the modal for attributes to display. 
//Each one contains a prop name + key 

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
    editStyle: {
        fontSize: 14,
        color: "#AED803",
        alignSelf: "center",
        alignSelf: 'flex-end'
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
        width:'100%',
        borderRadius: 5,
        alignSelf:"center"

    },
    childPt2: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        width: "75%",
        borderRadius: 5,
        alignSelf: "center"
      },
    childText:{
        fontSize:13,
        color:"#B7DC21",
        marginLeft: 30,
        padding: 12
    },
    dropdown:{
        backgroundColor: 'white',
        padding:3,
        width:'78%',
        borderRadius: 5,
        alignSelf:"center"
    },
    gymTxt: {
        color: '#cfcfcf',
        fontSize: 12,
        width:170,
        paddingLeft: 10,
    },
    listContainer:{
        paddingBottom: '33%'
    },
    participantInfo:{
        fontSize: 15, 
        color: '#AED803', 
        paddingBottom: 10
    },
    participantInfoOther:{
        fontSize: 15, 
        color: '#AED803', 
    },

});