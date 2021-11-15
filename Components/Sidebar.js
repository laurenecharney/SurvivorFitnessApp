import React, { Component } from
 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class Sidebar extends Component {
    state = {
        numSessions: 24,
        addSession: [
            {id: 1, name: '+'}
        ]
    }
    alertItemName = (item) => {
        this.props.updateSession(item.name)
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
                onPress: () => {
                this.setState({numSessions: this.state.numSessions + 1})
                var joined = this.state.sessions.concat({id: this.state.numSessions, name: this.state.numSessions.toString()});
                this.setState({ sessions: joined })
                }
            },
        ]
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
             scrollEnabled={true}>
                {
                    this.props.sessionsArray.map((item, index) => (
                        <TouchableOpacity
                            style = {styles.row}
                            key = {index}
                            >
                            <TouchableOpacity
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

                    this.state.addSession.map((item, index) => (
                        <TouchableOpacity
                            style = {styles.row}
                            key = {index}>
                            <TouchableOpacity
                                
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
        // width: '100%',
        height: 39,
        borderWidth: 0.25,
        padding: 5,
    },
    highlightedRow: {
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        backgroundColor: '#cccccc',
        // width: '100%',
        height: 39,
        borderWidth: 0.25,
        padding: 5,
    },
    numberContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: '#C6E05A',
        borderRadius: 90,

    },
    text: {
        color: '#C6E05A',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: '15%',
    }
})