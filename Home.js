import React, {useEffect} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Homestyles from './src/screens/Styles/Home';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
const Home = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const token = useSelector(state => state.user.data.token);

  useEffect(() => {
    if (token) navigation.replace('Drawer');
  }, [token]); // Menambahkan token sebagai dependensi useEffect

  if (token) {
    return null; // Mengembalikan null jika token tersedia untuk mencegah rendering page HOME
  }

  return (
    <ScrollView style={Homestyles.homeAll}>
      <Text style={Homestyles.homeText}>Coffee for Everyone</Text>
      <Image
        style={Homestyles.homeImage}
        source={require('./src/assets/images/homebg.png')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Auth')}
        style={Homestyles.homeButton}>
        <Text style={Homestyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
