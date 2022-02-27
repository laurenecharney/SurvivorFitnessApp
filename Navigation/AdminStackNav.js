import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationAdminTrainerPage from "../Pages/LocationAdminTrainerPage.js";
import AllPatientsPage from '../Pages/AllPatientsPage.js';
import SettingsPage from "../Pages/SettingsPage.js";
import ProfilePage from '../Pages/ProfilePage.js'
import AdminParticipantPage from '../Pages/AdminClientPage.js';
import AdminDieticianPage from '../Pages/AdminDieticianPage.js';
import AdminLocationsPage from '../Pages/AdminLocationsPage.js';
import AdminTrainerPage from '../Pages/AdminTrainerPage.js';

const Stack = createStackNavigator();

const LocationTrainerStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LocationAdminTrainerPage" component={LocationAdminTrainerPage} />
        <Stack.Screen name="AllPatientsPage" component={AllPatientsPage} />
      </Stack.Navigator>
    );
  }

  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    );
  }

  const AdminLocationsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AdminLocationsPage" component={AdminLocationsPage} />
        <Stack.Screen name="AdminTrainerPage" component={AdminTrainerPage} />
        <Stack.Screen name="AdminDieticianPage" component={AdminDieticianPage} />
        <Stack.Screen name="AllPatientsPage" component={AllPatientsPage} />
      </Stack.Navigator>
    );
  }

  const AdminTrainerStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AdminTrainerPage" component={AdminTrainerPage} />
        <Stack.Screen name="AllPatientsPage" component={AllPatientsPage} />
      </Stack.Navigator>
    );
  }

  const AdminDietitianStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AdminDieticianPage" component={AdminDieticianPage} />
        <Stack.Screen name="AllPatientsPage" component={AllPatientsPage} />
      </Stack.Navigator>
    );
  }

  const AdminParticipantStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AdminParticipantPage" component={AdminParticipantPage} />
      </Stack.Navigator>
    );
  }
  
export { LocationTrainerStackNavigator, SettingsStackNavigator, AdminLocationsStackNavigator, AdminTrainerStackNavigator, AdminDietitianStackNavigator, AdminParticipantStackNavigator};