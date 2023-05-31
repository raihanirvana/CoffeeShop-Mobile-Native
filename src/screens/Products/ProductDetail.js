import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {getDetail} from '../../utils/axios/https/allAxios';
import {useRoute} from '@react-navigation/native';
import {cartAction} from '../../Redux/slices/cart';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';
const ProductDetail = () => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [success, setSuccess] = useState('');
  const userStore = useSelector(state => state.user);
  const role = userStore.data.userData.role_id;

  const handleUp = () => {
    setQty(qty + 1);
  };

  const handleDown = () => {
    if (qty === 1) {
      return;
    }
    setQty(qty - 1);
  };
  const route = useRoute();
  const {Id} = route.params;
  const handleItemPress = () => {
    navigation.navigate('EditProduct', {Id: product.id});
  };
  const handlecart = () => {
    navigation.navigate('Cart');
  };
  const handleAddToCart = () => {
    const cart = {
      product_id: Id,
      prodName: product.product_name,
      image: product.image || '',
      size_id: 1,
      qty: qty,
      price: product.price,
    };
    dispatch(cartAction.addtoCart(cart));
    setQty(1);
    setSuccess('Success Add to Your Cart');
    setTimeout(() => {
      setSuccess('');
    }, 500);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getDetail(Id);
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [Id]);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : product ? (
        <>
          {role === 1 ? (
            <TouchableOpacity onPress={handlecart} style={{marginLeft: 350}}>
              <Image source={require('../../assets/images/shop2.png')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleItemPress}
              style={{marginLeft: 350}}>
              <Image source={require('../../assets/images/pencilcoklat.png')} />
            </TouchableOpacity>
          )}

          <View style={styles.image}>
            <Image
              style={styles.images}
              source={{
                uri: product.image,
              }}
            />
          </View>
          <View style={styles.qty}>
            <TouchableOpacity onPress={handleDown}>
              <Text style={styles.teks}>-</Text>
            </TouchableOpacity>
            <Text style={styles.teks}>{qty}</Text>
            <TouchableOpacity onPress={handleUp}>
              <Text style={styles.teks}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.menu}>{product.product_name}</Text>
          <Text style={styles.harga}>
            IDR {product.price.toLocaleString('id-ID')}
          </Text>
          <View style={styles.konten}>
            <Text style={styles.delivery}>Delivery Info</Text>
            <Text style={styles.isi2}>
              Delivered only on monday until friday from 1 pm to 7 pm
            </Text>
            <Text style={styles.delivery2}>Description</Text>
            <Text style={styles.isi}>{product.description}</Text>
          </View>
          <Text style={{textAlign: 'center', color: 'black', marginTop: 15}}>
            {success}
          </Text>
          <TouchableOpacity onPress={handleAddToCart} style={styles.homeButton}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.notAvailable}>Product not available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    paddingTop: 27,
  },
  images: {
    width: 241,
    height: 241,
    borderRadius: 100,
  },
  teks: {
    fontSize: 25,
    color: 'black',
  },
  menu: {
    fontFamily: 'Poppins-Black',
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
    marginTop: 18,
  },
  harga: {
    fontSize: 22,
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
    color: '#6A4029',
  },
  qty: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  konten: {
    marginLeft: 50,
    marginTop: 20,
    width: 297,
  },
  delivery: {
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    color: 'black',
  },
  delivery2: {
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    color: 'black',
    marginTop: 15,
  },
  isi: {
    fontSize: 15,
    fontFamily: 'Poppins-Reguler',
    marginTop: 3,
    color: 'black',
    opacity: 0.5,
  },
  isi2: {
    fontSize: 15,
    fontFamily: 'Poppins-Reguler',
    marginTop: 3,
    color: 'black',
    opacity: 0.5,
  },
  homeButton: {
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
});
export default ProductDetail;
