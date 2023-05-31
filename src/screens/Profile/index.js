import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {changePass} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const Profile = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const userStore = useSelector(state => state.user);
  const image = userStore.data?.userData?.image;
  const display_name = userStore.data?.userData?.display_name;
  const first_name = userStore.data?.userData?.first_name;
  const last_name = userStore.data?.userData?.last_name;
  const phone_number = userStore.data?.userData?.phone_number;
  const email = userStore.data?.userData?.email;
  const address = userStore.data?.userData?.address;
  const token = userStore.data.token;
  const [oldPass, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [fail, setFail] = useState('');
  const [modal, setModal] = useState(false);
  const handleChangePass = () => {
    if (oldPass === '' || newPassword === '' || confirmPassword === '') {
      setFail('Complete the form!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setFail('Your new and confirm password does not match');
      return;
    }
    changePass(token, oldPass, newPassword)
      .then(response => {
        console.log(response);
        setSuccess('Change Password Success');
        setTimeout(() => {
          setSuccess('');
          setModal(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err.response.data);
        setFail('Your Old Password is Incorrect');
      });
  };
  console.log(address);
  return (
    <>
      {modal ? (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: 'black',
              height: '100%',
              position: 'absolute',
              zIndex: 20,
              width: '100%',
              opacity: 0.6,
            }}></View>
          <View
            style={{
              position: 'absolute',
              zIndex: 200,
              backgroundColor: 'white',
              flex: 1,
              width: '80%',
              height: '80%',
              borderRadius: 20,
              marginTop: 80,
              marginLeft: 50,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                marginTop: 20,
              }}>
              Change Your Password
            </Text>
            <Text style={{color: 'black', marginLeft: 20, marginTop: 20}}>
              Current Password:
            </Text>
            <TextInput
              style={{
                color: 'black',
                marginLeft: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                width: '80%',
              }}
              secureTextEntry={true}
              onChangeText={text => {
                setOldPassword(text), setFail('');
              }}
              placeholder="Input your current password"
            />
            <Text style={{color: 'black', marginLeft: 20, marginTop: 20}}>
              New Password:
            </Text>
            <TextInput
              style={{
                color: 'black',
                marginLeft: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                width: '80%',
              }}
              secureTextEntry={true}
              onChangeText={text => {
                setNewPassword(text), setFail('');
              }}
              placeholder="Input your new password"
            />
            <Text style={{color: 'black', marginLeft: 20, marginTop: 20}}>
              Confirm Password:
            </Text>
            <TextInput
              style={{
                color: 'black',
                marginLeft: 20,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                width: '80%',
              }}
              secureTextEntry={true}
              onChangeText={text => {
                setConfirmPassword(text), setFail('');
              }}
              placeholder="Input your new password"
            />

            <Text
              style={{
                textAlign: 'center',
                marginTop: 30,
                color: 'black',
              }}>
              {success}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
              }}>
              {fail}
            </Text>
            <TouchableOpacity
              onPress={handleChangePass}
              style={{
                backgroundColor: '#6A4029',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
                height: 50,
                marginTop: 30,
                marginLeft: 50,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: '#6A4029',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModal(false), setFail(''), setSuccess('');
              }}
              style={{
                backgroundColor: '#6A4029',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
                height: 50,
                marginTop: 30,
                marginLeft: 50,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: '#6A4029',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
      <ScrollView
        style={{paddingLeft: 50, backgroundColor: '#f5f5f8', flex: 1}}>
        <Text
          style={{fontFamily: 'Poppins-Black', fontSize: 34, color: 'black'}}>
          My profile
        </Text>
        <View style={{flexDirection: 'row', gap: 130}}>
          <Text
            style={{fontFamily: 'Poppins-Black', fontSize: 17, color: 'black'}}>
            Your information
          </Text>
          <Text
            onPress={() => navigation.navigate('Edit')}
            style={{
              fontFamily: 'Poppins-reguler',
              fontSize: 15,
              color: '#6A4029',
            }}>
            edit
          </Text>
        </View>
        <View
          style={{
            borderRadius: 20,
            width: 315,
            height: 197,
            backgroundColor: 'white',
            marginTop: 14,
            flexDirection: 'row',
          }}>
          <View>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                marginLeft: 20,
                marginTop: 20,
              }}
              source={
                image !== null
                  ? {uri: image}
                  : require('../../assets/images/default.png')
              }
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-Black',
                fontSize: 17,
                color: 'black',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Black',
                  fontSize: 17,
                  color: 'black',
                  marginTop: 20,
                  width: '50%',
                }}>
                {display_name ||
                  first_name ||
                  last_name ||
                  'Your name is unset'}
              </Text>
            </Text>
            <Text
              style={{
                color: '#6A4029',
                opacity: 0.6,
                textDecorationLine: 'underline',
                fontFamily: 'Poppins-Regular',
              }}>
              {email}
            </Text>
            <Text
              style={{
                color: '#6A4029',
                opacity: 0.6,
                textDecorationLine: 'underline',
                fontFamily: 'Poppins-Regular',
                marginTop: 5,
              }}>
              {phone_number}
            </Text>
            <Text
              style={{
                color: '#6A4029',
                opacity: 0.6,
                width: '65%',
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
              }}>
              {address === null ? 'your address is unset' : address}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History');
          }}
          style={{
            width: 320,
            height: 70,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Order History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModal(true);
          }}
          style={{
            width: 320,
            height: 70,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Edit Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 320,
            height: 70,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 320,
            height: 70,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'Poppins-Black',
              textAlign: 'center',
            }}>
            Help
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
export default Profile;
