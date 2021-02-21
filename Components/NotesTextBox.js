import React,{Component} from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';

class NotesTextBox extends Component {
    state = {
        propertyName: '',
        value: ''
    }
    constructor(props){
        super(props)
    
    }
    
    UselessTextInput = () => {
        const [value, onChangeText] = React.useState('');
    }

    render() {
        return (
            <View style={styles.notes}>
                <Text style={styles.headingText}>
                    {this.props.name} Notes:
                </Text>
                <TextInput
                    style={styles.notesOutline}
                    onChangeText={text => onChangeText(text)}
                    placeholder= {this.props.name + " notes"}
                    multiline
                />
            </View>
          );
    }
}

export default NotesTextBox;

const styles = StyleSheet.create({
    notes: {
        width: '90%',
        height: '35%',
        paddingTop: 20
      },
      notesOutline: { 
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        height: 250,
        marginHorizontal: 10,
      },
      headingText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
      },
})