import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, ActivityIndicator} from 'react-native';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

export default ({route, navigation}) => {
  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );
  const [comments, setComment] = useState([]);


  useEffect(() => {
    console.log(route.params.videoUrl, "<====uri");
    return () => {}
  }, [])

  useEffect(() => {
    Orientation.lockToPortrait();
    // console.log(orientation, Orientation.getInitialOrientation());
    // Orientation.addOrientationListener();
    setOrientation(Orientation.getInitialOrientation());
    // return Orientation.removeOrientationListener();
  }, []);

  useEffect(() => {
    // Orientation.getInitialOrientation();

    Orientation.addOrientationListener(d => {
      console.log(d, '<===add ');
    });

    return Orientation.removeOrientationListener(d => {
      console.log(d, '<===remove ');
    });
  }, []);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/comments',
        );
        const result = await response.json();
        setComment(result);
        // console.log(result, '<===comment result');
      } catch (error) {
        console.log(error, '<===comment erro');
      }
    };

    fn();

    return () => {};
  }, []);

  const _orientationDidChange = orientation => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  };

  const player = useRef().current;

  const manageHeight = () => (orientation == 'PORTRAIT' ? height / 3 : height);
  // console.log(route.params.videoUrl, '<==== manageHeight()');
  return orientation == 'LANDSCAPE' ? (
    <VideoPlayer
      ref={player}
      source={{uri: route.params.videoUrl.toString()}}
      // navigator={navigation}
      onBack={() => {
        Orientation.lockToPortrait();
        navigation.goBack();
      }}
      // fullscreen={false}
      onEnterFullscreen={() => {
        Orientation.lockToLandscape();
        setOrientation('LANDSCAPE');
      }}
      onExitFullscreen={() => {
        Orientation.lockToPortrait();
        setOrientation('PORTRAIT');
      }}
      onError={err => console.log(err, '<===load video')}
      controls={true}
    />
  ) : (
    <View style={styles.mainContainer}>
      <View style={{flex: 0.5}}>
        {/* <VideoPlayer
          ref={player}
          source={{uri: route.params.videoUrl}}
          onReadyForDisplay={e => {
            console.log(e, "<===noteacy");
          }}
          navigator={navigation}
          // fullscreen={false}
          onEnterFullscreen={() => {
            Orientation.lockToLandscape();
            setOrientation('LANDSCAPE');
          }}
          onExitFullscreen={() => {
            Orientation.lockToPortrait();
            setOrientation('PORTRAIT');
          }}
          onLoad={e =>  {
            console.log(e, "<==onload");
          }}
          showHours={true}
          controls={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
        /> */}
        {
          route.params.videoUrl ?
          <Video
          onEnd={e => {
            console.log(e, "<===");
          }}
          onLoad={e => {
            console.log(e, "<===");
          }}
          onLoadStart={e => {
            console.log(e, "<===");
          }}
          onProgress={e => {
            console.log(e, "<===");
          }}
          // paused={paused}
          ref={player}
          resizeMode={'content'}
          onFullScreen={orientation !== 'PORTRAIT'}
          source={{
            uri : route.params.videoUrl,
            // uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
          volume={10}
        /> : <ActivityIndicator size={'large'} />}
      </View>
      <View style={{flex: 0.5}}>
        <FlatList
          data={comments}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.title}>{item.body}</Text>
              </View>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.1,
                  }}>
                  <Icon name={'user-o'} />
                </View>
                <View style={{justifyContent: 'center', flex: 0.9}}>
                  <Text style={styles.time}>{item.email}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: 10,
          }}
          ListFooterComponent={<View style={{height: 50}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
  player: {
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // width,
    // height: height / 2,
  },
  card: {
    height: 'auto',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
    padding: 10,
    // marginHorizontal : 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 13,
    opacity: 0.4,
  },
});
