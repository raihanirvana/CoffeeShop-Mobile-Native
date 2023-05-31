import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
  homeAll: {
    paddingTop: 50,
    backgroundColor: '#f2f2f2',
    flex: 1,
    alignContent: 'center',
  },
  homeImage: {
    width: 333,
    height: 381,
    resizeMode: 'contain',
  },
  Image: {
    alignItems: 'flex-start',
  },
  Images: {
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
    fontFamily: 'Poppins-Reguler',
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
    width: '33%',
    right: 50,
    top: 90,
  },
  forgot: {
    marginLeft: 30,
    marginTop: 23,
    fontFamily: 'Poppins-Reguler',
    color: '#895537',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  grup: {
    flexDirection: 'row',
    marginTop: 33,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  hr: {
    width: 120,
    height: 1,
    backgroundColor: '#9F9F9F',
  },
  google: {
    width: 352,
    height: 70,
    backgroundColor: 'white',
    marginLeft: 31,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 33,
  },
  googleText: {
    color: 'black',
    fontFamily: 'Poppins-Reguler',
    fontSize: 17,
    textAlign: 'center',
  },
  imageGoogle: {
    position: 'absolute',
    left: 70,
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

export default LoginStyle;
