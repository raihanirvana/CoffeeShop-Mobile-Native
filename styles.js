import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeBackground: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  homeText: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    // fontFamily: 'Verdana',
  },
  homeBtn: {
    borderRadius: 20,
    backgroundColor: 'black',
    marginTop: 10,
    padding: 10,
  },
  homeBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  homeCounter: {
    textAlign: 'center',
    fontSize: 36,
  },
  nameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nameCard: {
    flex: 1,
    minWidth: '50%',
    padding: 5,
    borderWidth: 1,
  },
  nameText: {
    fontSize: 20,
  },
});

export default styles;
