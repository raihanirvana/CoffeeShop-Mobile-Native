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
  Pressable,
} from 'react-native';
import {Box, Menu, NativeBaseProvider} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {
  editProduct,
  getDetail,
  deleteProduct,
} from '../../utils/axios/https/allAxios';
import {useRoute} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';
const EditProduct = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState('');
  const [fileImages, setFileImages] = useState('');
  const [product, setProduct] = useState(null);
  const [success, setSuccess] = useState('');
  const userStore = useSelector(state => state.user);
  const token = userStore.data.token;
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    category_id: '',
    image: '',
    description: '',
  });
  const options = [
    {label: 'Category'},
    {label: 'Food', value: 1},
    {label: 'Coffee', value: 2},
    {label: 'Non Coffe', value: 3},
    {label: 'Add On', value: 4},
  ];

  const route = useRoute();
  const {Id} = route.params;
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getDetail(route.params.Id);
        setProduct(response.data.data);
        setFormData({
          ...formData,
          product_name: response.data.data.product_name,
          price: response.data.data.price,
          category_id: response.data.data.category_id,
          image: response.data.data.image,
          description: response.data.data.description,
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const handleInputImage = async method => {
    try {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkGranted) {
        console.log('Camera permission is granted.');
      } else {
        console.log('Camera permission is not granted.');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted.');
          // You can now access the camera.
        } else {
          console.log('Camera permission denied.');
          // Handle permission denied case.
        }
      }
    } catch (error) {
      console.log('Error checking camera permission:', error);
    }
    const option = {
      mediaType: 'photo',
      quality: 1,
    };
    if (method === 'camera') {
      // =======> CAMERA <=========
      launchCamera(option, res => {
        if (res.didCancel) {
          console.log('User cancel');
        } else if (res.errorCode) {
          console.log(res.errorMessage);
        } else {
          setFileImage(res.assets[0]);
          setFileImages(res.assets[0].uri);
        }
      });
    } else {
      // =======> GALERY <=========
      launchImageLibrary(option, res => {
        if (res.didCancel) {
          console.log('User cancel');
        } else if (res.errorCode) {
          console.log(res.errorMessage);
        } else {
          setFileImage(res.assets[0]);
          setFileImages(res.assets[0].uri);
        }
      });
    }
  };
  const handleEditProduct = () => {
    let image = fileImages;
    if (image === '') {
      image = formData.image;
    }
    editProduct(token, Id, fileImage, formData)
      .then(response => {
        console.log(response.data);
        setSuccess('Update Product Success');
        setTimeout(() => {
          setSuccess('');
        }, 1000);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  const handleDelete = () => {
    deleteProduct(Id)
      .then(response => {
        setSuccess('Delete Product Success');
        setTimeout(() => {
          navigation.navigate('HomePage');
        }, 500);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <NativeBaseProvider>
      <ScrollView style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator />
        ) : product ? (
          <ScrollView style={{flex: 1}}>
            {modal ? (
              <>
                <View
                  style={{
                    backgroundColor: 'black',
                    position: 'absolute',
                    flex: 1,
                    zIndex: 100,
                    width: 1000,
                    height: 1000,
                    opacity: 0,
                  }}></View>
                <View
                  style={{
                    position: 'absolute',
                    top: 350,
                    left: 70,
                    zIndex: 100,
                    backgroundColor: 'white',
                    height: 100,
                  }}>
                  <Text style={{color: 'red', marginTop: 10}}>
                    Are You Sure Want To Delete This Product?
                  </Text>
                  <Text
                    onPress={handleDelete}
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#6A4029',
                      color: 'white',
                      width: '50%',
                      marginLeft: 70,
                      marginTop: 10,
                    }}>
                    Yes
                  </Text>
                  <Text
                    onPress={() => {
                      setModal(false);
                    }}
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#6A4029',
                      color: 'white',
                      width: '50%',
                      marginLeft: 70,
                      marginTop: 10,
                    }}>
                    No
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={() => {
                setModal(true);
              }}
              style={{
                position: 'absolute',
                width: 45,
                height: 45,
                marginLeft: 360,
                zIndex: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#6A4029',
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  right: 20,
                  position: 'absolute',
                }}>
                <Image
                  style={{width: 14, height: 16}}
                  source={require('../../assets/images/trash.png')}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                zIndex: 5,
                top: 220,
                backgroundColor: 'red',
                width: 40,
                height: 40,
                borderRadius: 20,
                left: 280,
              }}>
              <Box alignItems="flex-end">
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
                          zIndex: 5,
                          top: 0,
                          right: 0,
                        }}>
                        <Image
                          style={{width: 18, height: 18}}
                          source={require('../../assets/images/pencil.png')}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item onPress={() => handleInputImage('camera')}>
                    Camera
                  </Menu.Item>
                  <Menu.Item onPress={() => handleInputImage('galery')}>
                    Galery
                  </Menu.Item>
                </Menu>
              </Box>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.images}
                source={
                  fileImages !== ''
                    ? {uri: fileImages}
                    : {uri: formData.image} ||
                      require('../../assets/images/default.png')
                }
              />
            </View>
            <TextInput
              value={formData.product_name}
              style={styles.menu}
              onChangeText={text => {
                setFormData({...formData, product_name: text});
              }}
            />
            <Picker
              style={styles.picker}
              selectedValue={formData.category_id}
              onValueChange={itemValue =>
                setFormData({...formData, category_id: itemValue})
              }>
              {options.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <TextInput
              value={formData.price ? formData.price.toString() : ''}
              style={styles.harga}
              onChangeText={text => {
                setFormData({...formData, price: text});
              }}
            />
            <View style={styles.konten}>
              <Text style={styles.delivery2}>Description</Text>
              <TextInput
                value={formData.description}
                style={styles.isi}
                multiline={true}
                onChangeText={text => {
                  setFormData({...formData, description: text});
                }}
              />
            </View>
            <Text
              style={{
                color: 'black',
                marginTop: 15,
                marginLeft: 140,
                marginBottom: 20,
              }}>
              {success}
            </Text>
            <TouchableOpacity
              onPress={handleEditProduct}
              style={styles.homeButton}>
              <Text style={styles.buttonText}>Save Change</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text style={styles.notAvailable}>Product not available</Text>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 200,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 120,
    color: 'white',
  },
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
    width: '100%',
    color: 'black',
  },
  qty: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  konten: {
    marginLeft: 50,
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
    color: 'black',
    opacity: 0.5,
    height: 120,
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
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
});
export default EditProduct;
