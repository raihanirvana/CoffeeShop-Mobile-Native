import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {cartAction} from '../../Redux/slices/cart';
import {useRoute} from '@react-navigation/native';
import {LogBox} from 'react-native';
const Delivery = () => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const route = useRoute();
  const [test, setTest] = useState('');
  const navigation = useNavigation();
  const userRedux = useSelector(state => state.user);
  const cartRedux = useSelector(state => state.cart);
  const {shoppingCart} = cartRedux;
  let subtotal = 0;
  shoppingCart.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const taxFee = subtotal * 0.1;
  let total = subtotal + taxFee;
  const [address, setAddress] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('3');
  const [add, setAdd] = useState(userRedux.data.userData.address);
  const handleConfirm = () => {
    if (add === '') {
      setTest('Please Input Your Address First');
      setTimeout(() => {
        setTest('');
      }, 500);
      return;
    }
    dispatch(cartAction.deliveryMethod(deliveryMethod));
    navigation.navigate('Payment', {subtotal: route.params.total});
  };
  console.log(add);
  return (
    <ScrollView style={style.one}>
      <Text style={style.two}>Delivery</Text>
      <View style={style.three}>
        <Text style={style.four}>Address details</Text>
        <Text
          onPress={() => {
            setAddress(true);
          }}
          style={style.five}>
          change
        </Text>
      </View>
      {address ? (
        <>
          <TextInput
            value={add === 'null' ? '' : add}
            placeholder="Enter your complete address"
            style={{backgroundColor: 'white', width: 315, height: 120}}
            onChangeText={text => setAdd(text)}
          />
          <Text
            onPress={() => setAddress(false)}
            style={{
              color: 'white',
              marginTop: 5,
              backgroundColor: '#6A4029',
              width: 50,
              textAlign: 'center',
              borderRadius: 10,
            }}>
            Save
          </Text>
        </>
      ) : (
        <View style={style.six}>
          <Text style={style.seven}>{add === 'null' ? '' : add}</Text>
        </View>
      )}

      <Text style={style.eight}>Delivery methods</Text>
      <View style={style.nine}>
        <View style={{marginLeft: 10}}>
          <RadioButton.Group
            onValueChange={value => setDeliveryMethod(value)}
            value={deliveryMethod}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
              }}>
              <RadioButton value="1" color="#6A4029" uncheckedColor="gray" />
              <Text
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 200,
                  marginTop: 8,
                  color: 'black',
                  paddingBottom: 20,
                }}>
                Door Delivery
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
              <RadioButton value="2" color="#6A4029" uncheckedColor="gray" />
              <Text
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 200,
                  marginTop: 8,
                  color: 'black',
                  paddingBottom: 20,
                }}>
                Pick up at store
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
              <RadioButton value="3" color="#6A4029" uncheckedColor="gray" />
              <Text
                style={{
                  flexDirection: 'row',
                  width: 200,
                  marginTop: 8,
                  color: 'black',
                  paddingBottom: 20,
                }}>
                Dine in
              </Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>
      <View style={style.ten}>
        <Text style={style.ones}>Total</Text>
        <Text style={style.twos}>IDR {total.toLocaleString('id-ID')}</Text>
      </View>
      <Text style={{marginLeft: 60, color: 'black'}}>{test}</Text>
      <View style={style.threes}>
        <TouchableOpacity onPress={handleConfirm} style={style.fours}>
          <Text style={style.fives}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  one: {
    flex: 1,
    paddingLeft: 50,
    backgroundColor: '#f5f5f8',
  },
  two: {
    fontFamily: 'Poppins-Black',
    fontSize: 34,
    color: 'black',
  },
  three: {
    marginTop: 25,
    flexDirection: 'row',
    gap: 115,
  },
  four: {
    fontFamily: 'Poppins-Black',
    fontSize: 17,
    color: 'black',
  },
  five: {
    fontFamily: 'Poppins-reguler',
    fontSize: 15,
    color: '#6A4029',
  },
  six: {
    borderRadius: 20,
    width: 315,
    height: 156,
    backgroundColor: 'white',
    marginTop: 14,
  },
  seven: {
    color: 'black',
    marginLeft: 30,
    fontSize: 17,
    fontFamily: 'Poppins-Reguler',
    width: 270,
    marginTop: 25,
    lineHeight: 30,
  },
  eight: {
    marginTop: 35,
    fontFamily: 'Poppins-Black',
    fontSize: 17,
    color: 'black',
  },
  nine: {
    borderRadius: 20,
    width: 315,
    height: 223,
    backgroundColor: 'white',
    marginTop: 14,
  },
  ten: {
    flexDirection: 'row',
    gap: 125,
    marginTop: 25,
  },
  ones: {
    fontSize: 17,
    fontFamily: 'Poppins-Reguler',
    color: 'black',
  },
  twos: {
    fontSize: 22,
    fontFamily: 'Poppins-Black',
    color: 'black',
  },
  threes: {},
  fours: {
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 30,
  },
  fives: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
});

export default Delivery;
