import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 32,
  },
  btnSection: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameSection: {
    marginVertical: 32,
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
    marginTop: 72,
    height: 200,
    width: '100%',
  },
  scannedData: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  loader: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  loaderText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
  },
  scanListBtn: {width: '50%', marginRight: 4},
  scanBtn: {width: '50%', marginLeft: 4, paddingRight: 8},
  closeSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
