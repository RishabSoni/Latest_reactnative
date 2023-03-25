import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
export default ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.9,
    backgroundColor: 'orange',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    backgroundColor: 'pink',
  },
});