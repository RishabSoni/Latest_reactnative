import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import DrawerNavigator from './DrawerNavigator';
import list from '../screens/List';
import CreateBid from '../screens/CreateBid';
import CreateMeeting from '../screens/CreateMeeting';
import List from '../screens/List';
import {
  FeedbackNavigaor,
  HomeNavigtor,
  ManageNavigator,
  PlayerNavigator,
  ProfileNavigaor,
  SettingsNavigaor,
} from './RootNavigator';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');
const TabScreens = {
  home: 'Dashbord',
  setting: 'Setting',
  profile: 'Profile',
  feedback: 'Feedback',
  createBid: 'CreateBid',
  bidsList: 'List',
  createMeeting: 'CreateMeeting',
  meetingList: 'MeetingList',
  player: 'Player List',
};

export const HomeTab = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === TabScreens.home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === TabScreens.setting) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === TabScreens.profile) {
            iconName = !focused ? 'person-circle-outline' : 'person-circle';
          } else {
            iconName = 'tv';
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                // backgroundColor: 'red',
                height: route.name === TabScreens.setting ? 70 : 50,
                borderRadius: route.name === TabScreens.setting ? 50 : 0,
                width: route.name === TabScreens.setting ? 70 : width * 0.33,
                // margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 1,
              }}>
              <Icon color={color} name={iconName} size={18} />
            </View>
          );
        },
        headerShown: false,
        headerTitle: null,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      })}>
      <Tab.Screen name={TabScreens.home} component={HomeNavigtor} />
      <Tab.Screen name={TabScreens.feedback} component={FeedbackNavigaor} />
      <Tab.Screen name={TabScreens.player} component={PlayerNavigator} />
      <Tab.Screen name={TabScreens.setting} component={SettingsNavigaor} />
      <Tab.Screen name={TabScreens.profile} component={ProfileNavigaor} />
    </Tab.Navigator>
  );
};

export const BidTabs = ({navigation}) => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === TabScreens.bidsList) {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === TabScreens.createBid) {
          iconName = focused ? 'add' : 'add';
        } else {
          iconName = 'user';
        }

        // You can return any component that you like here!
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={iconName} size={18} />
          </View>
        );
      },
      headerShown: false,
      headerTitle: null,
      tabBarLabelStyle: {
        fontSize: 13,
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name={TabScreens.bidsList} component={List} />
    <Tab.Screen name={TabScreens.createBid} component={CreateBid} />
  </Tab.Navigator>
);

export const MeetingsTabs = ({navigation}) => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === TabScreens.meetingList) {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === TabScreens.createMeeting) {
          iconName = focused ? 'add' : 'add';
        } else {
          iconName = 'user';
        }

        // You can return any component that you like here!
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={iconName} size={18} />
          </View>
        );
      },
      headerShown: false,
      headerTitle: null,
      tabBarLabelStyle: {
        fontSize: 13,
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen component={List} name={TabScreens.meetingList} />
    <Tab.Screen name={TabScreens.createMeeting} component={CreateMeeting} />
  </Tab.Navigator>
);
