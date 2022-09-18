import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Header from '../../components/header';
import {getScans} from '../../api';
import styles from './styles';

const ScanList = ({navigation, route}) => {
  const [scannedList, setScanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userId} = route?.params || {};

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getScans({userId: 2})
        .then(data => {
          setScanList(data);
          setIsLoading(false);
        })
        .catch(e => {
          console.error(e);
          setIsLoading(false);
        });
    }
  }, [userId]);

  const renderItem = item => {
    return (
      <View style={styles.card}>
        <Text>Dish Ordered: {item?.response?.dish}</Text>
        <Text>Phone Number: {item?.response?.phoneNumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Scanned List'} />
      {isLoading ? (
        <View style={styles.nonDataSection}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={styles.flatlist}>
          <FlatList
            data={scannedList}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.nonDataSection}>
                <Text style={styles.noData}>No Scan data found</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

export default ScanList;
