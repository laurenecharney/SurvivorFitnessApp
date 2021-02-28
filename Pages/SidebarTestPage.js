import React, {Component} from 'react';
import { StyleSheet, View,ScrollView,TextInput,Button} from 'react-native';
import Accordion from '../Components/Accordion.js';
import TrainerProgressInputGroup from '../Components/TrainerProgressInputGroup';
import Inputs from '../Components/Inputs.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NameNavBar from '../Components/NameNavBar.js';
import TrainerProgressPage from '../Pages/TrainerProgressPage';
import TrainerDieticianNavBar from '../Components/TrainerDieticianNavBar';
import Sidebar from '../Components/Sidebar.js';
import AppContainer from "react-native-web/dist/exports/AppRegistry/AppContainer";
import AllPatientsPage from "./AllPatientsPage";
import TrainerCheckpointPage from './TrainerCheckpointPage.js';
import TrainerExpandablePage from './TrainerExpandablePage.js';



export default class SidebarTestPage extends Component {

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
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                <NameNavBar/>
                <TrainerDieticianNavBar/>
                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '13.5%' }}>
                        <Sidebar/>
                    </View>
                    <TrainerCheckpointPage />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:2,
        paddingTop:80,
        backgroundColor:'#fff',
        justifyContent: 'flex-start',
    },

});