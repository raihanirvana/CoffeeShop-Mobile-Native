import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RegisterStyle from '../Styles/Register';
import {signup} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const Register = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [failed, setFailed] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    phone_number: '',
  });
  const handleSign = () => {
    setLoading(true);
    setTimeout(() => {
      const {email, pass, phone_number} = formData;
      if (email === '' || pass === '' || phone_number === '') {
        setFailed('Form must not empty');
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFailed('Invalid email format');
        setLoading(false);
        return;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(pass)) {
        setFailed(
          'Password must be at least 6 characters long and contain 1 uppercase letter',
        );
        setLoading(false);
        return;
      }
      const phoneNumberRegex = /^[0-9]+$/;
      if (!phoneNumberRegex.test(phone_number)) {
        setFailed('Phone number can only contain numbers');
        setLoading(false);
        return;
      }
      signup(email, pass, phone_number)
        .then(response => {
          console.log(response);
          setSuccess('Create Account Success');
          setTimeout(() => {
            navigation.navigate('Login');
            setFormData({email: '', pass: '', phone_number: ''});
            setSuccess('');
          }, 1000);
        })
        .catch(err => {
          setLoading(false);
          setFailed(err.response.data.msg);
          console.log(err);
        });
    }, 1000);
  };

  return (
    <ScrollView style={RegisterStyle.homeAll}>
      <Text style={RegisterStyle.title}>Sign Up</Text>
      <View style={RegisterStyle.Image}>
        <Image
          style={RegisterStyle.homeImage}
          source={require('../../assets/images/sign.png')}
        />
      </View>
      <View style={RegisterStyle.Image}>
        <TextInput
          value={formData.email}
          onChangeText={text => {
            setFormData({...formData, email: text});
            setFailed('');
          }}
          placeholder="Enter your email address"
          style={RegisterStyle.input}
          keyboardType="email-address"
        />
      </View>
      <View style={RegisterStyle.Image}>
        <TextInput
          value={formData.pass}
          onChangeText={text => {
            setFormData({...formData, pass: text});
            setFailed('');
          }}
          placeholder="Enter your password"
          style={RegisterStyle.input}
          secureTextEntry={true}
        />
      </View>
      <View style={RegisterStyle.Image}>
        <TextInput
          value={formData.phone_number}
          onChangeText={text => {
            setFormData({...formData, phone_number: text});
            setFailed('');
          }}
          placeholder="Enter your phone number"
          style={RegisterStyle.input}
          keyboardType="numeric"
        />
      </View>
      <Text style={RegisterStyle.success}>{success}</Text>
      <Text style={RegisterStyle.failed}>{failed}</Text>
      <TouchableOpacity
        onPress={handleSign}
        style={RegisterStyle.homeButton}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={RegisterStyle.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;
