import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  getManageOrder,
  patchManageOrder,
} from '../../utils/axios/https/allAxios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
const ManageOrder = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const userStore = useSelector(state => state.user);
  const token = userStore.data.token;
  const status_id = 3;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      try {
        const response = await getManageOrder();
        setData(response.data.history);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, []);
  if (data.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#f5f5f8',
        }}>
        <Image source={require('../../assets/images/histori.png')} />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            color: 'black',
          }}>
          There are no more orders to be managed.
        </Text>
      </View>
    );
  }
  const handleDelete = itemId => {
    patchManageOrder(itemId, status_id)
      .then(response => {
        console.log(response);
        navigation.replace('ManageOrder');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const ids = data.map(item => item.id).join(',');
  console.log(ids);
  const handleAll = () => {
    patchManageOrder(ids, status_id)
      .then(response => {
        console.log(response);
        navigation.replace('ManageOrder');
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f5f5f8'}}>
      <Text
        style={{
          fontFamily: 'Poppins-Black',
          fontSize: 34,
          color: 'black',
          paddingLeft: 50,
        }}>
        Customer Order
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 35,
          gap: 10,
        }}>
        <Image source={require('../../assets/images/click.png')} />
        <Text style={{color: 'black', fontSize: 10}}>
          swipe an item when its done
        </Text>
      </View>
      {data.map(item => (
        <ScrollView
          key={item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 50,
            }}>
            <View
              style={{
                marginTop: 22,
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 102,
                width: 315,
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <View style={{marginLeft: 17}}>
                <Image
                  style={{width: 70, height: 70, borderRadius: 100}}
                  source={{uri: item.image}}
                />
              </View>
              <View style={{marginLeft: 19}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Black',
                    fontSize: 17,
                    color: 'black',
                  }}>
                  {item.product_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: '#895537',
                  }}>
                  IDR {item.price}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 10,
                    color: '#895537',
                  }}>
                  {item.status_name}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <View
                style={{
                  backgroundColor: '#6A4029',
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginLeft: 47,
                  marginRight: 50,
                }}>
                <Image
                  style={{width: 14, height: 16}}
                  source={require('../../assets/images/check.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ))}
      <TouchableOpacity
        onPress={handleAll}
        style={{
          width: 320,
          height: 70,
          backgroundColor: 'white',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontFamily: 'Poppins-Black',
            textAlign: 'center',
          }}>
          Mark all as done
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ManageOrder;
