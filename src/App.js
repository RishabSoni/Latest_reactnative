import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
  BackHandler,
  AppState,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import DropDown from './components/DropDown';
import {InputSelect, InputText} from './components/InputTypes';
import Slider from './components/Slider';
import {states} from './utilities/contants';
import {AgentForm} from './utilities/validations';
import SnackBar from './components/SnackBar';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {AuthContext, AuthProvider} from './Contexts/AuthContext';
import {RootNavigator} from './navigations/RootNavigator';
import {MyDarkTheme} from './themes/darkTheme';
import {LightTheme} from './themes/lightTheme';
import TouchID from 'react-native-touch-id';
import PasscodeAuth from 'react-native-passcode-auth';

export const APPID = `638660410c4ecdc97411aad0`;

const {width, height} = Dimensions.get('window');
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [img, setImg] = useState([]);
  const [codeFromURL, setCodeFromURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [errorVisible, setErrorVisible] = useState({
    visible: false,
    message: '',
  });
  const [dummyRecords, setDummyrecods] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyapi.io/data/v1/post', {
        method: 'GET',
        headers: {
          'app-id': `${APPID}`,
        },
      });
      const result = await response.json();
      setDummyrecods(result.data);
      // console.log(result, '<===result');
    } catch (error) {
      console.log(error, '<===error');
    }
  };

  const [form, setForm] = useState({
    list: null,
    state: null,
    agentDetails: [{state: null, lic: '', visible: false}],
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    password: '',
    mlsIds: [{id: ''}],
    role: {selected: '', visible: false},
    companyEin: '',
    companyName: '',
    website: '',
    googleReview: '',
    rememberMe: false,
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const {colors} = useTheme();
  const manageLongString = str => {
    return str.length > 35 ? `${str.substr(0, 32)}...` : str;
  };

  const onContinuePress = () => {
    const err = AgentForm(form);

    if (err) {
      console.log(err, '<==err');
      setErrorVisible({
        visible: true,
        message: err,
      });
    }
  };

  const load = async () => {
    try {
      const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        sensorErrorDescription: 'cancelled by user',
        // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        // unifiedErrors: undefined, // use unified error messages (default false)
        // passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
      };
      const biometryType = await TouchID.isSupported(optionalConfigObject);
      if (biometryType === 'FaceID') {
        const isAuthenticate = await TouchID.authenticate(
          `Login with ${biometryType}`,
          optionalConfigObject,
        );
        console.warn(biometryType + '<=====biometryType');
        console.log(isAuthenticate, 'FaceID is supported.');
      } else {
        const isAuthenticate = await TouchID.authenticate(
          `Login with TouchID`,
          optionalConfigObject,
        );
        console.warn(biometryType + '<=====biometryType');
        console.log(isAuthenticate, 'TouchID is supported.');
      }
    } catch (error) {
      // LAErrorUserCancel()
      BackHandler.exitApp();
      console.warn(error + '<=====bi<==touchid error');
      console.log(error, '<==touchid error');
    }
  };

  const passcodeAuth = () => {
    PasscodeAuth.isSupported()
      .then(supported => {
        // Success code
        console.log('Passcode Auth is supported.');
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

 const _pressHandler = () => {
    PasscodeAuth.authenticate('to demo this react-native component')
      .then(success => {
        Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  }

  useEffect(() => {
    // _pressHandler();
    return () => {};
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        _pressHandler();
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // console.log(appState, "<==appState");

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({state}) => {
          const contentType = `${state.theme}-content`;
          return (
            <NavigationContainer
              theme={state.theme == 'dark' ? MyDarkTheme : LightTheme}>
              <RootNavigator />
            </NavigationContainer>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  inputCard: {
    // backgroundColor: 'pink',
    // marginHorizontal : 10
  },
});

export default App;
