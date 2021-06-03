import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';

const UselessTextInput = (props) => {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.dateContainer}>
        <Text style={[styles.title, styles.row]}>
            Date:
        </Text>
        <TextInput
            editable = {props.edit}
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
        borderColor: '#E7E7E7',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        marginLeft: 0
      },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%',
        marginTop: 10,
          height: 34
      },
      headingText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",

      },
    title:{
        top: 7,
        fontSize: 16,
        fontWeight:'400',
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
        marginLeft: 10,
        marginRight: 15
    },
})

export default UselessTextInput;