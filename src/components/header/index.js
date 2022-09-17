import React from 'react';
import {Text, Platform, StatusBar} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = ({title}) => {
  const padTop = Platform.OS === 'android' ? StatusBar.currentHeight - 16 : 0;
  return (
    <SafeAreaView
      style={[styles.container, {paddingTop: padTop}]}
      edges={['top']}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
