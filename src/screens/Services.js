import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  Platform,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default ({}) => {
  const onContinuePress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Lehho Services</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.zIndexCard}>
          <Pressable onPress={onContinuePress} style={styles.button}>
            <Text style={styles.btnTxt}>Continue</Text>
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
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.3,
    backgroundColor: 'pink',
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
    backgroundColor: '#f3f3f3',
    ...Platform.select({
      ios: {},
      android: {elevation: 5},
    }),
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
