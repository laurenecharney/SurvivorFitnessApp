import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  deleteJWT,
  getUser,
  saveCurrentRole,
  deleteCurrentRole,
  deleteUserInfo
} from "../APIServices/deviceStorage";
import { Heading } from "../Components/Heading";

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  async componentDidMount() {
    const res = await getUser();
    this.setState({ user: JSON.parse(res) });
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
          <View style={{ flexDirection: "column", width:"100%" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ProfilePage")}
            hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
          >
            <View style={styles.row}>
              <Text style={styles.text}>Profile</Text>
              <Icon name={'keyboard-arrow-right'} size={40} color={'#E4E4E4'}/>
            </View>
          </TouchableOpacity>
          {user.roles && user.roles.includes("TRAINER") && (
            <TouchableOpacity
              onPress={async () => {
                await saveCurrentRole("TRAINER");
                this.props.navigation.replace("AllPatientsPage", {participantsParam: {trainerUserId:user.id}});
              }}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Switch to Trainer Account</Text>
                <Icon name={'keyboard-arrow-right'} size={40} color={'#E4E4E4'}/>
              </View>
            </TouchableOpacity>
          )}
          {user.roles && user.roles.includes("DIETITIAN") && (
            <TouchableOpacity
              onPress={async () => {
                await saveCurrentRole("DIETITIAN");
                this.props.navigation.replace("AllPatientsPage", {participantsParam: {dietitianUserId:user.id}});
              }}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Switch to Dietitian Account</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.text}>Download Data</Text>
              <Icon name={'get-app'} size={40} color={'#E4E4E4'}/>
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "center", paddingTop:100,paddingBottom:300 }}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                deleteJWT();
                deleteCurrentRole();
                deleteUserInfo();
                this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: "LoginPage" }]
                });
              }}>
              <Text style={styles.loginText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#fff'
  },
  headline: {
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    marginTop: 45,
    marginLeft: 0,
    color: "#3E3E3E",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    opacity: 1,
    zIndex: 15,
    borderBottomWidth:1,
    borderBottomColor:"#E4E4E4"
  },
  workHeadline: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 120,
    padding: 30,
    fontWeight:"500",
    color: "#3E3E3E",
    alignContent:"center"
  },
  loginBtn: {
    width: "60%",
    backgroundColor: "#A1C703",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 35,
    justifyContent: "space-between",
    width:"100%"
  },

  text: {
    fontSize: 18,
    color: "#3E3E3E",
    flexDirection: "row",
    alignItems: "flex-start",
    textAlign: "left"
  }
});
