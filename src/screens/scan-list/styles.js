import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 32,
  },
  nonDataSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  flatlist: {
    marginVertical: 16,
  },
  noData: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
});

export default styles;
