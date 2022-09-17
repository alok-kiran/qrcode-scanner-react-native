import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import Header from './components/header';
import Button from './components/button';
import TextField from './components/text-field';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getScans, getMessage} from './api';
import {validatePhoneNumber} from './utils';

const App = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const onSuccess = async scannedData => {
    console.log(['scannedData', scannedData]);
    setId(scannedData?.data);
    setOpenScanner(false);
  };

  const reset = () => {
    setName('');
    setId('');
  };

  useEffect(() => {
    if (id?.length) {
      getMessage({userId: 2, qrcode: id, name})
        .then(data => {
          if (Object.keys(data).length > 0) {
            console.log(['data', JSON.stringify(data)]);
            if (validatePhoneNumber(String(data.phoneNumber))) {
              Linking.openURL(
                `sms:&addresses=${data.phoneNumber}&body=${data.message.replace(
                  '{{Full Name}}',
                  `\n${name}`,
                )}`,
              );
            } else {
              reset();
              Alert.alert('No valid mobile number found');
            }
          }
        })
        .catch(e => {
          console.error(e);
          reset();
        });
    }
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <SafeAreaProvider style={styles.container}>
      <Header title={'Scan & Go'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'padding'}
        style={styles.flexOne}
        keyboardVerticalOffset={16}>
        <ScrollView>
          <View style={styles.nameSection}>
            <View style={styles.flexOne}>
              <Text style={styles.name}>Your name</Text>
            </View>
            <View style={styles.flexThree}>
              <TextField onSetName={setName} name={name} />
            </View>
          </View>
          {openScanner && (
            <View style={styles.loader}>
              <Text>Scanning ...</Text>
            </View>
          )}
          <View style={styles.scanner}>
            {openScanner && <QRCodeScanner onRead={onSuccess} />}
          </View>
        </ScrollView>
        <View style={styles.btnSection}>
          <Button
            label={'Scan QR'}
            disabled={name.length === 0}
            onPress={() => {
              setOpenScanner(true);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 32,
  },
  btnSection: {
    width: '100%',
    paddingHorizontal: 16,
  },
  nameSection: {
    marginTop: 32,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  flexOne: {flex: 1},
  flexThree: {
    flex: 3,
  },
  scanner: {
    marginVertical: 24,
  },
  scannedData: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  loader: {
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
