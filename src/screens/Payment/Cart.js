import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import CardCartProd from '../../components/CartCard';
import {LogBox} from 'react-native';
const Cart = () => {
  const dispatch = useDispatch();
  LogBox.ignoreAllLogs();

  const cartRedux = useSelector(state => state.cart);
  const {shoppingCart} = cartRedux;
  console.log(shoppingCart.length);
  const navigation = useNavigation();
  let subtotal = 0;
  shoppingCart.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const taxFee = subtotal * 0.1;
  const total = subtotal + taxFee;

  if (shoppingCart.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#f5f5f8',
        }}>
        <Image source={require('../../assets/images/cartempty.png')} />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            color: 'black',
          }}>
          Your Cart Is Empty, Please Add Some Menu To Your Cart
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.containers}>
      <View style={{paddingBottom: 16}}>
        {shoppingCart.length >= 1 &&
          shoppingCart.map(cart => (
            <CardCartProd key={cart.product_id} data={cart} />
          ))}
      </View>
      <View style={styles.border}>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.buttonText}>Apply Delivery Coupons</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.total}>
        <Text style={styles.item}>Item Total</Text>
        <Text style={styles.price}>IDR {subtotal.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.item}>Delivery Charge</Text>
        <Text style={styles.price}>IDR 0.000</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.item}>Tax</Text>
        <Text style={styles.price}>IDR {taxFee.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.totals}>
        <Text style={styles.items}>Total</Text>
        <Text style={styles.prices}>IDR {total.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.border}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Delivery', {total});
          }}
          style={styles.homeButton}>
          <Text style={styles.buttonText}>CheckOut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  prices: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-Black',
  },
  items: {
    fontFamily: 'Poppins-Black',
    width: 130,
    color: 'black',
    fontSize: 20,
  },
  totals: {
    flexDirection: 'row',
    gap: 80,
    marginTop: 50,
  },
  price: {
    color: 'black',
    fontSize: 15,
  },
  total: {
    flexDirection: 'row',
    gap: 110,
    marginTop: 30,
  },
  item: {
    width: 130,
    color: '#ADADAF',
    fontSize: 15,
  },
  border: {
    paddingBottom: 33,
    width: 320,
    borderBottomColor: '#E0E0E2',
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  homeButton: {
    width: 320,
    height: 70,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 30,
  },
  mines: {
    backgroundColor: '#E7AA3685',
    width: 21,
    height: 21,
    textAlign: 'center',
    borderRadius: 100,
    fontSize: 15,
  },
  name: {
    marginLeft: 20,
  },
  containers: {
    flex: 1,
    paddingLeft: 50,
    backgroundColor: '#f5f5f8',
  },
  allcontainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  allcontainerss: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  allcontainers: {
    flexDirection: 'row',
    marginTop: 100,
  },
  container: {
    backgroundColor: 'white',
    width: 102,
    height: 102,
    alignItems: 'center',
    borderRadius: 30,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 100,
    position: 'relative',
    marginTop: -20,
  },
  teks2: {
    fontFamily: 'Poppins-Black',
    color: '#6A4029',
    fontSize: 12,
    width: 172,
    textAlign: 'center',
    marginTop: 10,
  },
  teks: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
    marginTop: 16,
  },
  teks3: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
export default Cart;
