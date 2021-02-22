import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button, SafeAreaView, Text, ListViewComponent} from 'react-native';
import Sidebar from '../Components/Sidebar.js';
import DateTextBox from '../Components/DateTextBox.js';
import NotesTextBox from '../Components/NotesTextBox.js'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import NameNavBar from "../Components/NameNavBar";
import TrainerDieticianNavBar from "../Components/TrainerDieticianNavBar";

export default class DieticianSession extends Component {
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
                        <Sidebar/>
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25, paddingTop: 10, alignItems: 'center'}}>Session 6</Text>
                        <DateTextBox/>
                        <NotesTextBox name={"Dietician"}/>
                        <Text style={{fontSize: 10, padding: 5, width: '90%', marginLeft: 30}}>
                            *If needed, please contact ____ with any concerns or questions.
                        </Text>
                        <NotesTextBox name={"Admin"} />
                        <View>
                            <Button title="SAVE"/>
                        </View>
                        <View>
                            <Button title="EDIT"/>
                        </View>
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
