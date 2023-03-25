import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {AuthScreens} from '../navigations/RootNavigator';
// import VideoPlayer from 'react-native-video-controls';
import {videosData} from '../utilities/contants';

const {width, height} = Dimensions.get('window');

export default ({navigation}) => {
  const renderRow = ({item}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate(AuthScreens.audioPlayer, item)}
        style={styles.itemCard}>
        <Image style={styles.img} source={{uri: videosData[0].thumbnailUrl}} />
      </Pressable>
    );
  };

  useEffect(() => {
    // console.log('player screen', videosData);
  }, []);

  return (
    <View styles={styles.mainContainer}>
      <FlatList
        data={videosData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  itemCard: {
    height: width / 2,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: 'pink',
    marginTop: 10,
    borderRadius: 15,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});
