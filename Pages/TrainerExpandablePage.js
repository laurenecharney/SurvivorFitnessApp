import React, {Component} from 'react';
import { StyleSheet, View,ScrollView,TextInput} from 'react-native';
import Accordion from '../Components/Accordion.js';
import TrainerProgressInputGroup from '../Components/TrainerProgressInputGroup';
import Inputs from '../Components/Inputs.js';

import TrainerProgressPage from '../Pages/TrainerProgressPage';


export default class TrainerExpandablePage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menu :[
          { 
            title: 'General Data', 
            data:  <TrainerProgressInputGroup/>,

          },
          { 
            title: 'Skin Fold Tests',
            data: "hey",
          },
          { 
           title: 'Girth Measurements (in)',
           data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
          },
          { 
            title: '6 Minute Treadmill Test',
            data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
          },
        ]
       }
    }
  
    render() {
      return (
        <ScrollView style={styles.container}>
          { this.renderAccordions() }
        </ScrollView>
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