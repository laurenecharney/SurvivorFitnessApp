import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Heading } from "../Components/Heading";
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { SettingsRow } from "../Components/SettingsComponents/SettingsRow";
import { changePassword } from "../APIServices/APIUtilities";
import { getUser } from "../APIServices/deviceStorage";
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
import { concat } from "react-native-reanimated";

const contactCategories = {
  phoneNumber: "Phone Number: ",
  email: "Email: ",
};

const contactPasswordCategories = {
  currentPassword: "Current Password: ",
  newPassword: "New Password: ",
  confirmPassword: "Confirm New Password: "
};

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
      }
    };
  }

  async componentDidMount() {
    const __user = JSON.parse(await getUser());
    this.setState({
      user: __user,
      userId: __user.id
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

  openContactModal = () => {
    this.setState({
      isContactModalVisible:true,
    });
  };

  closeContactModal = () => {
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
    //console.log(newInformation)
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
          categories = {contactCategories}
          information = {""}
          isChange = {true}
          title = {"Edit Contact Information"}
          visible = {this.state.isContactModalVisible} 
          callback = {this.closeContactModal}/>
         <AddEditModal 
          categories = {contactPasswordCategories}
          information = {this.state.passwordInformation.currentPassword, this.state.passwordInformation.newPassword}
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
