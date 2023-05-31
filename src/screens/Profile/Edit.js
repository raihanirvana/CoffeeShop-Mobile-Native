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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import {editProfile} from '../../utils/axios/https/allAxios';
import users, {usersAction} from '../../Redux/slices/users';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Box, Menu, NativeBaseProvider} from 'native-base';
import {getProfile} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const EditProfile = () => {
  LogBox.ignoreAllLogs();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState('');
  const [fileImages, setFileImages] = useState('');
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  const [data, setData] = useState('');
  const token = userStore.data.token;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    display_name: '',
    image: '',
    gender: '',
    phone_number: '',
    birthday: '',
    address: null,
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getProfile(token);
        setData(response.data.user);
        setFormData({
          ...formData,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          display_name: response.data.user.display_name,
          image: response.data.user.image,
          gender: response.data.user.gender,
          phone_number: response.data.user.phone_number,
          birthday: response.data.user.birthday,
          address: response.data.user.address,
          email: response.data.user.email,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditProfile = () => {
    const {
      first_name,
      last_name,
      display_name,
      gender,
      phone_number,
      birthday,
      address,
      email,
    } = formData;
    const role_id = 1;
    let image = fileImages;
    if (image === '') {
      image = formData.image;
    }
    console.log(fileImages);
    editProfile(token, fileImage, formData)
      .then(response => {
        console.log(response.data);
        setSuccess('Update Profile Success');
        setTimeout(() => {
          setSuccess('');
        }, 1000);
        dispatch(
          usersAction.updateUserData({
            first_name,
            last_name,
            display_name,
            image,
            gender,
            phone_number,
            birthday,
            address,
            email,
            role_id,
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
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
  console.log(formData.address);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NativeBaseProvider>
      <ScrollView
        style={{paddingLeft: 50, flex: 1, backgroundColor: '#f5f5f8'}}>
        <View style={{marginLeft: 100, marginTop: 40}}>
          <Image
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
            }}
            source={
              fileImages !== ''
                ? {uri: fileImages}
                : formData.image !== null
                ? {uri: formData.image}
                : require('../../assets/images/default.png')
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
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Display Name:
        </Text>
        <TextInput
          value={formData.display_name}
          onChangeText={text => setFormData({...formData, display_name: text})}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input your display name"
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          First Name:
        </Text>
        <TextInput
          value={formData.first_name}
          onChangeText={text => setFormData({...formData, first_name: text})}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input your first name here"
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Last Name:
        </Text>
        <TextInput
          value={formData.last_name}
          onChangeText={text => setFormData({...formData, last_name: text})}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input last your name here"
        />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => setFormData({...formData, gender: '1'})}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value={formData.gender}
              color="#6A4029"
              uncheckedColor="gray"
              status={formData.gender === '1' ? 'checked' : 'unchecked'}
              onPress={() => setFormData({...formData, gender: '1'})}
            />
            <Text style={{width: 70, marginTop: 8, color: 'black'}}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFormData({...formData, gender: '2'})}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value={formData.gender}
              color="#6A4029"
              uncheckedColor="gray"
              status={formData.gender === '2' ? 'checked' : 'unchecked'}
              onPress={() => setFormData({...formData, gender: '2'})}
            />
            <Text style={{width: 200, marginTop: 8, color: 'black'}}>Male</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Email Address:
        </Text>
        <TextInput
          value={formData.email}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input your name here"
          editable={false} // Set editable prop to false to disable the input
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Phone Number
        </Text>
        <TextInput
          value={formData.phone_number}
          onChangeText={text => setFormData({...formData, phone_number: text})}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="Input your phone number"
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Date of Birth:
        </Text>
        <TextInput
          onChangeText={text => {
            {
              setFormData({...formData, birthday: text});
            }
          }}
          value={
            formData.birthday ? formData.birthday.toString().split('T')[0] : ''
          }
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="Input your birthday (yyyy-mm-dd)"
        />

        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            color: '#9F9F9F',
            fontSize: 13,
          }}>
          Delivery Address:
        </Text>
        <TextInput
          onChangeText={text => setFormData({...formData, address: text})}
          value={formData.address === 'null' ? '' : formData.address}
          style={{
            borderBottomColor: '#9F9F9F',
            borderBottomWidth: 1,
            width: '90%',
          }}
          placeholder="input your address"
        />
        <Text style={{color: 'black', marginTop: 15, marginLeft: 90}}>
          {success}
        </Text>
        <TouchableOpacity
          onPress={handleEditProfile}
          style={{
            width: 320,
            height: 70,
            backgroundColor: '#6A4029',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Save and Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default EditProfile;
