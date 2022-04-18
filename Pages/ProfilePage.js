import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Heading } from "../Components/Heading";
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { SettingsRow } from "../Components/SettingsComponents/SettingsRow";
import { changePassword, updateProfile, getLocationByID} from "../APIServices/APIUtilities";
import { getUser,  getCurrentRole, getSpecialistType, } from "../APIServices/deviceStorage";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  TextInput,
  ScrollView,
  Alert
} from "react-native";

const profileFields = [
    {key: "firstName",           input: "text",      label: "First Name: ",                    options: [], edit: true},
    {key: "lastName",            input: "text",      label: "Last Name: ",                     options: [], edit: true},
    {key: "email",               input: "text",      label: "Email: ",                         options: [], edit: true},
    {key: "phoneNumber",         input: "text",      label: "Phone Number: ",                  options: [], edit: true}
]

const changePasswordFields = [
    {key: "currentPassword",      input: "text",      label: "Current Password: ",              options: [], edit: true},
    {key: "newPassword",          input: "text",      label: "New Password: ",                  options: [], edit: true},
    {key: "confirmPassword",      input: "text",      label: "Confirm New Password: ",          options: [], edit: true}
  ]

export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      expanded_info: false,
      expanded_password: false,
      phone_number: "Phone Number",
      email: "Email",
      isContactModalVisible: false,
      isChangePasswordVisible: false,
      edit: false,
      user:{},
      userId: "",
      passwordInformation:{
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      contactInformation:{
        firstName: "",
        lastName: "",
        email:"",
        phoneNumber:""
      },
      updateUser:{
        user: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
            phoneNumber: "",
            isSuperAdmin: "false"
            },
            locationAssignments: [
            {
                locationId: "",
                userRoleType: "TRAINER"
            },
            ]
      }
    };
  }

  async componentDidMount() {
    //get user
    const __user = JSON.parse(await getUser());
    let admin = false
    let role = "TRAINER"
    let temp = [[]]
    //get admin satus
    if(__user.roles.includes("SUPER_ADMIN")){
      admin = true
    }
    else{
      //maps locations & roles
      //get list of GYM locations 
      let locations = __user.locations
      let roles = __user.roles
      temp = locations.map(location => (
        roles.map(role =>({
          locationId: location.id, 
          userRoleType: role}))
      ));

    }
    

    
    this.setState({
      user: __user,
      userId: __user.id,
      contactInformation:{
        firstName: __user.firstName,
        lastName: __user.lastName,
        email: __user.email,
        phoneNumber: __user.phoneNumber
      },
      updateUser:{
        user: {
          firstName: __user.firstName,
          lastName:  __user.lastName,
          email: __user.email,
          phoneNumber: __user.phoneNumber,
          isSuperAdmin: admin,
          id: __user.id
        },
        locationAssignments: temp[0]
      }
    });
  }


  toggleExpandInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded_info: !this.state.expanded_info });
  };
  toggleExpandPassword = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded_password: !this.state.expanded_password });
  };

  openContactModal = async () => {
    this.setState({
      isContactModalVisible:true,
    });
  };

  closeContactModal = async () => {
    this.setState({
      isContactModalVisible: false
    });
  };

  openChangePasswordModal = () => {
    this.setState({
      isChangePasswordVisible:true,
    });
  };

  closeChangePasswordModal = () => {
    this.setState({
      isChangePasswordVisible: false
    });
  };

  goBack = () => {
    this.props.navigation.goBack()
  }

  changePassword = async (newInformation) => {
    if((newInformation.currentPassword != "") && (newInformation.newPassword != "") && (newInformation.newPassword == newInformation.confirmPassword)){
      try {
        const res = await changePassword(this.state.userId, newInformation.currentPassword, newInformation.newPassword)
        if(res.status == 403){
          Alert.alert(
            "Unable to Change Password",
            "The old password does not match the one currently saved in the database!",
            [
              { text: "OK" }
            ]
          )
          }
          else if(res.status == 200){
            Alert.alert(
              "Password Changed",
              "Password has been successfully changed!",
              [
                { text: "OK" }
              ]
            )
          }
          else{
            Alert.alert(
              "Unable to Change Password",
              "Unknown reason, try again!",
              [
                { text: "OK" }
              ]
            )
          }
      } catch (error) {
        console.log(error)
      }
    }
    else{Alert.alert(
      "Unable to Change Password",
      "The new passwords are not valid",
      [
        { text: "OK" }
      ]
    )
    }
  }

  updateUser = async (newInformation) => {
    if(newInformation.firstName){
      this.state.updateUser.user.firstName = newInformation.firstName
    }
    if(newInformation.lastName){
      this.state.updateUser.user.lastName = newInformation.lastName
    }
    if(newInformation.email){
      this.state.updateUser.user.email = newInformation.email
    }
    if(newInformation.phoneNumber){
      this.state.updateUser.user.phoneNumber = newInformation.phoneNumber
    }
    try {
      const res = await updateProfile(this.state.updateUser, this.state.userId)
      this.state.contactInformation.firstName = res.user.firstName
      this.state.contactInformation.lastName = res.user.lastName
      this.state.contactInformation.email = res.user.email
      this.state.contactInformation.phoneNumber = res.user.phoneNumber
      this.closeContactModal()
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading 
          title = "Profile"
          titleOnly = {false}
          displayAddButton = {false}
          displayBackButton = {true}
          displaySettingsButton = {false}
          callback = {this.goBack}/>
        <SettingsRow 
          title = "Contact Information"
          iconName = ''
          callback = {this.openContactModal}/>
        <SettingsRow 
          title = "Password Information"
          iconName = ''
          callback = {this.openChangePasswordModal}/>
        <AddEditModal 
          fields = {profileFields}
          information = {this.state.contactInformation}
          isChange = {true}
          title = {"Edit Profile Information"}
          visible = {this.state.isContactModalVisible} 
          changeInformation = {this.updateUser}
          callback = {this.closeContactModal}/>
         <AddEditModal 
          fields = {changePasswordFields}
          information = {[this.state.passwordInformation.currentPassword, this.state.passwordInformation.newPassword]}
          isChange = {true}
          title = {"Change Password"}
          visible = {this.state.isChangePasswordVisible} 
          changeInformation = {this.changePassword}
          callback = {this.closeChangePasswordModal}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#fff'
  },
});
