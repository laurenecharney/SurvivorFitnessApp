import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Heading } from "../Components/Heading";
import { AddEditModal } from '../Components/ModalComponents/AddEditModal';
import { SettingsRow } from "../Components/SettingsComponents/SettingsRow";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  TextInput,
  ScrollView
} from "react-native";

const contactCategories = {
  phoneNumber: "Phone Number: ",
  email: "Email: ",
};

const contactPasswordCategories = {
  password: "Password: ",
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
      current_password: "Current Password",
      new_password: "New Password",
      new_password_again: "New Password Again",
      edit: false
    };
    // if (Platform.OS === "android") {
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
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

  goBack() {
    this.props.navigation.goBack()
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
          information = {""}
          isChange = {true}
          title = {"Edit Password"}
          visible = {this.state.isChangePasswordVisible} 
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
