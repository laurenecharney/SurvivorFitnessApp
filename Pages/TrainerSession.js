import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text, ListViewComponent} from 'react-native';
import Sidebar from '../Components/Sidebar.js';
import DateTextBox from '../Components/DateTextBox.js';
import NotesTextBox from '../Components/NotesTextBox.js'

export default class TrainerSession extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', left: 10, position: 'relative',flex: 2}}>
        <Sidebar/>
        <View style={styles.container}>
          <SafeAreaView style={{alignItems: 'center',top:50,flex: 1}}>
            <Text style={{fontSize: 25}}>Session 6</Text>
          </SafeAreaView>
          <DateTextBox/>
          <NotesTextBox name={"Trainer"}/>
          <Text style={{fontSize: 10, padding: 5, width: '90%', marginLeft: 30}}>
            *If needed, please contact ____ with any concerns or questions.
          </Text>
          <NotesTextBox name = {"Admin"}/>
          <View>
              <Button title="SAVE"/>
          </View>
          <View>
              <Button title="EDIT"/>
          </View>
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
