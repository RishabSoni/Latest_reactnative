import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [state, setState] = useState({
    isLoggedIn: true,
    theme: 'light',
  });

  useEffect(() => {
    gettingDocusignToken();
  }, []);

  const gettingDocusignToken = async () => {
    try {
      const code = await AsyncStorage.getItem('codeFromUri');
      if (true) {
        setState({
          ...state,
          isLoggedIn: true,
        });
      } else {
        setState({
          ...state,
          isLoggedIn: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{state, setState}}>
      {props.children}
    </AuthContext.Provider>
  );
};
