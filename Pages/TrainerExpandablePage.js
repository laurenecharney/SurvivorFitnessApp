import React, {Component} from 'react';
import { StyleSheet, View,ScrollView,TextInput,Button} from 'react-native';
import Accordion from '../Components/Accordion.js';
import TrainerProgressInputGroup from '../Components/TrainerProgressInputGroup';
import Inputs from '../Components/Inputs.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NameNavBar from '../Components/NameNavBar.js';
import TrainerProgressPage from '../Pages/TrainerProgressPage';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import SidebarTestPage from '../Components/Sidebar.js';


export default class TrainerExpandablePage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menu :[
          { 
            title: 'General Data', 
            data:  ["Weight","BMI","Body Fat %","Total Body Fat (lb)",
                    "Lean Mass (lb)", "Blood Pressure (mm Hg)", "Range of Motion", "Resting HR (bpm)"],

          },
          { 
            title: 'Skin Fold Tests',
            data:  ["Abdominal", "Chest", "Midaxillary", "Subscapular", "Supraillac", "Thigh", "Tricep"]
          },
          { 
           title: 'Girth Measurements (in)',
           data:  ["Abdominal", "Biceps", "Calf", "Chest", "Hip", "Shoulders", "Thigh", "Waist", "Total Inches Lost"]
          },
          { 
            title: '6 Minute Treadmill Test',
            data:  ["Distance", "Speed", "HR", "BR"]
          },
        ]
       }
    }
  
    render() {
      return (
        <KeyboardAwareScrollView
         //style={styles.container}
         style={{ backgroundColor: '#4c69a5' }}
         resetScrollToCoords={{ x: 0, y: 0 }}
         contentContainerStyle={styles.container}
         scrollEnabled={true}
         >
           {/* <SidebarTestPage/> */}
           <NameNavBar/>
           <TrainerDieticianNavBar/>
          { this.renderAccordions() }
        {/* <View style={styles.button}>
            <Button title="SAVE"/>
        </View>
        <View style={styles.button}>
            <Button title="EDIT"/>
            </View> */}
        </KeyboardAwareScrollView>
      );
    }
  
    renderAccordions=()=> {
      const items = [];
      for (item of this.state.menu) {
          items.push(
              <Accordion 
                  title = {item.title}
                 data = {item.data}
              />
          );
      }
      return items;
  }
  }

  const styles = StyleSheet.create({
    container: {
     flex:1,
     paddingTop:100,
     backgroundColor:'#fff',
     
    }})