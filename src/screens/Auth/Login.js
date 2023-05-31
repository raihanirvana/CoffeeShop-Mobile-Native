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
import LoginStyle from '../Styles/Login';
import {login} from '../../utils/axios/https/allAxios';
import {usersAction} from '../../Redux/slices/users';
import {useDispatch, useSelector} from 'react-redux';
import {LogBox} from 'react-native';
const Login = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState('');
  const [failed, setFailed] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const {email, pass} = formData;
      login(email, pass)
        .then(response => {
          dispatch(usersAction.storeLogin({email, pass})); // Dispatch aksi untuk menyimpan login user
          setSuccess('Login Success');
          setTimeout(() => {
            navigation.navigate('Drawer');
            setFormData({email: '', pass: ''});
            setSuccess('');
            setLoading(false);
          }, 1000);
        })
        .catch(err => {
          setLoading(false);
          setFailed(err.response.data.msg);
          console.log(err);
        });
    }, 1000);
  };

  const disabled = formData.email === '' || formData.pass === '';
  return (
    <ScrollView style={LoginStyle.homeAll}>
      <Text style={LoginStyle.title}>LOGIN</Text>
      <View style={LoginStyle.Image}>
        <Image
          style={LoginStyle.homeImage}
          source={require('../../assets/images/login.png')}
        />
      </View>
      <View style={LoginStyle.Images}>
        <TextInput
          value={formData.email}
          onChangeText={text => {
            setFormData({...formData, email: text}), setFailed('');
          }}
          placeholder="Enter your email address"
          style={LoginStyle.input}
          keyboardType="email-address"
        />
      </View>
      <View style={LoginStyle.Images}>
        <TextInput
          value={formData.pass}
          onChangeText={text => {
            setFormData({...formData, pass: text}), setFailed('');
          }}
          placeholder="Enter your password"
          style={LoginStyle.input}
          secureTextEntry={true}
        />
      </View>
      <Text
        onPress={() => navigation.navigate('Forgot')}
        style={LoginStyle.forgot}>
        Forgot password?
      </Text>
      <Text style={LoginStyle.success}>{success}</Text>
      <Text style={LoginStyle.failed}>{failed}</Text>
      <TouchableOpacity
        onPress={handleLogin}
        style={LoginStyle.homeButton}
        disabled={loading || disabled}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={LoginStyle.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={LoginStyle.grup}>
        <View style={LoginStyle.hr} />
        <Text style={LoginStyle.text2}>or login in with</Text>
        <View style={LoginStyle.hr} />
      </View>
      <TouchableOpacity style={LoginStyle.google}>
        <Image
          style={LoginStyle.imageGoogle}
          source={require('../../assets/images/google.png')}
        />
        <Text style={LoginStyle.googleText}>Login with Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
