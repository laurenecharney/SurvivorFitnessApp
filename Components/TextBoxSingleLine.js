import React from 'react';
import { TextInput } from 'react-native';

const TextBoxSingleLine = (props) => {
  const [value, onChangeText] = React.useState(props.content);

  const updateInput = (text) => {
    onChangeText(text);

    if(props.updateInputText){
      props.updateInputText(text);
    }
  }

  return (
    <TextInput
      style={{ backgroundColor: 'white',
      padding:10,
      borderWidth: 1,
      borderColor: "#E7E7E7",
      color: "#797979",
      width:'100%',
      borderRadius: 7,
      alignSelf:"center" }}
      placeholder={props.content}
      onChangeText={text => updateInput(text)}
      value={value}
    />
  );
}

export default TextBoxSingleLine;
