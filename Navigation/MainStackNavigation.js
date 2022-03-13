import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';

import LoginPage from '../Pages/LoginPage.js';
import ProfilePage from '../Pages/ProfilePage.js'
import AllPatientsPage from '../Pages/AllPatientsPage.js';
import ClientInformationPage from '../Pages/LogSessionPage.js';
import SuperAdminNav from './SuperAdminNavigation';
import {LocationAdminPage} from './LocationAdminNavigation';
import AdminLocationsPage from "../Pages/AdminLocationsPage.js";
import AdminClientPage from '../Pages/AdminClientPage.js';
import AdminTrainerPage from "../Pages/AdminTrainerPage.js";

import AdminDieticianPage from "../Pages/AdminDieticianPage.js";
import SettingsPage from "../Pages/SettingsPage.js";
import TrainerSettingsPage from "../Pages/TrainerSetting.js"


const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LoginPage' headerMode="none" component={LoginPage} />
        <Stack.Screen name='TrainerSettingsPage'  component={TrainerSettingsPage} />
        <Stack.Screen name='AllPatientsPage' headerMode="none" component={AllPatientsPage} />
        <Stack.Screen name='ClientInformationPage'  component={ClientInformationPage} />
        <Stack.Screen name='SuperAdminPage' component={SuperAdminNav}/>
        <Stack.Screen name='LocationAdminPage'  component={LocationAdminPage} />
        <Stack.Screen name='AdminTrainerPage'  component={AdminTrainerPage} />
        <Stack.Screen name='AdminDieticianPage'  component={AdminDieticianPage} />
        <Stack.Screen name='SettingsPage'  component={SettingsPage} />
        <Stack.Screen name='ProfilePage' headerMode="none" component={ProfilePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainStackNavigator;