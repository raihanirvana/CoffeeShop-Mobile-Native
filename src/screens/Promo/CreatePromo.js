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
import {createPromo} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const CreatePromo = () => {
  LogBox.ignoreAllLogs();
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
  });
  const handleCreate = () => {
    const {code, discount} = formData;
    createPromo(code, discount)
      .then(response => {
        console.log(response);
        setSuccess('Create Promo Success');
        setTimeout(() => {
          setSuccess('');
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ScrollView style={{paddingLeft: 50, flex: 1, backgroundColor: '#f5f5f8'}}>
      <Text
        style={{
          marginTop: 50,
          fontFamily: 'Poppins-Black',
          color: 'black',
          fontSize: 17,
        }}>
        Promo Code:
      </Text>
      <TextInput
        onChangeText={text => {
          setFormData({...formData, code: text});
        }}
        style={{
          borderBottomColor: '#9F9F9F',
          borderBottomWidth: 1,
          width: '90%',
        }}
        placeholder="input promo code"
      />
      <Text
        style={{
          marginTop: 20,
          fontFamily: 'Poppins-Black',
          color: 'black',
          fontSize: 17,
        }}>
        Discount:
      </Text>
      <TextInput
        onChangeText={text => {
          setFormData({...formData, discount: text});
        }}
        style={{
          borderBottomColor: '#9F9F9F',
          borderBottomWidth: 1,
          width: '90%',
        }}
        placeholder="input product discount"
      />
      <Text style={{color: 'black', marginTop: 15, marginLeft: 90}}>
        {success}
      </Text>
      <TouchableOpacity
        onPress={handleCreate}
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
          Create Promo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePromo;
