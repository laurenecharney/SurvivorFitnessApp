import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button, SafeAreaView, Text, ListViewComponent} from 'react-native';
import SidebarDietician from '../Components/SidebarDietician.js';
import DateTextBox from '../Components/DateTextBox.js';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import NameNavBar from "../Components/NameNavBar";
import TrainerDieticianNavBar from "../Components/TrainerDieticianNavBar";
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'

export default class DieticianSession extends Component {
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
            <KeyboardAwareScrollView
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={styles.bigContainer}
                scrollEnabled={true}
            >
                <NameNavBar/>
                <TrainerDieticianNavBar/>
                <View style={{flexDirection: 'row', position: 'relative', flex: 2}}>
                    <View style={{width: '13.5%'}}>
                        <SidebarDietician/>
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25, paddingTop: 10, alignItems: 'center'}}>Session 6</Text>
                        <DateTextBox/>
                        <MultilineInputSaveComponent
                        edit={this.state.edit}
                        value={this.state.trainerNotes}
                        placeholder = "Record Routine, exercise reps ... "
                        changeText = {newValue => this.changeText(newValue)}
                        heading = "Dietician Notes"
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
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    bigContainer: {
        flex: 2,
        paddingTop: 50,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
});
