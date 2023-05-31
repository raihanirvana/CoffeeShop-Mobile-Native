import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SignLogin from '../Styles/SignLogin';
import {LogBox} from 'react-native';
const Auth = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  return (
    <ScrollView style={SignLogin.homeAll}>
      <Text style={SignLogin.homeText}>Welcome!</Text>
      <Text style={SignLogin.spanText}>
        Get a cup of coffee for free only for new user
      </Text>
      <View style={SignLogin.Image}>
        <Image
          style={SignLogin.homeImage}
          source={require('../../assets/images/signlogin.png')}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={SignLogin.homeButton}>
        <Text style={SignLogin.buttonText}>Create New Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={SignLogin.homeButton2}>
        <Text style={SignLogin.buttonText2}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Auth;
