import React, {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getMessage} from '../../api';
import {validatePhoneNumber} from '../../utils';
import SendSMS from 'react-native-sms';
import styles from './styles';

const Scanner = ({navigation}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const onSuccess = async scannedData => {
    setId(scannedData?.data);
    setOpenScanner(false);
  };

  const reset = () => {
    setName('');
    setId('');
  };

  useEffect(() => {
    if (id?.length) {
      onFetchMessage({id, name});
    }
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFetchMessage = ({id, name}) => {
    getMessage({userId: 2, qrcode: id, name})
      .then(data => {
        if (Object.keys(data).length > 0) {
          const {phoneNumber, message} = data;
          const formattedMessage = message.replace(
            '{{Full Name}}',
            `\n${name}`,
          );
          if (validatePhoneNumber(phoneNumber)) {
            SendSMS.send(
              {
                body: formattedMessage,
                recipients: [phoneNumber],
                successTypes: ['sent'],
                allowAndroidSendWithoutReadPermission: true,
              },
              (completed, cancelled, error) => {
                console.log(
                  'SMS Callback: completed: ' +
                    completed +
                    ' cancelled: ' +
                    cancelled +
                    'error: ' +
                    error,
                );
              },
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
  };

  const textFieldProps = {
    onSetName: setName,
    name,
  };

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
              <TextField {...textFieldProps} />
            </View>
          </View>
          {openScanner && (
            <View style={styles.loader}>
              <Text style={styles.loaderText}>Scanning...</Text>
            </View>
          )}
          <View style={styles.scanner}>
            {openScanner && <QRCodeScanner onRead={onSuccess} />}
          </View>
          {openScanner && (
            <TouchableOpacity
              style={styles.closeSection}
              onPress={() => setOpenScanner(false)}>
              <Text style={styles.loaderText}>Close Scanner</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <View style={styles.btnSection}>
          <View style={styles.scanListBtn}>
            <Button
              label={'View scan list'}
              onPress={() => navigation.navigate('ScanList', {userId: 2})}
            />
          </View>
          <View style={styles.scanBtn}>
            <Button
              label={'Scan QR'}
              disabled={name.length === 0}
              onPress={() => {
                setOpenScanner(true);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Scanner;
