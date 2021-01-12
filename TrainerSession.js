import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button} from 'react-native';

export default function App() {
  const [enteredTrainerNotes, setTrainerNotes] = useState('');

  const trainerNotesHandler = (enteredText) => {
      setTrainerNotes(enteredText);
    };

  const [enteredAdminNotes, setAdminNotes] = useState('');

  const adminNotesHandler = (enteredText) => {
      setAdminNotes(enteredText);
    };

  return (
    <View style={styles.container}>
        <View style={styles.dateOutline}>
          <TextInput
            placeholder="Date"
          />
        </View>
        <View style={styles.inputOutline}>
          <TextInput
            placeholder="Notes for trainer"
            onChangeText={trainerNotesHandler}
            value={enteredTrainerNotes}
            multiline
          />
        </View>
        <View style={styles.inputOutline}>
          <TextInput
            placeholder="Notes for admin"
            onChangeText={adminNotesHandler}
            value={enteredAdminNotes}
            multiline
          />
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dateOutline: {
    width: '80%', 
    borderColor: 'black',
    borderWidth: 1, 
    padding: 10,
    margin: 10,
  },
  inputOutline: {
    width: '80%', 
    borderColor: 'black',
    borderWidth: 1, 
    padding: 10,
    margin: 10,
    height: '35%',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    paddingTop: 10,
  },
  button: {
    width: '40%',
  }
});
