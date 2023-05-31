import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import {Image, TouchableOpacity} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/Redux/store';

import EditProduct from './src/screens/Products/EditProduct';
import Home from './Home';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Auth from './src/screens/Auth/Auth';
import Forgot from './src/screens/Auth/Forgot';
import ForgotSuccess from './src/screens/Auth/ForgotSuccess';
import HomePage from './src/screens/HomePage/HomePage';
import Coffee from './src/screens/Products/Coffee';
import NonCoffee from './src/screens/Products/NonCoffe';
import Food from './src/screens/Products/Food';
import ProductDetail from './src/screens/Products/ProductDetail';
import AddOn from './src/screens/Products/AddOn';
import Cart from './src/screens/Payment/Cart';
import Delivery from './src/screens/Payment/Delivery';
import Payment from './src/screens/Payment/Payment';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/Profile/Edit';
import Favorite from './src/screens/Products/Favorite';
import AllMenu from './src/screens/Products/AllMenu';
import History from './src/screens/Profile/History';
import NewProduct from './src/screens/Products/NewProduct';
import CreatePromo from './src/screens/Promo/CreatePromo';
import SplashScreen from './src/screens/Splash/SplashScreen';
import ManageOrder from './src/screens/Admin/ManageOrder';
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const screenOptions = ({navigation}) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{marginLeft: 54, paddingTop: 74}}>
        <Image source={require('./src/assets/images/hamburger.png')} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{marginRight: 41, paddingTop: 74}}>
        <Image source={require('./src/assets/images/shop.png')} />
      </TouchableOpacity>
    ),
  });

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={screenOptions}>
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: '',
          headerStyle: {backgroundColor: '#efefef'},
        }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  const screenOptions = ({navigation}) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{marginLeft: 54, paddingTop: 74}}>
        <Image source={require('./src/assets/images/hamburger.png')} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{marginRight: 41, paddingTop: 74}}>
        <Image source={require('./src/assets/images/shop.png')} />
      </TouchableOpacity>
    ),
  });

  return (
    <Navigator>
      <Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="Auth"
        component={Auth}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="Register"
        component={Register}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="Forgot"
        component={Forgot}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="ForgotSuccess"
        component={ForgotSuccess}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Coffee',
          headerStyle: {backgroundColor: '#eeeeee'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
        }}
        name="Coffee"
        component={Coffee}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Non Coffee',
          headerStyle: {backgroundColor: '#eeeeee'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
        }}
        name="NonCoffee"
        component={NonCoffee}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Favorite Products',
          headerStyle: {backgroundColor: '#eeeeee'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
        }}
        name="Favorite"
        component={Favorite}
      />
      <Screen
        options={{
          headerShown: true,
        }}
        name="AddOn"
        component={AddOn}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Food',
          headerStyle: {backgroundColor: '#eeeeee'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
        }}
        name="Food"
        component={Food}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'All Menu',
          headerStyle: {backgroundColor: '#eeeeee'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
        }}
        name="AllMenu"
        component={AllMenu}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'My Cart',
          headerStyle: {backgroundColor: '#f5f5f8'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
          headerTitleAlign: 'center',
        }}
        name="Cart"
        component={Cart}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Checkout',
          headerStyle: {backgroundColor: '#f5f5f8'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
          headerTitleAlign: 'center',
        }}
        name="Delivery"
        component={Delivery}
      />
      <Screen
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerStyle: {backgroundColor: '#f5f5f8'},
          headerTitleStyle: {fontFamily: 'Poppins-Black', fontSize: 17},
          headerTitleAlign: 'center',
        }}
        name="Edit"
        component={EditProfile}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="Payment"
        component={Payment}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="NewProduct"
        component={NewProduct}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="NewPromo"
        component={CreatePromo}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="Profile"
        component={Profile}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="History"
        component={History}
      />
      <Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#f5f5f8'},
        }}
        name="ManageOrder"
        component={ManageOrder}
      />
      <Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 54, paddingTop: 74}}>
              <Image source={require('./src/assets/images/panah.png')} />
            </TouchableOpacity>
          ),
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#efefef'},
        })}
      />
      <Screen
        name="EditProduct"
        component={EditProduct}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 54, paddingTop: 74}}>
              <Image source={require('./src/assets/images/panah.png')} />
            </TouchableOpacity>
          ),
          headerShown: true,
          title: '',
          headerStyle: {backgroundColor: '#efefef'},
        })}
      />
      <Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Router;
