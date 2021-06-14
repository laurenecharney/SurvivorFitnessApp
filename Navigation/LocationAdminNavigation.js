import React, { useEffect, useState } from "react";
import LocationAdminClientPage from "../Pages/LocationAdminClientPage.js";
import AdminDieticianPage from "../Pages/AdminDieticianPage.js";
import AdminLocationsPage from "../Pages/AdminLocationsPage.js";
import LocationAdminTrainerPage from "../Pages/LocationAdminTrainerPage.js";
import AdminParticipantPage from "../Pages/AdminClientPage.js";
import AdminTrainerPage from "../Pages/AdminTrainerPage.js";
import SettingsPage from "../Pages/SettingsPage.js";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
import { getUser } from "../APIServices/deviceStorage";
export function LocationAdminPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const res = await getUser();
      console.log("RES");
      console.log(JSON.parse(res).locations[0].id);
      setUser(JSON.parse(res));
    }

    fetchUser();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Participants"
      activeColor="#A0C700"
      inactiveColor="#AFAFAF"
      barStyle={{ backgroundColor: "white" }}
      shifting={false}
    >
      {user.roles && user.roles.includes("TRAINER") && (
        <Tab.Screen
          name="Trainers"
          component={AdminTrainerPage}
          initialParams={{
            locationId: user.locations ? user.locations[0].id : null
          }}
          options={{
            tabBarLabel: "Trainers",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcon name="dumbbell" color={color} size={26} />
            )
          }}
        />
      )}
      {user.roles && user.roles.includes("DIETITIAN") && (
        <Tab.Screen
          name="Dietitians"
          component={AdminDieticianPage}
          initialParams={{
            locationId: user.locations ? user.locations[0].id : null
          }}
          options={{
            tabBarLabel: "Dietitians",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcon
                name="food-apple"
                color={color}
                size={26}
              />
            )
          }}
        />
      )}
      <Tab.Screen
        name="Participants"
        component={LocationAdminClientPage}
        options={{
          tabBarLabel: "Participants",
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon name="settings" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
