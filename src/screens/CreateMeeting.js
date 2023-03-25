import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import {DateTimeSelect, InputSelect, InputText} from '../components/InputTypes';
const {height, width} = Dimensions.get('window');
export default ({}) => {
  const [form, setForm] = useState({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    desc: '',
  });

  const onContinuePress = () => {};
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <DateTimeSelect value={'abc'} />

          <DateTimeSelect
            value={new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
            })}
            leftIcon={'calendar'}
            rightIcon={'caret-down'}
          />

          <DateTimeSelect
            value={new Date().toTimeString()}
            leftIcon={'clock-o'}
            rightIcon={'caret-down'}
          />

          <DateTimeSelect
            value={new Date().toTimeString()}
            leftIcon={'calendar'}
            rightIcon={'caret-down'}
          />

          <DateTimeSelect
            value={new Date().toTimeString()}
            leftIcon={'clock-o'}
            rightIcon={'caret-down'}
          />

          <InputText
            value={form.desc}
            onChangeText={x => setForm({...form, desc: x})}
            placeholder={'Enter Description'}
            height={70}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.zIndexCard}>
            <Pressable onPress={onContinuePress} style={styles.button}>
              <Text style={styles.btnTxt}>Continue</Text>
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
  },
  topContainer: {
    height: height * 0.7,
    backgroundColor: 'orange',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.3,
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
});
