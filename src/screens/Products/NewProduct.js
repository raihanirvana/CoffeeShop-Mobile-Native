import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Box, Menu, NativeBaseProvider} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {LogBox} from 'react-native';
import {createProduct} from '../../utils/axios/https/allAxios';

const NewProduct = () => {
  const [success, setSuccess] = useState('');
  const [fileImage, setFileImage] = useState('');
  const [fileImages, setFileImages] = useState('');
  const userStore = useSelector(state => state.user);
  const token = userStore.data.token;
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    category_id: '',
    image: '',
    description: '',
  });
  LogBox.ignoreAllLogs();
  const options = [
    {label: 'Category'},
    {label: 'Food', value: 1},
    {label: 'Coffee', value: 2},
    {label: 'Non Coffe', value: 3},
    {label: 'Add On', value: 4},
  ];
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
  const handleCreateProduct = () => {
    if (
      formData.product_name === '' ||
      formData.price === '' ||
      formData.category_id === '' ||
      formData.description === ''
    ) {
      return setSuccess('fill the form completely');
    }
    let image = fileImages;
    if (image === '') {
      image = formData.image;
    }
    createProduct(token, fileImage, formData)
      .then(response => {
        console.log(response.data);
        setSuccess('Create Product Success');
        setTimeout(() => {
          setSuccess('');
        }, 1000);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  return (
    <NativeBaseProvider>
      <ScrollView
        style={{paddingLeft: 50, flex: 1, backgroundColor: '#f5f5f8'}}>
        <View style={{marginLeft: 70, marginTop: 40}}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: 'white',
            }}
            source={
              fileImages !== ''
                ? {uri: fileImages}
                : {uri: formData.image} ||
                  require('../../assets/images/elip.png')
            }
          />
        </View>
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
                    left: 180,
                    zIndex: 100,
                    top: -40,
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
        <Text
          style={{
            marginTop: 50,
            fontFamily: 'Poppins-Black',
            color: 'black',
            fontSize: 17,
          }}>
          Product Name:
        </Text>
        <TextInput
          onChangeText={text => {
            setFormData({...formData, product_name: text});
          }}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input product name"
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Black',
            color: 'black',
            fontSize: 17,
          }}>
          Product Price:
        </Text>
        <TextInput
          onChangeText={text => {
            setFormData({...formData, price: text});
          }}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input product price"
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Black',
            color: 'black',
            fontSize: 17,
          }}>
          Product Category
        </Text>
        <Picker
          selectedValue={formData.category_id}
          onValueChange={itemValue =>
            setFormData({...formData, category_id: itemValue})
          }
          style={{
            width: 200,
            height: 40,
            backgroundColor: '#6A4029',
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 0,
            color: 'white',
          }}>
          {options.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Black',
            color: 'black',
            fontSize: 17,
          }}>
          Product Description
        </Text>
        <TextInput
          onChangeText={text => {
            setFormData({...formData, description: text});
          }}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input product description"
        />
        <Text style={{color: 'black', marginTop: 15, marginLeft: 90}}>
          {success}
        </Text>
        <TouchableOpacity
          onPress={handleCreateProduct}
          style={{
            width: 320,
            height: 70,
            backgroundColor: '#6A4029',
            borderRadius: 20,
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Create Product
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default NewProduct;
