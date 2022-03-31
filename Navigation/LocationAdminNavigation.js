import React, { useEffect, useState } from "react";
import LocationAdminClientPage from "../Pages/LocationAdminClientPage.js";
import LocationAdminTrainerPage from "../Pages/LocationAdminTrainerPage.js";
import SettingsPage from "../Pages/SettingsPage.js";
import { LocationTrainerStackNavigator, SettingsStackNavigator }from "./AdminStackNav.js";
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
          component={LocationTrainerStackNavigator}
          initialParams={{
            userType: "TRAINER",
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
          component={LocationTrainerStackNavigator}
          initialParams={{
            userType: "DIETITIAN",
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
        // initialParams={{
        //   userType: user.roles && user.roles.includes("DIETITIAN") ? "DIETITIAN" : "TRAINER",
        //   locationId: user.locations ? user.locations[0].id : "piot12345" + JSON.stringify(user)
        // }}
        options={{
          tabBarLabel: "Participants",
          
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
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
