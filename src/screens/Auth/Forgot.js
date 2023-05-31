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
import ForgotStyle from '../Styles/Forgot';
import {forgot} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const Forgot = () => {
  LogBox.ignoreAllLogs();
  const [success, setSuccess] = useState('');
  const [failed, setFailed] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const checkEmail = () => {
    setLoading(true);
    setTimeout(() => {
      forgot(email)
        .then(response => {
          console.log(response);
          setSuccess('OTP Has Been Send To Your Email');
          setTimeout(() => {
            navigation.navigate('ForgotSuccess');
            setEmail('');
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
  const disabled = email === '';
  return (
    <ScrollView style={ForgotStyle.homeAll}>
      <View style={ForgotStyle.gabungan}>
        <Text style={ForgotStyle.title}>Don't Worry</Text>
        <Text style={ForgotStyle.span}>
          We’ve just sent a link to your email to request a new password
        </Text>
      </View>
      <View style={ForgotStyle.Image}>
        <Image
          style={ForgotStyle.homeImage}
          source={require('../../assets/images/forgot.png')}
        />
      </View>
      <View style={ForgotStyle.Image}>
        <TextInput
          value={email}
          onChangeText={text => {
            setEmail(text), setFailed('');
          }}
          placeholder="Enter your email address"
          style={ForgotStyle.input}
          keyboardType="email-address"
        />
      </View>
      <Text style={ForgotStyle.success}>{success}</Text>
      <Text style={ForgotStyle.failed}>{failed}</Text>
      <TouchableOpacity
        onPress={checkEmail}
        style={ForgotStyle.homeButton}
        disabled={loading || disabled}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={ForgotStyle.buttonText}>Send</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Forgot;
