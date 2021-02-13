import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions,ScrollView ,TextInput} from 'react-native';
import Inputs from './Components/Inputs.js';
import TrainerProgressPage from './Pages/TrainerProgressPage.js';
import TrainerExpandablePage from './Pages/TrainerExpandablePage.js';
import LoginPage from './Pages/LoginPage.js';
import TrainerSession from './Pages/TrainerSession.js';
import SidebarTestPage from './Pages/SidebarTestPage.js';
import AllPatientsPage from './Pages/AllPatientsPage.js';




export default function App() {
  return (
   // <TrainerProgressPage/> 
   //<TrainerExpandablePage/> 
   // <LoginPage/> 
   // <SidebarTestPage/>
   // <TrainerSession/>
    <AllPatientsPage/>
  );
}



const styles = StyleSheet.create({
  container: { //outer parent 
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
