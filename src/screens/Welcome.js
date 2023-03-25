import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import Slider from '../components/Slider';
import {AuthScreens} from '../navigations/RootNavigator';
const {height, width} = Dimensions.get('window');
export default ({navigation}) => {
  const [form, setForm] = useState({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  });

  const onContinuePress = () => {
    navigation.navigate(AuthScreens.login);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Slider />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.7,
    // backgroundColor: 'orange',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.3,
    // backgroundColor: 'pink',
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
  inputStyle: {},
});
