import React, { Component, useEffect, useState } from
 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SidebarRow from '../Components/SidebarRow.js';

export const Sidebar = ({updateSession, sessionsArray, addSessionArray, fetchSessions}) =>{

    alertItemName = (item) => {
        updateSession(item)
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

    return (
        <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
         scrollEnabled={true}>
            {
                sessionsArray.map((item, index) => (
                    <TouchableOpacity
                        style = {!item.highlighted ? styles.row: styles.highlightedRow}
                        key = {index}
                        onPress = {() => this.alertItemName(item)}>
                        <TouchableOpacity
                            style = {item.logged ? styles.numberContainer: styles.highlightedNumberContainer}
                            onPress = {() => this.alertItemName(item)}>
                            <Text style = {item.logged ? styles.text: styles.highlightedText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }{/*
            {
                addSession.map((item, index) => (
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
        */}
        </KeyboardAwareScrollView>
    )
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
        backgroundColor: '#F4F4F4',
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
        backgroundColor: '#fff',
        borderRadius: 90
    },
    highlightedNumberContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        backgroundColor: '#fff',
        borderRadius: 90
    },
    highlightedText: {
        color: '#B8B8B8',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: '15%',
    },
    text: {
        color: '#C6E05A',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: '15%',
    }

})