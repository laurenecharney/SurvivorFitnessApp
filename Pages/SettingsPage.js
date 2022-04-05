import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  getUser,
  saveUserInfo,
  deleteJWT,
  deleteCurrentRole,
  deleteUserInfo,
  saveCurrentRole,
  saveSpecialistType, 
  getCurrentRole
} from "../APIServices/deviceStorage";
import { Heading } from "../Components/Heading";
import { SettingsRow } from "../Components/SettingsComponents/SettingsRow";
import { Logout } from "../Components/SettingsComponents/Logout";
import { exportData } from "../APIServices/APIUtilities";

function getAdminRole(roles) {
  if (roles && roles.includes("LOCATION_ADMINISTRATOR")) {
    return "LOCATION_ADMINISTRATOR";
  } else if (roles && roles.includes("LOCATION_ADMINISTRATOR")) {
    return "SUPER_ADMIN";
  } else {
    return false;
  }
}

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.navigateProfile = this.navigateProfile.bind(this);
    this.switchToTrainerAccount = this.switchToTrainerAccount.bind(this);
    this.switchToDieticianAccount = this.switchToDieticianAccount.bind(this);
    this.switchToLocationAdmin = this.switchToLocationAdmin.bind(this);
    this.switchToSuperAdmin = this.switchToSuperAdmin.bind(this);
    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.state = {
      user: {},
      adminRole: "",
      currentRole: "",
    };
  }

  async componentDidMount() {
    const __user = JSON.parse(await getUser());
    const currentRole = await getCurrentRole();
    this.setState({
      user: __user,
      currentRole: JSON.parse(currentRole),
      adminRole: getAdminRole(__user.roles)
    });

    //console.log("show switch to trainer: ", __user.roles && __user.roles.includes("TRAINER") && currentRole !== "TRAINER")


    //console.log("currentRole: ", currentRole)
  }

  async switchToLocationAdmin(user){
    await saveCurrentRole("LOCATION_ADMINISTRATOR");
    this.props.navigation.pop();
    this.props.navigation.replace("LocationAdminPage", {
      screen: "Participants",
      params: {
        userType: user.roles.includes("TRAINER")
          ? "TRAINER"
          : "DIETITIAN",
        locationId: 28//user.locations ? user.locations[0].id : null
      }
    });
    await saveCurrentRole("LOCATION_ADMINISTRATOR");
    if (user.roles.includes("TRAINER")) {
        await saveSpecialistType("TRAINER");
    } else if (user.roles.includes("DIETITIAN")) {
        await saveSpecialistType("DIETITIAN");
    }
  }

  async switchToSuperAdmin(){
    await saveCurrentRole("SUPER_ADMIN");
    this.props.navigation.pop();
    this.props.navigation.replace("SuperAdminPage");
  }

  async switchToTrainerAccount(){
    await saveCurrentRole("TRAINER");
    this.props.navigation.replace("AllPatientsPage", {participantsParam: {trainerUserId:28}});
  }

  async switchToDieticianAccount(){
    await saveCurrentRole("DIETITIAN");
    this.props.navigation.replace("AllPatientsPage", {participantsParam: {dietitianUserId:31}});
  }

  goBack() {
    this.props.navigation.navigate("AllPatientsPage")
  }
  
  navigateProfile() {
    this.props.navigation.navigate("ProfilePage")
  }

  downloadData = async () => {
    try {
      const res = await exportData()
      if(res.status == 403){
        Alert.alert(
          "Unable to Export Data",
          "Please try again",
          [
            { text: "OK" }
          ]
        )
      }
      else if(res.status == 400){
        Alert.alert(
        "Unable to Export Data",
        "Please try again",
        [
            { text: "OK" }
        ]
        )
      }
      else if(res.status == 200){
        Alert.alert(
        "Data Exported Successfully",
        "Data will be sent to email once completed",
        [
            { text: "OK" }
        ]
        )
      }
    } catch (error) {
      console.log("Export Error", error)
    }
  }

  logout(){
    deleteJWT();
    deleteCurrentRole();
    deleteUserInfo();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "LoginPage" }]
    });
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
         <Heading 
            title = "Settings"
            titleOnly = {true}
            displayAddButton = {false}
            displayBackButton = {false}
            displaySettingsButton = {false}/>
        <SettingsRow 
            title = "Profile"
            iconName = 'keyboard-arrow-right'
            user = {user}
            callback = {this.navigateProfile}/>
        {user.roles && user.roles.includes("TRAINER") && this.state.currentRole !== "TRAINER" && (
          <SettingsRow 
            title = "Switch to Trainer Account"
            iconName = 'keyboard-arrow-right'
            user = {user}
            callback = {this.switchToTrainerAccount}/>
        )}
        {user.roles && user.roles.includes("DIETITIAN") && this.state.currentRole !== "DIETITIAN"  && (
          <SettingsRow 
            title = "Switch to Dietitian Account"
            iconName = 'keyboard-arrow-right'
            user = {user}
            callback = {this.switchToDieticianAccount}/>
        )}
        {this.state.adminRole === "LOCATION_ADMINISTRATOR" && this.state.currentRole !== "LOCATION_ADMINISTRATOR" && (
          <SettingsRow 
            title = "Switch to Location Admin Account"
            iconName = 'keyboard-arrow-right'
            user = {user}
            callback = {this.switchToLocationAdmin}/>
        )}
        {this.state.adminRole === "SUPER_ADMIN" && this.state.currentRole !== "SUPER_ADMIN" && (
          <SettingsRow 
            title = "Switch to Super Admin Account"
            iconName = 'keyboard-arrow-right'
            user = {user}
            callback = {this.switchToSuperAdmin}/>
        )}
        {this.state.currentRole !== "TRAINER" && (
          <SettingsRow 
          title = "Download Data"
          iconName = 'get-app'
          callback = {this.downloadData}/>
          )
        }
        <Logout callback = {this.logout}/>
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
