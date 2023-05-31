import {StyleSheet} from 'react-native';

const Homestyles = StyleSheet.create({
  homeAll: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  homeText: {
    fontSize: 65,
    color: 'black',
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  homeImage: {
    width: 433,
    height: 481,
    resizeMode: 'contain',
  },
  homeButton: {
    width: 352,
    height: 70,
    backgroundColor: '#6A4029',
    marginLeft: 31,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
});

export default Homestyles;
