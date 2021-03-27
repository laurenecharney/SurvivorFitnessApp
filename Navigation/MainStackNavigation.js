import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../Pages/LoginPage.js';
import AllPatientsPage from '../Pages/AllPatientsPage.js';
import ClientInformationPage from '../Pages/TrainerDieticianSessionWithSidebarPage.js';
import TrainerSession from '../Pages/TrainerSession.js';
import TrainerCheckpointPage from '../Pages/TrainerCheckpointPage.js';
import AdminLocationsPage from "../Pages/AdminLocationsPage.js";
import AdminClientPage from '../Pages/AdminClientPage.js';
import AdminTrainerPage from "../Pages/AdminTrainerPage.js";
import AdminDieticianPage from "../Pages/AdminDieticianPage.js";

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LoginPage' headerMode="none" component={LoginPage} />
        <Stack.Screen name='AllPatientsPage' headerMode="none" component={AllPatientsPage} />
        <Stack.Screen name='ClientInformationPage'  component={ClientInformationPage} />
        <Stack.Screen name='TrainerSession' headerMode="none" component={TrainerSession} />
        <Stack.Screen name='TrainerCheckpointPage'  component={TrainerCheckpointPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainStackNavigator;