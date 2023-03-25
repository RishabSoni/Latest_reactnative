import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputSelect, InputText} from '../components/InputTypes';
// import Slider from './components/Slider';
import {states} from '../utilities/contants';
import {AgentForm} from '../utilities/validations';
import SnackBar from '../components/SnackBar';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../Contexts/AuthContext';
import {color} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const Signup = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [img, setImg] = useState([]);
  const [codeFromURL, setCodeFromURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [errorVisible, setErrorVisible] = useState({
    visible: false,
    message: '',
  });
  const [form, setForm] = useState({
    list: null,
    state: null,
    agentDetails: [{state: null, lic: '', visible: false}],
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    password: '',
    mlsIds: [{id: ''}],
    role: {selected: '', visible: false},
    companyEin: '',
    companyName: '',
    website: '',
    googleReview: '',
    rememberMe: false,
  });
  const {colors} = useTheme();

  const backgroundStyle = {
    backgroundColor: colors.card,
    flex: 1,
  };

  const manageLongString = str => {
    return str.length > 35 ? `${str.substr(0, 32)}...` : str;
  };

  const onContinuePress = () => {
    const err = AgentForm(form);

    if (err) {
      console.log(err, '<==err');
      setErrorVisible({
        visible: true,
        message: err,
      });
    }
  };

  const {state} = useContext(AuthContext);

  useEffect(() => {
    console.log('Sign up screen');
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
        <View
          style={{
            height: height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor : 'yellow'
          }}>
          <Image
            source={{
              uri: 'https://www.pngfind.com/pngs/m/34-349340_horizontal-white-logo-jetpack-logo-png-transparent-png.png',
            }}
            style={{
              resizeMode: 'contain',
              height: 70,
              width: '100%',
            }}
          />
        </View>
        {/* <Slider /> */}

        <InputText
          leftIcon={'user'}
          placeholder={'Enter First Name'}
          onChangeText={x => setForm({...form, fname: x})}
          error={!form.fname}
        />

        <InputText
          leftIcon={'user'}
          placeholder={'Enter Last Name'}
          onChangeText={x => setForm({...form, lname: x})}
          error={!form.lname}
        />
        <InputText
          leftIcon={'envelope'}
          placeholder={'Enter email'}
          onChangeText={x => setForm({...form, email: x})}
          error={!form.email}
        />
        <InputText
          leftIcon={'lock'}
          rightIcon={passShow ? 'eye' : 'eye-slash'}
          secureTextEntry={!passShow}
          onEyePress={() => setPassShow(!passShow)}
          placeholder={'Enter Password'}
          onChangeText={x => setForm({...form, password: x})}
          error={!form.password}
        />

        <InputSelect
          value={form.role?.selected?.value || form.role?.selected}
          onPress={() => {
            setForm({
              ...form,
              role: {...form.role, visible: true},
            });
          }}
          error={!(form.role?.selected.value || form.role?.selected)}
          list={[{title: 'Vendor'}, {title: 'Agent'}]}
          onDone={selected => {
            setForm({
              ...form,
              role: {...form.role, selected, visible: false},
            });
          }}
          rightIcon={'caret-down'}
          leftIcon={'user'}
          visible={form.role.visible}
        />

        {form.role?.selected?.value === 'Agent' ||
        form.role?.selected === 'Agent' ? (
          <View>
            {form.mlsIds.map((item, i) => {
              const clone = [...form.mlsIds];
              return (
                <View style={styles.inputCard} key={i.toString()}>
                  <InputText
                    placeholder={'Enter MLS ID'}
                    onChangeText={x => {
                      clone[i].id = x;
                      setForm({...form, mlsIds: clone});
                    }}
                    leftIcon={'map-pin'}
                    error={!item.id}
                    value={item.id}
                  />
                  <Pressable
                    onPress={() => {
                      if (form.mlsIds.length - 1 == i) {
                        clone.push({
                          id: '',
                        });
                        setForm({
                          ...form,
                          mlsIds: clone,
                        });
                      } else {
                        clone.splice(form.mlsIds.length - 1, 1);
                        setForm({
                          ...form,
                          mlsIds: clone,
                        });
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginRight: 15,
                      padding: 7,
                      justifyContent: 'space-around',
                      borderRadius: 5,
                      width: 70,
                      borderWidth: 0.5,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        name={form.mlsIds.length - 1 == i ? 'plus' : 'minus'}
                        size={18}
                      />
                    </View>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>Add</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
            {/* {console.log(form.agentDetails.length, 'lomemem')} */}
            {form.agentDetails.map((data, i) => {
              const clone = [...form.agentDetails];
              return (
                <View style={styles.inputCard} key={i.toString()}>
                  <InputText
                    onChangeText={x => {
                      clone[i].lic = x;
                      console.log(clone, '<====changed state lic');
                      setForm({...form, agentDetails: clone});
                    }}
                    leftIcon={'vcard'}
                    error={!data.lic}
                    placeholder={'Agent Licence no'}
                    value={data.lic}
                  />
                  <InputSelect
                    value={
                      Platform.OS == 'ios' ? data.state?.value : data.state
                    }
                    onPress={() => {
                      clone[i].visible = true;
                      setForm({...form, agentDetails: clone});
                    }}
                    list={states.map(data => ({
                      title: data.name,
                      value: data.value,
                    }))}
                    onDone={selected => {
                      clone[i].state = selected;
                      clone[i].visible = false;
                      setForm({...form, agentDetails: clone});
                    }}
                    error={
                      !(data.state || data.state?.value) ||
                      data.state == 'Select any one'
                    }
                    rightIcon={'caret-down'}
                    leftIcon={'map-marker'}
                    visible={data.visible}
                  />

                  <Pressable
                    onPress={() => {
                      if (form.agentDetails.length - 1 == i) {
                        clone.push({
                          state: 'Select any one',
                          lic: '',
                          visible: false,
                        });
                        setForm({
                          ...form,
                          agentDetails: clone,
                        });
                      } else {
                        clone.splice(form.agentDetails.length - 1, 1);
                        setForm({
                          ...form,
                          agentDetails: clone,
                        });
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginRight: 15,
                      padding: 7,
                      justifyContent: 'space-around',
                      borderRadius: 5,
                      width: 70,
                      borderWidth: 0.5,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        name={
                          form.agentDetails.length - 1 == i ? 'plus' : 'minus'
                        }
                        size={18}
                      />
                    </View>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>Add</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <InputText
              leftIcon={'building'}
              placeholder={'Enter Company name'}
              error={!form.companyName}
              onChangeText={x => setForm({...form, companyName: x})}
            />
            <InputText
              leftIcon={'address-book'}
              placeholder={'Enter Company EIN'}
              error={!form.companyEin}
              onChangeText={x => setForm({...form, companyEin: x})}
            />
            <InputText
              leftIcon={'globe'}
              placeholder={'Enter Website'}
              error={!form.website}
              onChangeText={x => setForm({...form, website: x})}
            />
            <InputText
              leftIcon={'google'}
              placeholder={'Enter Google/ Review'}
              error={!form.googleReview}
              onChangeText={x => setForm({...form, googleReview: x})}
            />
          </View>
        )}

        <Pressable
          onPress={() => setForm({...form, rememberMe: !form.rememberMe})}
          style={{
            width: width * 0.5,
            flexDirection: 'row',
            margin: 15,
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={!form.rememberMe ? 'square' : 'check-square'}
              size={18}
              color={form.rememberMe ? colors.primary : colors.border}
            />
          </View>
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.primary}}> Remember me</Text>
          </View>
        </Pressable>

        <View
          style={{
            height: height * 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={onContinuePress}
            style={{
              height: 50,
              width: width / 2,
              borderRadius: 35,
              backgroundColor: 'rgb(54, 75, 154)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.text,
              }}>
              Continue
            </Text>
          </Pressable>
        </View>

        <SnackBar
          icon={'close'}
          message={errorVisible.message}
          modalVisible={errorVisible.visible}
          onClose={() => {
            setTimeout(() => {
              setErrorVisible({
                visible: false,
                // message: '',
              });
            }, 1000);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  inputCard: {
    // backgroundColor: 'pink',
    // marginHorizontal : 10
  },
});

export default Signup;
