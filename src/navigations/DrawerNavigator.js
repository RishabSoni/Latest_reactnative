import {
  createDrawerNavigator,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {Pressable, Dimensions, View, Text} from 'react-native';
import Bids from '../screens/Bids';
import Home from '../screens/Home';
import Meetings from '../screens/Meetings';
import {
  AuthScreens,
  BidsNavigaor,
  DocusignNavigator,
  HomeNavigtor,
  MeetinsNavigaor,
  MeetinsNavigator,
} from './RootNavigator';
import TabNavigator, {HomeTab} from './TabNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import CustomDrawer from '../components/CustomDrawer';
import Profile from '../screens/Profile';
import Referrals from '../screens/Referrals';
import Services from '../screens/Services';
import Details from '../screens/Details';
import {useContext} from 'react';
import {AuthContext} from '../Contexts/AuthContext';
import {colors} from '../../../../aplushomecare/src/utils/constants';
import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Drawer = createDrawerNavigator();

export const DrawerScreens = {
  home: 'Dashboard',
  bids: 'Bids',
  meetings: 'Meetings',
  profile: 'Profile',
  payments: 'Payments',
  services: 'Services',
  referrals: 'Referrals',
  bookmark: 'Bookmark',
  docuSign: 'DocuSign',
};

export default props => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({route}) => ({
        headerTitle: route.name,
        drawerStyle: {
          width: width,
          //   backgroundColor: 'pink',
        },
        headerLeftContainerStyle : {
            color : colors.primary
        },
        // headerShown: route.name !== AuthScreens.createMeetings,
      })}>
      <Drawer.Screen
        name={DrawerScreens.home}
        component={HomeTab}
        options={{
          childLabel: DrawerScreens.home,
        }}
      />
      <Drawer.Screen
        name={DrawerScreens.profile}
        component={Profile}
        options={{
          parentLabel: DrawerScreens.profile,
          childLabel: DrawerScreens.profile,
        }}
      />
      <Drawer.Screen
        name={DrawerScreens.bookmark}
        component={Details}
        options={{
          parentLabel: DrawerScreens.profile,
          childLabel: DrawerScreens.bookmark,
        }}
      />
      <Drawer.Screen
        name={DrawerScreens.referrals}
        component={Referrals}
        options={{
          parentLabel: DrawerScreens.profile,
          childLabel: DrawerScreens.referrals,
        }}
      />
      <Drawer.Screen
        name={DrawerScreens.payments}
        component={Services}
        options={{
          parentLabel: DrawerScreens.payments,
          childLabel: DrawerScreens.services,
        }}
      />
      <Drawer.Screen
        name={DrawerScreens.bids}
        component={BidsNavigaor}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(AuthScreens.createBids)}
              style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="plus" size={25} />
            </Pressable>
          ),
          childLabel: DrawerScreens.bids,
        })}
      />
      <Drawer.Screen
        name={DrawerScreens.meetings}
        component={MeetinsNavigator}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(AuthScreens.createMeetings)}
              style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="plus" size={25} />
            </Pressable>
          ),
          childLabel: DrawerScreens.meetings,
        })}
      />
      <Drawer.Screen
        name={DrawerScreens.docuSign}
        component={DocusignNavigator}
        options={{
          childLabel: DrawerScreens.docuSign,
        }}
      />
    </Drawer.Navigator>
  );
};
