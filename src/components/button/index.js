import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const Button = ({label, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
