import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Image,
  Text,
  Dimensions,
  Pressable,
  Touchable,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
const imgUri = 'https://thumbs.dreamstime.com/b/bee-flower-27533578.jpg';

import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthScreens} from '../navigations/RootNavigator';
import {APPID} from '../App';

export default ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [records, setRecords] = useState({
    search: 'demo',
    filterData: [],
  });

  const toggleSwitch = index => {
    const clone = [...records.filterData];
    console.log(clone[index]);

    if (!clone[index].number) {
      clone[index].number = true;
    } else {
      clone[index].number = false;
    }
    setRecords({
      ...records,
      filterData: clone,
    });
  };
  const {colors} = useTheme();
  const renderRow = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View
          style={{
            flex: 0.5,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <Image
            style={{
              height: 150,
              width: '100%',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              resizeMode: 'contain',
            }}
            source={{
              uri: item.image || imgUri,
            }}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: colors.background,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            justifyContent: 'space-between',
            // padding: 15,
            paddingHorizontal: 10,
            paddingBottom: 0,
            borderColor: colors.border,
            borderWidth: 1,
          }}>
          <View
            style={{
              justifyContent: 'center',
              height: 40,
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: '700',
              }}>
              {item.label}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 80,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.card,
                padding: 7,
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {item.continent}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.card,
                justifyContent: 'center',
                padding: 7,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.border,
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {item.country}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.card,
                justifyContent: 'center',
                padding: 7,
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {item.county}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              // backgroundColor: 'orange',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                //   justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Switch
                  trackColor={{false: '#767577', true: colors.primary}}
                  thumbColor={item.number ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch(index)}
                  value={item.number !== '1' && !item.number ? false : true}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Enable Now
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 25,
                  width: 100,
                  backgroundColor: colors.primary,
                }}>
                <Text
                  style={{
                    color: colors.card,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Place now
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    // fetchAddressess();
  }, []);

  const fetchAddressess = async () => {
    try {
      const url = `http://api.positionstack.com/v1/forward?access_key=654d238ad4b56887acd2858405e254a2&query=${records.search}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      setRecords({
        ...records,
        filterData: result.data,
      });
      // console.log(result, '<===result address');
    } catch (error) {
      console.log(error, '<===error address');
    }
  };

  const [dummyRecords, setDummyrecods] = useState({
    page: 0,
    data: [],
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async pageno => {
    try {
      // console.log(`https://dummyapi.io/data/v1/post?page=${pageno || 0}`, '<====dummyRecords.page');
      setLoading(true);
      const response = await fetch(
        `https://dummyapi.io/data/v1/post?page=${pageno || 0}`,
        {
          method: 'GET',
          headers: {
            'app-id': `${APPID}`,
          },
        },
      );
      const {page, total, data} = await response.json();
      // console.log(page, total, data, '<===pager result');
      setDummyrecods({
        ...dummyRecords,
        page: page,
        total: total,
        data: page <= 0 ? data : dummyRecords.data.concat(data),
      });
      setLoading(false);
    } catch (error) {
      console.log(error, '<===error');
    }
  };

  const onScroll = ({distanceFromEnd}) => {
    const {page, data, total} = dummyRecords;
    fetchData(page + 1);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            // borderWidth: 1,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthScreens.homeSafety)}
            style={[styles.commonButton, {backgroundColor: colors.primary}]}>
            <Text
              style={{
                color: colors.card,
                fontWeight: 'bold',
              }}>
              My Gigs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthScreens.addProperty)}
            style={{
              width: width * 0.45,
              padding: 10,
              borderRadius: 33,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.card,
                fontWeight: 'bold',
              }}>
              Add Property
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 0.7,
              backgroundColor: colors.card,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 33,
            }}>
            <View
              style={{
                flex: 0.85,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="search"
                style={{
                  paddingHorizontal: 15,
                  color: colors.text,
                }}
                onChangeText={x => {
                  fetchAddressess(x);
                  setRecords({
                    ...records,
                    search: x,
                  });
                }}
              />
            </View>
            <View
              style={{
                flex: 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: colors.card,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                }}>
                <Icon name={'search'} size={16} color={colors.card} />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 0.3,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                // {backgroundColor: colors.primary},
              ]}>
              <Icon name={'list'} size={25} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                // {backgroundColor: colors.primary},
              ]}>
              <Icon name={'filter'} size={25} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={dummyRecords.data}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: 15,
          }}
          onEndReached={onScroll}
          enableEmptySections={true}
          ListFooterComponent={
            <View
              style={{
                height: height * 0.2 + 50,
              }}
            />
          }
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={props => {
                console.log(props, '<======onRefreshe');
                setLoading(true);
                fetchData();
              }}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.15,
    // borderRadius: 25,
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.9,
    // backgroundColor: 'pink',
  },
  card: {
    // height: width,
    flex: 1,
    borderRadius: 25,
    // padding: 10,
    elevation: 1,
    marginBottom: 15,
  },
  commonButton: {
    width: width * 0.43,
    padding: 10,
    borderRadius: 33,
    // backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
