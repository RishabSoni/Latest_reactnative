import {useTheme} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../../aplushomecare/src/utils/constants';
import {InputText} from '../components/InputTypes';
import {AuthContext} from '../Contexts/AuthContext';
import {AuthScreens} from '../navigations/RootNavigator';
import {loginForm} from '../utilities/validations';
const {height, width} = Dimensions.get('window');
export default ({navigation}) => {
  const [form, setForm] = useState({
    email: 'ee',
    password: 'ee',
    isRemember: true,
  });
  const [passShow, setPassShow] = useState(false);
  const {state, setState} = useContext(AuthContext);

  const {colors} = useTheme();

  useEffect(() => {
    console.log(',------- lellow login');
  }, []);

  const onContinuePress = () => {
    const err = loginForm(form);
    if (err) {
      Alert.alert('Validation', err);
    } else {
      setState({...state, isLoggedIn: true});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={[styles.topContainer, {backgroundColor: colors.background}]}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://www.pngfind.com/pngs/m/34-349340_horizontal-white-logo-jetpack-logo-png-transparent-png.png',
              }}
              style={styles.logo}
            />
          </View>

          <View style={styles.formContainer}>
            <InputText
              placeholder={'Enter Email address'}
              leftIcon={'envelope'}
              onChangeText={x => setForm({...form, email: x})}
            />

            <InputText
              placeholder={'Enter password'}
              rightIcon={passShow ? 'eye' : 'eye-slash'}
              leftIcon={'lock'}
              secureTextEntry={passShow}
              onEyePress={() => setPassShow(!passShow)}
              onChangeText={x => setForm({...form, password: x})}
            />

            <Pressable
              onPress={() => setForm({...form, isRemember: !form.isRemember})}
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
                  name={!form.isRemember ? 'square' : 'check-square'}
                  size={18}
                />
              </View>
              <View
                style={{
                  flex: 0.9,
                  justifyContent: 'center',
                }}>
                <Text> Remember me</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.zIndexCard}>
            <Pressable onPress={onContinuePress} style={styles.button}>
              <Text style={styles.btnTxt}>Continue</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(AuthScreens.signup)}
              style={{
                flexDirection: 'row',
                marginTop: 30,
              }}>
              <Text style={{}}>Don't have an Account ? </Text>
              <Text style={{color: 'blue'}}>Register Here</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  topContainer: {
    height: height * 0.7,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.2,
    backgroundColor: 'pink',
  },
  zIndexCard: {
    backgroundColor: '#d3d3d3',
    height: height * 0.2,
    width: '100%',
    zIndex: 9,
    top: -25,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: width * 0.5,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
  },
  logoContainer: {
    height: height * 0.8 * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 25,
    margin: 25,
  },
  logo: {
    resizeMode: 'contain',
    height: 70,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
