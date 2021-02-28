import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';

const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.dateContainer}>
        <Text style={styles.headingText}>
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
        width: '80%', 
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        marginLeft: 10
      },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        marginTop: 50
      },
      headingText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
      },
})

export default UselessTextInput;