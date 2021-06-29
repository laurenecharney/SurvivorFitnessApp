import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  deleteJWT,
  getUser,
  saveCurrentRole,
  deleteCurrentRole,
  deleteUserInfo
} from "../APIServices/deviceStorage";

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 25
          }}
        >
          <Text style={styles.workHeadline}>Settings</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ProfilePage")}
          >
            <View style={styles.row}>
              <Text style={styles.text}>Profile</Text>
            </View>
          </TouchableOpacity>
          {user.roles && user.roles.includes("TRAINER") && (
            <TouchableOpacity
              onPress={async () => {
                console.log("HERE");
                await saveCurrentRole("TRAINER");
                this.props.navigation.replace("AllPatientsPage", {participantsParam: {trainerUserId:user.id}});
              }}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Switch to Trainer Account</Text>
              </View>
            </TouchableOpacity>
          )}
          {user.roles && user.roles.includes("DIETITIAN") && (
            <TouchableOpacity
              onPress={async () => {
                console.log("HERE1");
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
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
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
              }}
            >
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
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
    zIndex: 15
  },
  workHeadline: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 15,
    padding: 25,
    color: "#AED803"
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
    padding: 25,
    justifyContent: "space-between"
  },

  text: {
    fontSize: 20,
    color: "#3E3E3E",
    flexDirection: "row",
    alignItems: "flex-start",
    textAlign: "left"
  }
});
