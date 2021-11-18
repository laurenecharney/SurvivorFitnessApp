import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

export const SidebarRow = ({item, index, isLogged, alertFunction}) => {
    return(
        <TouchableOpacity
            style = {item.isHighlighted ? styles.highlightedRow: styles.row}
            key = {index}>
            <TouchableOpacity
                style = {styles.container}
                onPress = {() => alertFunction(item)}>
                <Text style = {styles.text}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SidebarRow

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