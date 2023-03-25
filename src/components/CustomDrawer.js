import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Switch,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer} from 'react-native-paper';
import {DrawerScreens} from '../navigations/DrawerNavigator';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../Contexts/AuthContext';

const {width, height} = Dimensions.get('window');

export default ({state, navigation, descriptors}) => {
  const context = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(
    context.state.theme == 'dark' ? true : false,
  );
  const [activeOption, setActiveOption] = useState([]);

  let oldGroup = '';
  let newGroup = true;
  const {colors} = useTheme();

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(context, '<===theme');
    context.setState({
      ...context.state,
      //   isLoggedIn: context.state.isLoggedIn,
      theme: context.state.theme == 'dark' ? 'light' : 'dark',
    });
  };

  const toggleMenu = itm => {
    if (activeOption.includes(itm)) {
      const clone = [...activeOption];
      const index = clone.findIndex(d => d == itm);
      clone.splice(index, 1);
      setActiveOption(clone);
    } else {
      activeOption.push(itm);
      setActiveOption([...activeOption]);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      {/* ... drawer contents */}
      <View style={styles.closeContainer}>
        <Pressable
          style={styles.closeIcon}
          onPress={() => navigation.closeDrawer()}>
          <Icon name="close" color={colors.primary} size={25} />
        </Pressable>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userImgContainer}>
          <View style={[styles.userBg, {backgroundColor: colors.primary}]}>
            <Icon name="user" color={colors.background} size={45} />
          </View>
        </View>
        <View style={styles.usernameEmail}>
          <Text style={[styles.username, {color: colors.primary}]}>
            Rishab Soni
          </Text>
          <Text style={[styles.email, {color: colors.primary}]}>
            RishabSoni511@gmail.com
          </Text>
        </View>
      </View>
      <View style={styles.restContainer}>
        <ScrollView>
          {state.routes.map((item, i) => {
            const {parentLabel, childLabel} = descriptors[item.key].options;

            if (oldGroup !== parentLabel) {
              oldGroup = parentLabel;
              newGroup = true;
            } else {
              newGroup = false;
            }

            return !parentLabel ? (
              <Pressable
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [item],
                  });
                }}
                key={i}
                style={styles.row}>
                <View
                  style={[
                    styles.iconContainer,
                    styles.alignVerticalHorizontal,
                  ]}>
                  <Icon color={colors.primary} name="home" size={18} />
                </View>
                <View style={[{flex: 0.9}, styles.alignVerticalHorizontal]}>
                  <Text style={{color: colors.primary}}>{childLabel}</Text>
                </View>
              </Pressable>
            ) : (
              <View key={i}>
                {newGroup ? (
                  <View key={i}>
                    <Pressable
                      style={styles.row}
                      onPress={() => toggleMenu(parentLabel)}>
                      <View
                        style={[
                          styles.iconContainer,
                          styles.alignVerticalHorizontal,
                        ]}>
                        <Icon color={colors.primary} name="home" size={18} />
                      </View>
                      <View
                        style={[
                          styles.labelContainer,
                          styles.alignVerticalHorizontal,
                        ]}>
                        <Text style={{color: colors.primary}}>
                          {parentLabel}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.iconContainer,
                          {alignItems: 'flex-end'},
                          styles.alignVerticalHorizontal,
                        ]}>
                        <Icon
                          color={colors.primary}
                          name="caret-down"
                          size={18}
                        />
                      </View>
                    </Pressable>
                  </View>
                ) : null}
                {activeOption.includes(parentLabel) && (
                  <Pressable
                    onPress={() => {
                      navigation.reset({
                        index: 0,
                        routes: [item],
                      });
                    }}
                    style={[styles.row]}>
                    <View
                      style={[
                        styles.iconContainer,
                        styles.alignVerticalHorizontal,
                      ]}
                    />
                    <View
                      style={[
                        styles.labelContainer,
                        styles.alignVerticalHorizontal,
                        {borderBottomWidth: 1},
                      ]}>
                      <Text style={{color: colors.primary}}>{childLabel}</Text>
                    </View>
                    <View
                      style={[
                        styles.iconContainer,
                        styles.alignVerticalHorizontal,
                        {borderBottomWidth: 1},
                      ]}
                    />
                  </Pressable>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.row}>
          <View style={[styles.iconContainer, styles.alignVerticalHorizontal]}>
            <Icon name="home" color={colors.primary} size={18} />
          </View>
          <View style={[styles.labelContainer, styles.alignVerticalHorizontal]}>
            <Text style={{color: colors.primary}}>{'Theme toggle'}</Text>
          </View>
          <View
            style={[
              styles.iconContainer,
              {alignItems: 'flex-end'},
              styles.alignVerticalHorizontal,
            ]}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.row}
          onPress={() => {
            context.setState({
              ...context.state,
              isLoggedIn: false,
              // theme: context.state.theme,
            });
          }}>
          <View style={[styles.iconContainer, styles.alignVerticalHorizontal]}>
            <Icon name="home" color={colors.primary} size={18} />
          </View>
          <View style={[styles.labelContainer, styles.alignVerticalHorizontal]}>
            <Text style={{color: colors.primary}}>{'Logout'}</Text>
          </View>
          <View
            style={[
              styles.iconContainer,
              {alignItems: 'flex-end'},
              styles.alignVerticalHorizontal,
            ]}>
            <Icon name="sign-out" color={colors.primary} size={18} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  closeContainer: {
    height: height * 0.07,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    height: height * 0.12,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 25,
  },
  userImgContainer: {
    flex: 0.2,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userBg: {
    height: 70,
    width: 70,
    borderRadius: 35,

    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameEmail: {
    flex: 0.8,
    // alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  email: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  username: {
    fontSize: 22,

    // fontWeight: 'bold',
  },
  restContainer: {
    height: height * 0.5,
    // backgroundColor: 'cyan',
    paddingHorizontal: 15,
  },
  bottomContainer: {
    height: height * 0.3,
    // backgroundColor: 'pink',
    paddingHorizontal: 15,
  },
  alignVerticalHorizontal: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    // width: width / 2,
    padding: 7,
    height: 50,
  },
  labelContainer: {
    flex: 0.8,
  },
  iconContainer: {
    flex: 0.1,
  },
});
