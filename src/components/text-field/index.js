import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const TextField = ({onSetName, name}) => {
  //const [t, setT] = useState(name)
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        style={styles.textInput}
        onChangeText={text => onSetName(text)}
      />
    </View>
  );
};

export default TextField;

TextField.propTypes = {
  onSetName: PropTypes.func,
};
