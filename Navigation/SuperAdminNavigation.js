import React from 'react';
import AdminParticipantPage from '../Pages/AdminClientPage.js';
import AdminDieticianPage from '../Pages/AdminDieticianPage.js';
import AdminLocationsPage from '../Pages/AdminLocationsPage.js';
import AdminTrainerPage from '../Pages/AdminTrainerPage.js';
import {SettingsStackNavigator, AdminLocationsStackNavigator, AdminTrainerStackNavigator, AdminDietitianStackNavigator, AdminParticipantStackNavigator}from "./AdminStackNav.js";
import SettingsPage from '../Pages/SettingsPage.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();


export default function SuperAdminNav() {
   return (
    <Tab.Navigator
    initialRouteName="Locations"
    activeColor="#A0C700"
    inactiveColor="#AFAFAF"
    barStyle={{ backgroundColor: 'white' }}
    shifting={false}
    >
      <Tab.Screen name="Location" component={AdminLocationsStackNavigator}
           options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({ color }) => (
              <Icon name="location-on" color={color} size={26} />
            ),
          }} />
      <Tab.Screen name="Participants" component={AdminParticipantStackNavigator}
           options={{
            tabBarLabel: 'Participants',
            tabBarIcon: ({ color }) => (
              <Icon name="person" color={color} size={26} />
            ),
           }}/>
      <Tab.Screen name="Trainers" component={AdminTrainerStackNavigator}
          // initialParams={{stackNavigation}}
          options={{
          tabBarLabel: 'Trainers',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="dumbbell" color={color} size={26} />
          ),
          }}/>
      <Tab.Screen name="Dietitians" component={AdminDietitianStackNavigator}
                options={{
                  tabBarLabel: 'Dietitians',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcon name="food-apple" color={color} size={26} />
                  ),
                  }}/>
      <Tab.Screen name="Settings" component={SettingsStackNavigator}
                      options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color }) => (
                          <Icon name="settings" color={color} size={26} />
                        ),
                        }}/>
    </Tab.Navigator>
);
  //  <MainStackNavigator />
}