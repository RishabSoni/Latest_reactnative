import {useTheme} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {AuthContext} from '../Contexts/AuthContext';

export const MyStatusBar = ({backgroundColor,backgroundStyle, ...props}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {backgroundColor: 'red', height: StatusBar.currentHeight},
      ]}>
      <StatusBar barStyle={backgroundStyle} backgroundColor={'red'}  translucent {...props} />
    </View>
  );
};
