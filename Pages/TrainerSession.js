import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text} from 'react-native';
import Sidebar from '../Components/Sidebar.js';

export default function TrainerSession() {
  const [enteredTrainerNotes, setTrainerNotes] = useState('');

  const trainerNotesHandler = (enteredText) => {
      setTrainerNotes(enteredText);
  };

  const adminNotes = '';

  const [enteredDate, setDate] = useState('');

  const dateHandler = (enteredText) => {
      setDate(enteredText);
  };

  function showSaveButton() {
    this.setState({
      show: true
    });
    console.log("trainer notes edited")
  }

  return (
    <View style={{flexDirection: 'row', left: 10, position: 'relative',flex: 2}}>
    <Sidebar/>
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center',top:50,flex: 1}}>
        <Text style={{fontSize: 25}}>Session 6</Text>
      </SafeAreaView>
      <View style={styles.dateContainer}>
        <Text style={styles.headingText}>
          Date:
        </Text>
        <TextInput 
          style = {styles.dateOutline}
          placeholder="Enter Date"
          value={enteredDate}
        />
      </View>
      <View style={styles.notes}>
        <Text style={styles.headingText}>
          Trainer Notes:
        </Text>
        <TextInput
          style = {styles.notesOutline}
          placeholder="Notes for trainer"
          onChangeText={trainerNotesHandler}
          value={enteredTrainerNotes}
          multiline
        />
        <Text style={{fontSize: 10, padding: 10}}>
          *If needed, please contact ____ with any concerns or questions.
        </Text>
      </View>
      <View style={styles.notes}>
        <Text style={styles.headingText}>
          Admin Notes:
        </Text>
        <Text>
          {adminNotes}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
            <Button title="SAVE"/>
        </View>
        <View style={styles.button}>
            <Button title="EDIT"/>
        </View>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dateOutline: {
    width: '80%', 
    borderColor: 'gray',
    borderWidth: 1, 
    borderRadius: 10,
    padding: 10,
    marginLeft: 10
  },
  notes: {
    width: '90%',
    padding: 10,
    margin: 10,
    height: '35%',
    marginBottom: 20
  },
  notesOutline: { 
    borderColor: 'gray',
    borderWidth: 1, 
    borderRadius: 10,
    padding: 10,
    height: 250,
    marginHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    marginTop: 50
  },
  headingText: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
});
