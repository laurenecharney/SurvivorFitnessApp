import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

const TextBoxSingleLine = ({initValue, updateInputText}) => {
  const [value, changeValue] = useState(initValue.toString() || "");

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
      value={value}
      onChangeText={text => {
        changeValue(text); updateInputText(text);
      }}
    />
  );
}

export default TextBoxSingleLine;
