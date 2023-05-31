import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getHistory, deleteHistory} from '../../utils/axios/https/allAxios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
const History = () => {
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const userStore = useSelector(state => state.user);
  const token = userStore.data.token;

  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await getHistory(token);
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
          Your History Is Empty
        </Text>
      </View>
    );
  }
  const handleDelete = itemId => {
    deleteHistory(token, itemId)
      .then(response => {
        console.log(response);
        navigation.replace('History');
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

  console.log(data);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f5f5f8'}}>
      <Text
        style={{
          fontFamily: 'Poppins-Black',
          fontSize: 34,
          color: 'black',
          paddingLeft: 50,
        }}>
        Order History
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
          swipe an item to delete
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
                  source={require('../../assets/images/trash.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ))}
      <Text style={{textAlign: 'center', marginBottom: 20, marginTop: 20}}>
        You Have No History Left
      </Text>
    </ScrollView>
  );
};

export default History;
