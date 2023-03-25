import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
export default ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Lehho Bids</Text>
      </View>
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
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    backgroundColor: 'pink',
  },
});
