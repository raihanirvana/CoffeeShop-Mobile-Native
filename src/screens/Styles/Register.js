import {StyleSheet} from 'react-native';

const RegisterStyle = StyleSheet.create({
  homeAll: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
  },
  homeImage: {
    width: 383,
    height: 431,
    resizeMode: 'contain',
  },
  Image: {
    alignItems: 'center',
  },
  homeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 352,
    height: 70,
    backgroundColor: '#6A4029',
    marginLeft: 31,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  input: {
    width: 352,
    height: 50,
    color: 'black',
    borderBottomWidth: 1,
    borderColor: '#9F9F9F',
    marginTop: 10,
  },
  title: {
    position: 'absolute',
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 65,
    width: '50%',
    right: 0,
    top: 25,
  },
  success: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  failed: {
    fontFamily: 'Poppins-Black',
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default RegisterStyle;
