import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AlphabetList } from "react-native-section-alphabet-list";
import { getParticipants } from "../APIServices/APIUtilities";

export default class TrainerPatientsPage extends Component {
  state = {
    isModalVisible: false
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      isModalVisible: false,
      calls: [
      ]
    };
  }

  async componentDidMount() {
    try {
      let participants;
      if (this.props.route.params && this.props.route.params['trainerUserId']){
        participants = await getParticipants("trainerUserId",this.props.route.params.trainerUserId);
      } else if (this.props.route.params && this.props.route.params['dietitianUserId']){
        participants = await getParticipants("dietitianUserId",this.props.route.params.dietitianUserId);
        console.log(this.props.route.params);
      } else {
        participants = await getParticipants(null,null);
      }

      this.setState({
        calls: participants.map(item => {
          let newI = item;
          newI.value =
            item.firstName && item.lastName
              ? item.firstName + " " + item.lastName
              : "";
          newI.id = parseInt(item.id);

          return newI;
        })
      });
    } catch (e) {
      console.log(e);
      alert("Could not fetch participants data");
    }
  }

  openModal = () => {
    this.setState({
      isModalVisible: true
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
          <Text style={styles.headline}>Participants</Text>
        </View>
        <View style={styles.listContainer}>
          <AlphabetList
            data={this.state.calls}
            indexLetterColor={"#AED803"}
            renderCustomSectionHeader={section => (
              <View style={{ visibility: "hidden" }} />
              // IF WE WANT SECTION HEADERS FOR EACH LETTER COMMENT THE ABOVE LINE UNCOMMENT THIS:
              // <View style={styles.sectionHeaderContainer}>
              //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
              // </View>
            )}
            renderCustomItem={item => (
              <ScrollView>
                <View style={styles.row}>
                  <View>
                    <View style={styles.nameContainer}>
                      <TouchableOpacity 
                        onPress={() => {
                            const routeParams =
                                {
                                    id: item.id,
                                    name: item.firstName + ' ' + item.lastName
                                } ;
                            this.props.navigation.navigate('ClientInformationPage', routeParams);
                        }}
                      >
                      <Text style={styles.nameTxt}>{item.value}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.openModal()}
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
              </ScrollView>
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
                height: "75%",
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
                      marginLeft: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingBottom: 30,
                      width: "75%"
                    }}
                  >
                    <Text style={{ fontSize: "19", color: "#AED803" }}>
                      Participant Information
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "75%"
                    }}
                  >
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Name:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Age:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Email:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Phone Number:{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "75%"
                    }}
                  >
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Type of Cancer:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Treatment Facility:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Surgeries:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Forms of Treatment:{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "75%"
                    }}
                  >
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Trainer:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Dietician:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Start Date:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Goal(s):{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "75%"
                    }}
                  >
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Physician Notes:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Dietician:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Start Date:{" "}
                    </Text>
                    <Text
                      style={{ padding: 5, fontSize: "15", color: "#797979" }}
                    >
                      Goal(s):{" "}
                    </Text>
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
    marginLeft: 25,
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
    padding: 50
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
    fontSize: 23,
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
  listContainer: {
    paddingBottom: "33%"
  }
});
