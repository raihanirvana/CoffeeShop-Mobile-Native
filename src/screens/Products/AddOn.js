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
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {getProduct} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const AddOn = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [limit, setLimit] = useState('');
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);
  const category = '4';
  const options = [
    {label: 'Sort By'},
    {label: 'Newest', value: 'newest'},
    {label: 'Latest', value: 'latest'},
    {label: 'Cheapest', value: 'cheapest'},
    {label: 'Priciest', value: 'priciest'},
  ];
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
        console.log(error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [sort, limit, page]);

  const handleSearch = () => {
    setLoading(true);
    getProduct(search, sort, category, limit, page)
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add On</Text>
      <View style={styles.contener}>
        <TouchableOpacity style={styles.test} onPress={handleSearch}>
          <Image
            style={styles.search}
            source={require('../../assets/images/search.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          placeholder="Search"
          onChangeText={text => {
            setSearch(text);
          }}
        />
      </View>
      <Picker
        style={styles.picker}
        selectedValue={sort}
        onValueChange={itemValue => setSort(itemValue)}>
        {options.map(option => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
      <View style={styles.kontener}>
        {loading ? (
          <ActivityIndicator />
        ) : !products ? (
          <Text style={styles.notAvailable}>Product not available</Text>
        ) : (
          products.map(product => (
            <TouchableOpacity onPress={() => handleItemPress(product.id)}>
              <View key={product.id} style={styles.container3}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: product.image,
                  }}
                />
                <Text style={styles.teks}>{product.product_name}</Text>
                <Text style={styles.teks2}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  test: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFEEEE',
    width: 50,
    paddingLeft: 20,
    fontFamily: 'Poppins-Black',
    opacity: 0.5,
    color: 'black',
    marginTop: 2,
    position: 'absolute',
    zIndex: 100,
  },
  contener: {
    flexDirection: 'row',
  },
  kontener: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: 'Poppins-Black',
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginLeft: 33,
  },
  logo: {
    width: 128,
    height: 128,
    position: 'relative',
    zIndex: 100,
    marginTop: -30,
    borderRadius: 20,
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
  teks2: {
    fontFamily: 'Poppins-Black',
    color: '#6A4029',
    fontSize: 17,
    width: 172,
    textAlign: 'center',
  },
  container3: {
    width: 149,
    height: 212,
    marginTop: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 40,
  },
  search: {
    marginTop: 25,
    position: 'absolute',
    marginLeft: 20,
  },
  input: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFEEEE',
    width: '90%',
    paddingLeft: 60,
    fontFamily: 'Poppins-Black',
    opacity: 0.5,
    color: 'black',
    marginTop: 8,
  },
});
export default AddOn;
