import {StyleSheet} from 'react-native';

const ForgotStyle = StyleSheet.create({
  homeAll: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
  },
  homeImage: {
    width: 303,
    height: 314,
    resizeMode: 'contain',
    marginTop: 34,
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
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 65,
    textAlign: 'center',
    width: '60%',
    paddingTop: 20,
    lineHeight: 56.44,
  },
  span: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
    width: '50%',
  },
  gabungan: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  failed: {
    fontFamily: 'Poppins-Black',
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ForgotStyle;
