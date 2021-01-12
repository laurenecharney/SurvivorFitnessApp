import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

class SidebarTestPage extends Component {
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
        ]
    }
    alertItemName = (item) => {
        alert("Jump to session " + item.name)
    }
    render() {
        return (
            <View>
                {
                    this.state.sessions.map((item, index) => (
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            onPress = {() => this.alertItemName(item)}>
                            <Text style = {styles.text}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}
export default SidebarTestPage

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'column',
        marginTop: 6,
        alignItems: 'center',
        width: 28,
        height: 28,
        borderWidth: .5,
        borderColor: '#5df56b',
        borderRadius: 90,

    },
    text: {
        color: '#5df56b',
        fontSize: 18,
        textAlign: 'center',
    }
})