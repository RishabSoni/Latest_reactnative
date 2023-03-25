import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import TrackPlayer, {Event, RepeatMode, State} from 'react-native-track-player';
import {InputText} from '../components/InputTypes';

export default ({}) => {
  const [tracks, setTracks] = useState([]);
  const [player, setPlayer] = useState(State.None);
  const [selected, setSelected] = useState({
    search: '',
    song: null,
    mode: RepeatMode.Off,
  });

  useEffect(() => {
    managePlayer();
  }, []);

  let listRef = useRef({}).current;

  TrackPlayer.addEventListener('playback-state', async ({state}) => {
    // console.log(state, '<===state');
    if (state == 'playing') {
      let mode = await TrackPlayer.getRepeatMode();
      let trackIndex = await TrackPlayer.getCurrentTrack();
      const trackObject = await TrackPlayer.getTrack(trackIndex);
      setSelected({
        ...selected,
        song: trackObject,
        mode,
      });
    }
    setPlayer(state);

    return () => {
      console.log('hello state');
    };
  });

  // TrackPlayer.addEventListener('playback-track-changed', async track => {
  //   // console.log(track, '<====track');
  //   // let mode = await TrackPlayer.getRepeatMode();
  //   // let trackIndex = await TrackPlayer.getCurrentTrack();
  //   // let trackObject = await TrackPlayer.getTrack(trackIndex);
  //   // setSelected({
  //   //   ...selected,
  //   //   song: trackObject,
  //   //   mode,
  //   // });

  //   return () => {
  //     console.log('hello');
  //   };
  // });

  //   TrackPlayer.addEventListener(Event.RemotePlay, TrackPlayer.play());

  useEffect(() => {
    return () => {};
    // return subscriber;
    // return subcriber;
  });

  //   const PlaybackService = async function () {
  //     TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  //     TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  //     // ...
  //   };

  useEffect(() => {
    const position = tracks.findIndex(d => d.title === selected.song.title);
    if (position > -1) {
      // console.log(listRef,"<===listRef");
      listRef?.scrollToIndex({index: position});
    }

    return () => {};
  }, [selected]);

  useEffect(() => {
    subscriber();
    // return () => {};
  }, []);

  useEffect(() => {
    console.log(player, '<===player');
  }, [player]);

  const subscriber = async text => {
    try {
      const endpoint = 'https://deezerdevs-deezer.p.rapidapi.com/search';
      console.log(`${endpoint}?q=${text || 'atif aslam'}'`);
      const response = await fetch(`${endpoint}?q=${text || 'atif aslam'}'`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '7afb3c9032mshb1a5141f657508cp176679jsnd450af4b52ce',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      });
      const result = await response.json();
      if (result.data) {
        await TrackPlayer.add(
          [
            ...result.data.map(d => ({
              url: d.preview, // Load media from the network
              title: d.title_short,
              artist: d.artist.name,
              ...d,
            })),
          ],
          0,
        );
        const que = await TrackPlayer.getQueue();
        // await TrackPlayer.play();
        setTracks(que);
      }
      // console.log(que, '<===result');
    } catch (error) {
      console.log(error, '<===error');
    }
  };

  const managePlayer = async () => {
    try {
      const playerSetup = await TrackPlayer.setupPlayer();
      //   console.log(playerSetup, '<==playerSetup');
      //   const state = await TrackPlayer.getState();
      //   if (state === State.Playing) {
      //     console.log('The player is playing');
      //   } else {
      //     console.log(state, '<===state');
      //   }

      //   let trackIndex = await TrackPlayer.getCurrentTrack();
      //   let trackObject = await TrackPlayer.getTrack(trackIndex);
      //   console.log(`Title: ${trackObject.title}`);

      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();
      console.log(`${duration - position} seconds left.`);

      //   const ST = await TrackPlayer.getState();
      //   const que = await TrackPlayer.getQueue();
      //   console.log(que, '<===que');
      //   setPlayer(ST);
    } catch (error) {
      console.log(error, '<===managePlayer');
    }
  };

  const renderRow = ({item, index}) => {
    // console.log('https://www.deezer.com/track/' + item.md5_image);
    return (
      <Pressable
        onPress={async () => {
          await TrackPlayer.skip(index, 0);
          await TrackPlayer.play();
        }}
        style={[
          styles.card,
          selected.song?.title == item.title
            ? {backgroundColor: 'orange'}
            : null,
        ]}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.album.cover}}
            style={{
              resizeMode: 'contain',
              flex: 1,
              height: 90,
              width: 90,
              borderRadius: 25,
            }}
          />
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.trackTitle}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.1}}>
        <InputText
          leftIcon={'search'}
          onChangeText={e => {
            setSelected({
              ...selected,
              search: e,
            });
          }}
          returnKeyType={'search'}
          onSubmitEditing={async d => {
            await TrackPlayer.pause();
            // await TrackPlayer.remove(tracks);
            await subscriber(selected.search);
          }}
        />
      </View>
      <View style={{flex: 0.75}}>
        <FlatList
          data={tracks}
          ref={e => (listRef = e)}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: tracks.length,
            offset: 116 * index,
            index,
          })}

          // initialScrollIndex={}
        />
      </View>
      <View
        style={{
          flex: 0.15,
          backgroundColor: 'pink',
          borderRadius: 7,
        }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {player == 'playing' ? (
            <>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: selected.song?.album.cover}}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{selected.song?.title}</Text>
              </View>
              <Pressable
                onPress={() => {
                  if (selected.mode == RepeatMode.Queue) {
                    setSelected({
                      ...selected,
                      mode: RepeatMode.Off,
                    });
                    TrackPlayer.setRepeatMode(RepeatMode.Off);
                  } else if (selected.mode == RepeatMode.Track) {
                    setSelected({
                      ...selected,
                      mode: RepeatMode.Queue,
                    });
                    TrackPlayer.setRepeatMode(RepeatMode.Queue);
                  } else {
                    setSelected({
                      ...selected,
                      mode: RepeatMode.Track,
                    });
                    TrackPlayer.setRepeatMode(RepeatMode.Track);
                  }
                }}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  {selected.mode == RepeatMode.Off
                    ? 'off'
                    : selected.mode == RepeatMode.Queue
                    ? 'repeat que'
                    : 'current'}
                </Text>
              </Pressable>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>shuffle</Text>
              </View>
            </>
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            backgroundColor: 'pink',
            // borderRadius: 7,
          }}>
          <Pressable
            onPress={async () => await TrackPlayer.skipToPrevious()}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Prev</Text>
          </Pressable>
          <Pressable
            disabled={tracks.length < 0}
            onPress={async () => {
              player == State.Playing
                ? await TrackPlayer.pause()
                : await TrackPlayer.play();
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>
              {player == 'paused' || player == 'playing' ? player : 'Start'}
            </Text>
          </Pressable>
          <Pressable
            onPress={async () => await Promise.all(TrackPlayer.skipToNext())}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  card: {
    height: 100,
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 7,
    marginHorizontal: 7,
  },
  imgContainer: {
    flex: 0.25,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    flex: 0.75,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  trackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
