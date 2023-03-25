import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {Pressable, Dimensions, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../Contexts/AuthContext';
import AddProperty from '../screens/AddProperty';
import AudioPlayer from '../screens/AudioPlayer';
import Bids from '../screens/Bids';
import CreateBid from '../screens/CreateBid';
import CreateMeeting from '../screens/CreateMeeting';
import Docusign from '../screens/Docusign';
import Feedback from '../screens/Feedback';
import Home from '../screens/Home';
import HomeSafety from '../screens/HomeSafety';
import Login from '../screens/Login';
import Meetings from '../screens/Meetings';
import PlayList from '../screens/PlayList';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Settings from '../screens/Settings';
import Signup from '../screens/SignUp';
import VideoPlayer from '../screens/VideoPlayer';
import Welcome from '../screens/Welcome';
import DrawerNavigator from './DrawerNavigator';
import {BidTabs, HomeTab, MeetingsTabs, TabNavigator} from './TabNavigator';
// import Signup from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

export const AuthScreens = {
  welcome: 'Welcome',
  login: 'Login',
  signup: 'Signup',
  home: 'Home',
  bids: 'Bids',
  createBids: 'Create Bids',
  meetings: 'Meetings',
  createMeetings: 'Create Meetings',
  modal: 'ModalMeeting',
  profile: 'Profile',
  settings: 'Settings',
  drawer: 'Drawer',
  docuSign: 'DocuSignNavigator',
  addProperty: 'Add Property',
  player: 'PlayerList',
  videoPlayer: 'Video Player',
  audioPlayer: 'Audio Player',
  homeSafety: 'Home Safety Assessment',
  feedbackNavigaor : 'FeedbackNavigaor'
};

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={AuthScreens.welcome}>
    <Stack.Screen name={AuthScreens.welcome} component={Welcome} />
    <Stack.Screen name={AuthScreens.login} component={Login} />
    <Stack.Screen name={AuthScreens.signup} component={Signup} />
  </Stack.Navigator>
);

export const HomeNavigtor = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.home} component={Home} />
  </Stack.Navigator>
);

export const BidsNavigaor = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.bids} component={Bids} />
    <Stack.Screen name={AuthScreens.createBids} component={CreateBid} />
  </Stack.Navigator>
);

export const ProfileNavigaor = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.profile} component={Profile} />
  </Stack.Navigator>
);

export const FeedbackNavigaor = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.feedbackNavigaor} component={Feedback} />
  </Stack.Navigator>
);

export const PlayerNavigator = () => (
  <Stack.Navigator /** screenOptions={{headerShown: false}} */>
    <Stack.Screen name={AuthScreens.player} component={PlayList} />
    <Stack.Screen name={AuthScreens.videoPlayer} component={VideoPlayer} />
    <Stack.Screen name={AuthScreens.audioPlayer} component={AudioPlayer} />
  </Stack.Navigator>
);

export const SettingsNavigaor = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.settings} component={Settings} />
    <Stack.Screen name={AuthScreens.drawer} component={DrawerNavigator} />
  </Stack.Navigator>
);

export const ModalNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AuthScreens.createMeetings}
        component={CreateMeeting}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                width: width * 0.1,
                borderWidth: 0.5,
                // position: 'absolute',
                right: 15,
                // backgroundColor: 'pink',
                justifyContent: 'space-around',
                flexDirection: 'row',
                borderRadius: 10,
                padding: 5,
                marginRight: 15,
                // alignSelf : 'flex-end'
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={'close'} size={25} />
              </View>
            </Pressable>
          ),
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export const MeetinsNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.meetings} component={Meetings} />
    <Stack.Screen
      name={AuthScreens.createMeetings}
      component={CreateMeeting}
      options={({navigation}) => ({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              width: width * 0.1,
              borderWidth: 0.5,
              // position: 'absolute',
              right: 15,
              // backgroundColor: 'pink',
              justifyContent: 'space-around',
              flexDirection: 'row',
              borderRadius: 10,
              padding: 5,
              marginRight: 15,
              // alignSelf : 'flex-end'
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={'close'} size={25} />
            </View>
          </Pressable>
        ),
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

export const DocusignNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthScreens.docuSign} component={Docusign} />
  </Stack.Navigator>
);

export const RootNavigator = () => {
  const {state, setState} = useContext(AuthContext);
  //   console.log(state, '<==state');
  return !state.isLoggedIn ? (
    <AuthNavigator />
  ) : (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={DrawerNavigator} name="HomeDrawer" />
        <Stack.Screen
          options={({navigation}) => ({
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  width: width * 0.1,
                  // backgroundColor: 'red',
                  alignItems: 'flex-start',
                  // borderWidth: 0.5,
                  // position: 'absolute',
                  // right: 15,
                  // backgroundColor: 'pink',
                  // justifyContent: 'space-around',
                  // flexDirection: 'row',
                  // borderRadius: 10,
                  // padding: 5,
                  // marginRight: 15,
                  // alignSelf : 'flex-end'
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name={'angle-left'} size={25} />
                </View>
              </Pressable>
            ),
            headerStyle: {
              // backgroundColor : 'transparent'
            },
            // headerTitle: () => (
            //   <Text
            //     style={{
            //       textAlign: 'center',
            //     }}>
            //     Add Property
            //   </Text>
            // ),
            // headerShown: false,
          })}
          component={AddProperty}
          name={AuthScreens.addProperty}
        />
        <Stack.Screen component={HomeSafety} name={AuthScreens.homeSafety} />
      </Stack.Navigator>
    </>
  );
};
