import React, {useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cartAction} from '../../Redux/slices/cart';
import {addTransactions} from '../../utils/axios/https/allAxios';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {LogBox} from 'react-native';
const Payment = () => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const reduxStore = useSelector(state => state);
  const [success, setSuccess] = useState('');
  const cartRedux = reduxStore.cart;
  const {shoppingCart} = cartRedux;
  const userStore = useSelector(state => state.user);
  let subtotal = 0;
  shoppingCart.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const id = userStore.data.userData.id;
  const taxFee = subtotal * 0.1;
  const total = subtotal + taxFee;
  const handleSubmit = async () => {
    const dataShopping = cartRedux.shoppingCart.map(item => {
      const {image, prodName, price, qty, ...newItem} = item;
      return {
        ...newItem,
        subtotal: price * qty,
        qty,
        status_id: 1,
        id: userStore.data.userData.id,
      };
    });
    const body = {
      promo_id: 1,
      delivery_id: cartRedux.delivery,
      notes: '',
      payment_id: 1,
      status_id: 1,
      products: dataShopping,
    };
    try {
      const result = await addTransactions(userStore.data.token, body, id);
      onSendNotification();
      setSuccess('Payment Success');
      setTimeout(() => {
        dispatch(cartAction.resetCart());
        navigation.navigate('HomePage');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const onSendNotification = async (
    title = 'Payment Success',
    body = 'Your order will be processed soon ',
  ) => {
    try {
      await notifee.displayNotification({
        android: {
          channelId: 'urgent',
        },
        title,
        subtitle: '',
        body,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView style={{flex: 1, marginLeft: 50, backgroundColor: '#f5f5f8'}}>
      <Text
        style={{
          fontSize: 25,
          color: 'black',
          fontFamily: 'Poppins-Bold',
          borderBottomWidth: 0.5,
          borderBottomColor: '#9F9F9F',
          width: 329,
        }}>
        Payment Methods
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Image
          style={{width: 329, height: 202, marginTop: 30, marginRight: 10}}
          source={require('../../assets/images/bri.png')}
        />
        <Image
          style={{width: 329, height: 202, marginTop: 30, marginRight: 10}}
          source={require('../../assets/images/bri.png')}
        />
        <Image
          style={{width: 329, height: 202, marginTop: 30, marginRight: 10}}
          source={require('../../assets/images/bri.png')}
        />
      </ScrollView>
      <View style={{marginTop: 50}}>
        {shoppingCart.map((item, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', gap: 30, marginBottom: 10}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 18,
                  color: 'black',
                  width: 190,
                }}>
                {item.qty} {item.prodName}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                }}>
                {item.size_id === 1 ? <Text>Reguler</Text> : ''}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  color: 'black',
                  textAlign: 'right',
                  width: 100,
                }}>
                IDR {item.price.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 170,
          borderTopColor: 'gray',
          borderTopWidth: 0.5,
          paddingTop: 20,
          width: 329,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          Subtotal
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          IDR {subtotal.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 210}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          Tax
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          IDR {taxFee.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20, gap: 180}}>
        <Text
          style={{fontSize: 18, fontFamily: 'Poppins-Bold', color: 'black'}}>
          Total
        </Text>
        <Text
          style={{fontSize: 18, fontFamily: 'Poppins-Bold', color: 'black'}}>
          IDR {total.toLocaleString('id-ID')}
        </Text>
      </View>
      <Text
        style={{marginLeft: 80, color: 'black', marginTop: 10, fontSize: 17}}>
        {success}
      </Text>
      <View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            width: 320,
            height: 70,
            backgroundColor: '#6A4029',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Pay Now
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={onSendNotification()}
          style={{
            width: 320,
            height: 70,
            backgroundColor: '#6A4029',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            notif
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Payment;
