import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.user.data.token);

  useEffect(() => {
    setTimeout(() => {
      if (!token) navigation.replace('Home');
      if (token) navigation.replace('Drawer');
    }, 1000);
  }, [navigation, token]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#6A4029',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../assets/images/app_logo.png')} />
    </View>
  );
};

export default SplashScreen;
