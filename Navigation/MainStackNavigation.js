import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../Pages/LoginPage.js';
import AllPatientsPage from '../Pages/AllPatientsPage.js';
import ClientInformationPage from '../Pages/TrainerDieticianSessionWithSidebarPage.js';
import SuperAdminNav from './SuperAdminNavigation';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LoginPage' headerMode="none" component={LoginPage} />
        <Stack.Screen name='AllPatientsPage' headerMode="none" component={AllPatientsPage} />
        <Stack.Screen name='ClientInformationPage'  component={ClientInformationPage} />
        <Stack.Screen name='SuperAdminPage' component={SuperAdminNav}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainStackNavigator;