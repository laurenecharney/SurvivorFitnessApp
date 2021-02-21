import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class Sidebar extends Component {
    state = {
        sessions: [
            {id: 1, name: '1',},
            {id: 2, name: '2',},
            {id: 3, name: '3',},
            {id: 4, name: '4',},
            {id: 5, name: '5',},
            {id: 6, name: '6',},
            {id: 7, name: '7',},
            {id: 8, name: '8',},
            {id: 9, name: '9',},
            {id: 10, name: '10',},
            {id: 11, name: '11',},
            {id: 12, name: '12',},
            {id: 13, name: '13',},
            {id: 14, name: '14',},
            {id: 15, name: '15',},
            {id: 16, name: '16',},
            {id: 17, name: '17',},
            {id: 18, name: '18',},
            {id: 19, name: '19',},
            {id: 20, name: '20',},
            {id: 21, name: '21',},
            {id: 22, name: '22',},
            {id: 23, name: '23',},
            {id: 24, name: '24',}
        ],
        addSession: [
            {id: 1, name: '+'}
        ]
    }
    alertItemName = (item) => {
        alert("Jump to session " + item.name)
    }
    alertAddSession = (item) => {
        Alert.alert('Add Another Session?', '',
        [
            {
                text: 'No',
                onPress: () => console.log('No Pressed')
            },
            {
                text: 'Yes',
                onPress: () => console.log('Yes Pressed')
            },
        ]
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                {
                    this.state.sessions.map((item, index) => (
                        <TouchableOpacity
                            style = {styles.row}>
                            <TouchableOpacity
                                key = {item.id}
                                style = {styles.numberContainer}
                                onPress = {() => this.alertItemName(item)}>
                                <Text style = {styles.text}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
                {
                    this.state.addSession.map((item) => (
                        <TouchableOpacity
                            style = {styles.row}>
                            <TouchableOpacity
                                key = {item.id}
                                style = {styles.container}
                                onPress = {() => this.alertAddSession(item)}>
                                <Text style = {styles.text}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            </TouchableOpacity>
                    ))
                }
            </KeyboardAwareScrollView>
        )
    }
}
export default Sidebar

const styles = StyleSheet.create ({
    row: {
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        width: '100%',
        height: '4%',
        borderWidth: 0.25,
        padding: 5,
    },
    numberContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        height: 28,
        borderWidth: .5,
        borderColor: '#C6E05A',
        borderRadius: 90,

    },
    text: {
        color: '#C6E05A',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: '15%',
    }
})