import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {usersAction} from './src/Redux/slices/users';
import {cartAction} from './src/Redux/slices/cart';
import {LogBox} from 'react-native';

const DrawerContent = ({navigation}) => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  const image = userStore.data?.userData?.image;
  const display_name = userStore.data?.userData?.display_name;
  const email = userStore.data?.userData?.email;
  const role = userStore.data?.userData?.role_id;

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    navigation.replace('Home');
    dispatch(usersAction.logout());
    dispatch(cartAction.resetCart());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.imagez}
          source={
            image !== null
              ? {uri: image}
              : require('./src/assets/images/default.png')
          }
        />
        <Text style={styles.text}>{display_name}</Text>
        <Text style={styles.text2}>{email}</Text>
      </View>
      <DrawerContentScrollView>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Profile')}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/profile.png')}
          />
          <Text style={styles.drawerItemText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            role === 2
              ? navigateToScreen('ManageOrder')
              : navigateToScreen('Cart');
          }}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/cart.png')}
          />
          <Text style={styles.drawerItemText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('AllMenu')}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/allmenu.png')}
          />
          <Text style={styles.drawerItemText}>All menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Home')}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/privacy.png')}
          />
          <Text style={styles.drawerItemText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Home')}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/secury.png')}
          />
          <Text style={styles.drawerItemText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
          <Image
            style={styles.image2}
            source={require('./src/assets/images/Arrow.png')}
          />
          <Text style={styles.drawerItemText}>Sign-out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 100,
  },
  imagez: {
    borderRadius: 100,
    width: 130,
    height: 130,
  },
  image2: {
    marginTop: 2,
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-Black',
    fontSize: 17,
  },
  text2: {
    color: 'white',
    fontFamily: 'Poppins-Reguler',
    fontSize: 15,
  },
  header: {
    backgroundColor: '#6A4029',
    alignItems: 'center',
    height: 250,
    paddingTop: 47,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerItem: {
    flexDirection: 'row',
    marginLeft: 42,
    marginTop: 30,
  },
  drawerItemText: {
    width: '70%',
    fontSize: 17,
    color: '#6A4029',
    fontFamily: 'Poppins-Black',
    borderBottomWidth: 0.3,
    borderBottomColor: '#6A4029',
    marginLeft: 13,
    paddingBottom: 30,
  },
});

export default DrawerContent;
