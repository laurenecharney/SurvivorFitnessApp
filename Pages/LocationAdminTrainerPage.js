import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getTrainers, getDietitians } from "../APIServices/APIUtilities";
export const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
import { AlphabetList } from "react-native-section-alphabet-list";

export default class LocationAdminTrainerPage extends Component {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: "",
      email: "",
      phone: "",
      isModalVisible: false,
      isAddModalVisible: false,
      isGymModalVisible: false,
      selectedUser: [],
      calls: [
      ]
    };
  }

  async componentDidMount() {
    //TODO
    await this.refreshList();
    console.log("route params")
    console.log(this.props.route.params)
  }

  async refreshList() {
    try {
      const locationId =
        this.props.route.params && this.props.route.params.locationId
          ? this.props.route.params.locationId
          : null;
      const arr =
        this.props.route.params &&
        this.props.route.params.userType === "DIETITIAN"
          ? await getDietitians(locationId)
          : await getTrainers(locationId);
      this.setState({
        calls: arr.map(item => {
          let newI = item;
          newI.value = item.firstName + " " + item.lastName;
          newI.id = parseInt(item.id);
          newI.gym = item.locations[0] ? item.locations[0].name : "";
          return newI;
        })
      });
    } catch (e) {
      console.log(e);
      alert("Could not fetch data.");
    }
  }

  openModal = item => {
    this.setState({
      isModalVisible: true,
      selectedUser: item
    });
  };

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };
  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };
  openAddModal = () => {
    this.setState({
      isAddModalVisible: true
    });
  };

  toggleAddModal = () => {
    this.setState({
      isAddModalVisible: !this.state.isAddModalVisible
    });
  };
  closeAddModal = () => {
    this.setState({
      isAddModalVisible: false
    });
  };

  //returns either trainer, trainers, dietitian, dietitians depending on context of user + plural
  getUserType(plural) {
    if (plural) {
      return this.props.route.params &&
        this.props.route.params.userType === "DIETITIAN"
        ? "Dietitians"
        : "Trainers";
    } else {
      return this.props.route.params &&
        this.props.route.params.userType === "DIETITIAN"
        ? "Dietitian"
        : "Trainer";
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 25
          }}
        >
          <Text style={styles.headline}>{this.getUserType(true)}</Text>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={() => this.openAddModal()}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          <AlphabetList
            data={this.state.calls}
            indexLetterSize={46}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
              <View style={{ visibility: "hidden" }} />
              // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
              // <View style={styles.sectionHeaderContainer}>
              //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
              // </View>
            )}
            renderCustomItem={item => (
              <View style={styles.row}>
                <View>
                  <View style={styles.nameContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("here + piot");
                        const routeParams =
                          this.props.route.params &&
                          this.props.route.params.userType === "DIETITIAN"
                            ? {
                                hideSettingsIcon: true,
                                participantsParam: {dietitianUserId: item.id}
                              }
                            : {
                                hideSettingsIcon: true,
                                participantsParam: {trainerUserId: item.id}
                              };
                        console.log("ROUTE PARAMS");
                        console.log(routeParams);
                        this.props.navigation.navigate(
                          "AllPatientsPage",
                          routeParams
                        );
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Icon name={item.icon} style={styles.icon} size={25} />
                        <Text style={styles.nameTxt}>{item.value}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.openModal(item)}
                      style={{
                        borderWidth: 1,
                        borderColor: "#AED803",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 25,
                        height: 25,
                        backgroundColor: "#fff",
                        borderRadius: 50
                      }}
                    >
                      <Text style={{ color: "#AED803" }}>i</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Modal
          propagateSwipe={true}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => this.closeModal()}
          onSwipeComplete={() => this.closeModal()}
          isVisible={this.state.isModalVisible}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "90%",
                height: "40%",
                borderRadius: "19"
              }}
            >
              <TouchableOpacity
                style={{ paddingLeft: 260, paddingTop: 10 }}
                onPress={() => this.closeModal()}
              >
                <Icon name={"close"} color={"#E4E4E4"} size={32} />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View
                    style={{
                      marginLeft: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingBottom: 30,
                      width: "75%"
                    }}
                  >
                    <Text style={{ fontSize: 19, color: "#AED803" }}>
                      {this.getUserType(false) + " Information"}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "75%"
                    }}
                  >
                    <View
                      style={{
                        marginLeft: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        width: "75%"
                      }}
                    >
                      <View style={{ flexDirection: "row", padding: 5 }}>
                        <Text
                          style={{ padding: 5, fontSize: 15, color: "#797979" }}
                        >
                          Name:{" "}
                        </Text>
                        <View style={styles.child}>
                          {this.state.edit ? (
                            <TextInput
                              style={styles.input}
                              returnKeyType="done"
                              onSubmitEditing={() => {
                                this.secondTextInput.focus();
                              }}
                              blurOnSubmit={false}
                              underlineColorAndroid="transparent"
                              placeholder={
                                this.state.name ? this.state.name : "Enter Name"
                              }
                              defaultValue={
                                this.state.name == "Enter Name"
                                  ? null
                                  : this.state.name
                              }
                              placeholderTextColor="#D5D5D5"
                              color="black"
                              autoCapitalize="sentences"
                              onChangeText={newName =>
                                this.setState({ name: newName })
                              }
                            />
                          ) : (
                            <Text
                              style={{
                                color:
                                  this.state.name == "Weight (lbs)"
                                    ? "#D5D5D5"
                                    : "black"
                              }}
                            >
                              {this.state.name == "Weight (lbs)"
                                ? ""
                                : this.state.name}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", padding: 5 }}>
                        <Text
                          style={{ padding: 5, fontSize: 15, color: "#797979" }}
                        >
                          Email:{" "}
                        </Text>
                        <View style={styles.child}>
                          {this.state.edit ? (
                            <TextInput
                              style={styles.input}
                              returnKeyType="done"
                              onSubmitEditing={() => {
                                this.secondTextInput.focus();
                              }}
                              blurOnSubmit={false}
                              underlineColorAndroid="transparent"
                              placeholder={
                                this.state.email
                                  ? this.state.email
                                  : "Enter Email"
                              }
                              defaultValue={
                                this.state.email == "Enter Email"
                                  ? null
                                  : this.state.email
                              }
                              placeholderTextColor="#D5D5D5"
                              color="black"
                              autoCapitalize="sentences"
                              onChangeText={newEmail =>
                                this.setState({ email: newEmail })
                              }
                            />
                          ) : (
                            <Text
                              style={{
                                color:
                                  this.state.email == "Weight (lbs)"
                                    ? "#D5D5D5"
                                    : "black"
                              }}
                            >
                              {this.state.email == "Weight (lbs)"
                                ? ""
                                : this.state.email}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", padding: 5 }}>
                        <Text
                          style={{ padding: 5, fontSize: 15, color: "#797979" }}
                        >
                          Phone Number:{" "}
                        </Text>
                        <View style={styles.child}>
                          {this.state.edit ? (
                            <TextInput
                              style={styles.input}
                              returnKeyType="done"
                              onSubmitEditing={() => {
                                this.secondTextInput.focus();
                              }}
                              blurOnSubmit={false}
                              underlineColorAndroid="transparent"
                              placeholder={
                                this.state.phone
                                  ? this.state.phone
                                  : "Enter Phone Number"
                              }
                              defaultValue={
                                this.state.phone == "Enter Phone Number"
                                  ? null
                                  : this.state.phone
                              }
                              placeholderTextColor="#D5D5D5"
                              color="black"
                              autoCapitalize="sentences"
                              onChangeText={newPhone =>
                                this.setState({ phone: newPhone })
                              }
                            />
                          ) : (
                            <Text
                              style={{
                                color:
                                  this.state.phone == "Weight (lbs)"
                                    ? "#D5D5D5"
                                    : "black"
                              }}
                            >
                              {this.state.phone == "Weight (lbs)"
                                ? ""
                                : this.state.phone}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <AppButton
                      title={this.state.edit ? "SAVE" : "EDIT"}
                      onPress={() => this.setState({ edit: !this.state.edit })}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          propagateSwipe={true}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => this.closeAddModal()}
          onSwipeComplete={() => this.closeAddModal()}
          isVisible={this.state.isAddModalVisible}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "90%",
                height: "50%",
                borderRadius: "19"
              }}
            >
              <TouchableOpacity
                style={{ paddingLeft: 260, paddingTop: 10 }}
                onPress={() => this.closeAddModal()}
              >
                <Icon name={"close"} color={"#E4E4E4"} size={32} />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={{ paddingBottom: 10, width: "100%" }}>
                    <Text style={styles.modalText}>
                      {"Add " + this.getUserType(false)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.childText}>Name</Text>
                    <View style={styles.child}>
                      <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        underlineColorAndroid="transparent"
                        color="black"
                        autoCapitalize="sentences"
                      />
                    </View>
                    <Text style={styles.childText}>Email</Text>
                    <View style={styles.child}>
                      <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        underlineColorAndroid="transparent"
                        color="black"
                        autoCapitalize="sentences"
                      />
                    </View>
                    <Text style={styles.childText}>Phone Number</Text>
                    <View style={styles.child}>
                      <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        underlineColorAndroid="transparent"
                        color="black"
                        autoCapitalize="sentences"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <AppButton title={"Add"} />
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
    color: "#AED803"
  },

  settings: {
    color: "#E4E4E4",
    marginTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 0,
    marginRight: 30
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    padding: 40
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    fontWeight: "600",
    color: "#3E3E3E",
    fontSize: 20,
    width: 170
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15
  },
  icon: {
    color: "#E4E4E4",
    paddingRight: 10
  },
  addButtonContainer: {
    backgroundColor: "#AED804",
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
  modalText: {
    fontSize: 18,
    paddingTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#AED803"
  },
  addNewContainer: {
    backgroundColor: "#AED804",
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
    alignSelf: "center"
  },

  appButtonContainer: {
    backgroundColor: "#AED804",
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
    alignSelf: "center"
  },

  child: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    width: "75%",
    borderRadius: 5,
    alignSelf: "center"
  },
  childText: {
    fontSize: 13,
    color: "#B7DC21",
    marginLeft: 30,
    padding: 12
  },
  sectionHeaderContainer: {
    backgroundColor: "#E4E4E4"
  },
  sectionHeaderLabel: {
    fontSize: 16,
    paddingLeft: 10
  },
  listContainer: {
    paddingBottom: "33%"
  }
});
