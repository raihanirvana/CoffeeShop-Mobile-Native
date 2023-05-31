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
import ForgotSuccessStyle from '../Styles/ForgotSucess';
import {forgotChangePass} from '../../utils/axios/https/allAxios';
import {LogBox} from 'react-native';
const ForgotSuccess = () => {
  LogBox.ignoreAllLogs();
  const [success, setSuccess] = useState('');
  const [failed, setFailed] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    otp: '',
    newPass: '',
    confirmPass: '',
  });
  const changePassForgot = () => {
    setLoading(true);
    const {otp, newPass, confirmPass} = formData;
    if (newPass !== confirmPass) {
      return setFailed("Your Password Doesn't Match");
    }
    setTimeout(() => {
      forgotChangePass(otp, newPass)
        .then(response => {
          console.log(response);
          setSuccess('Reset Password Success');
          setTimeout(() => {
            navigation.navigate('Login');
            setFormData({otp: '', newPass: '', confirmPass: ''});
          }, 1000);
        })
        .catch(err => {
          setLoading(false);
          setFailed(err.response.data.msg);
          console.log(err);
        });
    }, 1000);
  };
  const disabled =
    formData.otp === '' ||
    formData.newPass === '' ||
    formData.confirmPass === '';
  const navigation = useNavigation();
  return (
    <ScrollView style={ForgotSuccessStyle.homeAll}>
      <View style={ForgotSuccessStyle.gabungan}>
        <Text style={ForgotSuccessStyle.title}>Don't Worry</Text>
        <Text style={ForgotSuccessStyle.span}>
          We’ve will reset your password
        </Text>
      </View>
      <View style={ForgotSuccessStyle.Image}>
        <Image
          style={ForgotSuccessStyle.homeImage}
          source={require('../../assets/images/forgot.png')}
        />
      </View>
      <View style={ForgotSuccessStyle.Image}>
        <TextInput
          placeholder="Enter your OTP"
          style={ForgotSuccessStyle.input}
          keyboardType="numeric"
          value={formData.otp}
          onChangeText={text => setFormData({...formData, otp: text})}
        />
        <TextInput
          placeholder="Enter your password"
          style={ForgotSuccessStyle.input}
          secureTextEntry={true}
          value={formData.newPass}
          onChangeText={text => setFormData({...formData, newPass: text})}
        />
        <TextInput
          placeholder="Enter your confirm password"
          style={ForgotSuccessStyle.input}
          secureTextEntry={true}
          value={formData.confirmPass}
          onChangeText={text => setFormData({...formData, confirmPass: text})}
        />
      </View>
      <Text style={ForgotSuccessStyle.success}>{success}</Text>
      <Text style={ForgotSuccessStyle.failed}>{failed}</Text>
      <TouchableOpacity
        onPress={changePassForgot}
        style={ForgotSuccessStyle.homeButton}
        disabled={loading || disabled}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={ForgotSuccessStyle.buttonText}>Reset</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgotSuccess;
