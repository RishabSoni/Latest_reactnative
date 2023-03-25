import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Dimensions, Image, Animated} from 'react-native';

const {width, height} = Dimensions.get('window');
const imgUri = 'https://thumbs.dreamstime.com/b/bee-flower-27533578.jpg';
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export default ({}) => {
  const [data, setData] = useState([
    {key: 'left-spacer'},
    {imgUri},
    {imgUri},
    {imgUri},
    {imgUri},
    {key: 'right-spacer'},
  ]);
  const flat = useRef();
  const [index, setIndex] = useState(2);
  const scrollX = useRef(new Animated.Value(0)).current;

  const {colors} = useTheme();

  useEffect(() => {
    let timer = setTimeout(() => {
      setIndex(index < data.length - 1 ? index + 1 : 0);
      flat.current.scrollToIndex({index: index, animated: true});
    }, 2000);
    return () => clearTimeout(timer);
  });

  const renderData = ({item, index}) => {
    if (!item.imgUri) {
      return <View style={{width: SPACER_ITEM_SIZE}} />;
    }

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });

    return (
      <View style={{width: ITEM_SIZE}}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            alignItems: 'center',
            transform: [{translateY}],
          }}>
          <Image
            source={{
              uri: imgUri,
            }}
            style={styles.img}
          />
        </Animated.View>
      </View>
    );
  };

  const Indicator = ({count, active}) => {
    return data.map((item, i) => {
      const color = active === i ? colors.primary : colors.text;
      const radio = {
        margin: 5,
        height: 15,
        width: 15,
        backgroundColor: color,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
      };
      if (i == 0 || i == data.length - 1) {
        return null;
      }
      return <View key={i.toString()} style={radio} />;
    });
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        initialScrollIndex={index}
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        ref={flat}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderData}
      />
      <View style={styles.radioContainer}>
        <Indicator count={data.length - 2} active={index} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.6,
    justifyContent: 'space-between',
  },
  img: {
    resizeMode: 'stretch',
    height: (height * 0.7) / 2,
    width: '100%',
    borderRadius: 34,
  },
  radioContainer: {
    height: height * 0.6 * 0.2,
    width: width,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
