import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';

const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.dateContainer}>
        <Text style={[styles.title, styles.row]}>
            Date:
        </Text>
        <TextInput
            style={styles.dateOutline}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder="Enter Date"
        />
    </View>
  );
}

const styles = StyleSheet.create({
    dateOutline: {
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        marginLeft: 0
      },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        marginTop: 10,
          height: 34
      },
      headingText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
      },
    title:{
        top: 7,
        fontSize: 16,
        fontWeight:'bold',
        color: '#838383',
    },

    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        marginLeft: 15,
        marginRight: 15
    },
})

export default UselessTextInput;