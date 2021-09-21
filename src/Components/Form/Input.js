import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    />
  );
};

// eslint-disable-next-line prettier/prettier
// const Input = ({placeholder,name,id,value,autoCorrect,autoCapitalize,onChangeText,onFocus,secureTextEntry,keyboardType}) => {
//   return (
//     // eslint-disable-next-line react/self-closing-comp
//     <TextInput
//       style={styles.input}
//       placeholder={placeholder}
//       name={name}
//       id={id}
//       value={value}
//       autoCorrect={autoCorrect}
//       autoCapitalize={autoCapitalize}
//       onChangeText={onChangeText}
//       onFocus={onFocus}
//       secureTextEntry={secureTextEntry}
//       keyboardType={keyboardType}></TextInput>
//   );
// };

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
});

export default Input;
