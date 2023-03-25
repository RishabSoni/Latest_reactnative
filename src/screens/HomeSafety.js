import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import HomeSafetyItem from '../components/HomeSafetyItem';

export default ({}) => {
  const [que, setQue] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const seperatorComponent = () => <View style={styles.seperator} />;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <FlatList
            data={que}
            renderItem={({item, index}) => {
              return (
                <Pressable style={styles.leftHeading}>
                  <Text>{`heading ${index + 1}`}</Text>
                </Pressable>
              );
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperatorComponent}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{}}
          />
        </View>
        <View style={styles.right}>
          <FlatList
            data={que}
            renderItem={({item, index}) => (
                <HomeSafetyItem item={item} />   
            )}
            ItemSeparatorComponent={seperatorComponent}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  left: {
    flex: 0.3,
    padding: 5,
  },
  right: {
    flex: 0.7,
    padding: 5,
  },
  leftHeading: {
    padding: 7,
    borderRadius: 7,
    marginVertical: 7,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    height: 2,
    border: 0.5,
  },
});
