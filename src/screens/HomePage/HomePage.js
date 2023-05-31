import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Box, Menu, NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {getProduct} from '../../utils/axios/https/allAxios';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';

const HomePage = () => {
  LogBox.ignoreAllLogs();
  const userStore = useSelector(state => state.user);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [limit, setLimit] = useState('');
  const [page, setPage] = useState('');
  const role = userStore.data?.userData?.role_id;

  const handleItemPress = Id => {
    navigation.navigate('ProductDetail', {Id});
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProduct(search, sort, category, limit, page);
        setProducts(response.data.data);
      } catch (error) {
        if (error.response.data.msg === 'Product not found') {
          setProducts([]);
        }
      }
      setLoading(false);
    };
    fetchProducts();
  }, [search, sort, category, limit, page]);
  const handleCategory = e => {
    e.preventDefault();
    if (category === '2') {
      return navigation.navigate('Coffee');
    }
    if (category === '3') {
      return navigation.navigate('NonCoffee');
    }
    if (category === '1') {
      return navigation.navigate('Food');
    }
    if (category === '4') {
      return navigation.navigate('AddOn');
    }
    if (category === '') {
      return navigation.navigate('Favorite');
    }
  };
  const token = useSelector(state => state.user.data.token);
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>A good coffee is a good day</Text>
        {role === 2 ? (
          <View style={{position: 'absolute', zIndex: 100, marginTop: 700}}>
            <Box>
              <Menu
                w="190"
                trigger={triggerProps => {
                  return (
                    <Pressable
                      {...triggerProps}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#6A4029',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 500,
                        top: 0,
                        left: 0,
                        right: 0,
                      }}>
                      <Image
                        style={{width: 18, height: 18}}
                        source={require('../../assets/images/plus.png')}
                      />
                    </Pressable>
                  );
                }}>
                <Menu.Item
                  onPress={() => {
                    navigation.navigate('NewProduct');
                  }}>
                  New Product
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    navigation.navigate('NewPromo');
                  }}>
                  New Promo
                </Menu.Item>
              </Menu>
            </Box>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.contener}>
          <Image
            style={styles.search}
            source={require('../../assets/images/search.png')}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            placeholder="Search"
          />
        </View>
        <ScrollView
          style={styles.container2}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              setCategory('');
            }}>
            <Text style={category === '' ? styles.text1 : styles.text}>
              Favorite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCategory('2');
            }}>
            <Text style={category === '2' ? styles.text1 : styles.text}>
              Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCategory('3');
            }}>
            <Text style={category === '3' ? styles.text1 : styles.text}>
              Non Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCategory('1');
            }}>
            <Text style={category === '1' ? styles.text1 : styles.text}>
              Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCategory('4');
            }}>
            <Text style={category === '4' ? styles.text1 : styles.text}>
              Add-on
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={handleCategory}>
          <Text style={styles.teks3}>See more</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="black"
          />
        ) : products.length > 0 ? (
          <ScrollView
            style={{flex: 1}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {products.map(product => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleItemPress(product.id)}>
                <View style={styles.container3}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: product.image,
                    }}
                  />
                  <Text style={styles.teks}>{product.product_name}</Text>
                  <Text style={styles.teks2}>
                    IDR {product.price.toLocaleString('id-ID')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text>No products available</Text>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  contener: {
    flexDirection: 'row',
  },
  logo: {
    width: 168,
    height: 189,
    position: 'relative',
    zIndex: 100,
    marginTop: -30,
    borderRadius: 20,
  },
  search: {
    marginTop: 25,
    position: 'absolute',
    marginLeft: 20,
  },
  container: {
    backgroundColor: '#efefef',
    paddingLeft: 50,
    flex: 1,
  },
  container2: {
    marginTop: 26,
    flexDirection: 'row',
    flex: 1,
  },
  container3: {
    width: 220,
    height: 270,
    marginTop: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 40,
    marginBottom: 200,
  },
  teks3: {
    fontSize: 15,
    fontFamily: 'Poppins-Reguler',
    color: '#6A4029',
    flexDirection: 'row',
    marginLeft: 280,
    marginTop: 52,
  },
  image: {
    position: 'relative',
    zIndex: 100,
    marginTop: -30,
  },
  teks: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
    marginTop: 16,
  },
  text1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#6A4029',
    marginRight: 29,
    borderBottomColor: '#6A4029',
    borderBottomWidth: 2,
  },
  teks2: {
    fontFamily: 'Poppins-Black',
    color: '#6A4029',
    fontSize: 17,
    width: 172,
    textAlign: 'center',
  },
  title: {
    width: '83%',
    marginTop: 44,
    fontFamily: 'Poppins-Black',
    fontSize: 34,
    color: 'black',
  },
  input: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFEEEE',
    width: '83%',
    paddingLeft: 60,
    fontFamily: 'Poppins-Black',
    opacity: 0.5,
    color: 'black',
    marginTop: 8,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#9A9A9D',
    marginRight: 29,
  },
});

export default HomePage;
