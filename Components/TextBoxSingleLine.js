import React, { useState } from 'react';
import { TextInput } from 'react-native';

const TextBoxSingleLine = ({initValue, callback}) => {
  const [value, onChangeText] = useState(initValue || "");


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
      //placeholder={value || ""}
      onChangeText={text => onChangeText(text)}
      onEndEditing={() => callback(value)}
      defaultValue={initValue}
    />
  );
}

export default TextBoxSingleLine;
