import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text, ListViewComponent} from 'react-native';
import Sidebar from '../Components/Sidebar.js';
import DateTextBox from '../Components/DateTextBox.js';
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'

export default class TrainerSession extends Component {
  constructor(props){
    super(props);

    this.state = {
        trainerNotes: "",
        edit: false

    }
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
changeText = (newValue)=>{
    this.setState({trainerNotes: newValue});
}
  render() {
    return (
      <View style={{flexDirection: 'row', left: 10, position: 'relative',flex: 2}}>
        <Sidebar/>
        <View style={styles.container}>
          <SafeAreaView style={{alignItems: 'center',top:50,flex: 1}}>
            <Text style={{fontSize: 25}}>Session 6</Text>
          </SafeAreaView>
          <DateTextBox/>
          <MultilineInputSaveComponent
                        edit={this.state.edit}
                        value={this.state.trainerNotes}
                        placeholder = "Record Routine, exercise reps ... "
                        changeText = {newValue => this.changeText(newValue)}
                        heading = "Trainer Notes"
                    />
                    
                <Text style={{fontSize: 10, padding: 10,margin:10}}>
                    *If needed, please contact ____ with any concerns or questions.
                    </Text>
                <MultilineInputSaveComponent
                        edit={false}
                        value={"Lorem Impsum dolor"}
                        placeholder = ""
                        changeText = {newValue => this.changeText(newValue)}
                        heading = "Admin Notes"
                    />
          <Button 
                        title = {this.state.edit ? "SAVE" : "EDIT"}
                        onPress={()=>this.setState({edit: !this.state.edit})}
                        color={'black'}
          />  
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
