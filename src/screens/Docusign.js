import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import WebView from 'react-native-webview';
import SelectReceipent from '../components/SelectReceipent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backupPlanform} from '../documents/basePlanEncoded64';

const accuntId = '9e60936f-1e3b-44e9-977a-3c929e320d14';
const userId = '6b023b02-96dc-4360-84a8-3368007ee05d';
const iKey = '2adafd79-f440-4ed4-a584-1edb4e6c573d';
const sKey = '9be8355a-461d-4f82-af04-6df11a8c17b4';
const callbackUri = 'https://www.example.com/callback';
const demoAccountUri = 'https://demo.docusign.net/restapi';
const hostenv = 'account-d.docusign.com';

const Authorization =
  'MmFkYWZkNzktZjQ0MC00ZWQ0LWE1ODQtMWVkYjRlNmM1NzNkOjliZTgzNTVhLTQ2MWQtNGY4Mi1hZjA0LTZkZjExYThjMTdiNA==';

const {height, width} = Dimensions.get('window');

const signoutUri = `https://account-d.docusign.com/logout?client_id=${iKey}`;

export default ({}) => {
  const [state, setState] = useState({
    codeFromUri: '',
    show: false,
  });
  const [codeFromUri, setCode] = useState('');
  const [docuSignToken, setDocuSignToken] = useState('');

  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);
  const [logout, setLogout] = useState(false);
  const {colors} = useTheme();
  const url = `https://account-d.docusign.com/${
    logout ? 'logout' : 'oauth/auth'
  }?response_type=code
  &scope=signature
  &client_id=${iKey}
  &redirect_uri=${
    callbackUri
  }`;
  console.log(url, '<==url');
  ////   &state=YOUR_CUSTOM_STATE

  // useEffect(() => {
  //   if (codeFromUri) {
  //     authWithDocusign();
  //   }
  //   envelopeStatusList();
  // }, [codeFromUri]);

  useEffect(() => {
    const getCode = async () => {
      try {
        const access_token = await AsyncStorage.getItem('docusign_token');
        if (!access_token) {
          setCode('');
        } else {
          // setCode(code);
          envelopeStatusList(code);
        }
      } catch (error) {
        console.log(error, '<==error getcode');
      }
    };
    getCode();
  }, []);

  const authWithDocusign = async code => {
    try {
      // const codeFromUri = await AsyncStorage.getItem('codeFromUri');
      const authUri = `https://${hostenv}/oauth/token`;
      const body = {
        code: code,
        grant_type: 'authorization_code',
      };
      let form = [];
      Object.keys(body).map(keys => {
        form.push(
          `${encodeURIComponent(keys)}=${encodeURIComponent(body[keys])}`,
        );
      });

      const response = await fetch(authUri, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Authorization}`,
          'Content-Type': `application/x-www-form-urlencoded`,
        },
        body: form.join('&'),
      });
      const result = await response.json();
      await AsyncStorage.setItem('docusign_token', result.access_token);
      // if (result.access_token) {
      //   setDocuSignToken(result.access_token);
      //   setState({
      //     ...state,
      //     access_token: result.access_token,
      //   });
      // } else {
      //   Alert.alert(
      //     'Some thing went wrong',
      //     JSON.stringify(result.access_token),
      //   );
      // }
      envelopeStatusList();
      console.log(result, '<====result authWithDocusign');
    } catch (error) {
      // await AsyncStorage.removeItem('codeFromUri');
      console.log(error, '<===authWithDocusign eerror');
    }
  };

  const sendEnevelope = async (client, document) => {
    try {
      const sendEnevelopeUri = `${demoAccountUri}/v2.1/accounts/${accuntId}/envelopes`;
      console.log(sendEnevelopeUri, '<===sendEnevelopeUri');
      const body = JSON.stringify({
        documents: [
          {
            documentBase64: `${backupPlanform}`,
            documentId: '123',
            name: 'Backup plan',
            fileExtension: 'docx',
          },
        ],
        emailSubject: `Simple Signing ${document}`,
        recipients: {
          signers: [
            {
              name: 'Roahn',
              email: 'demo123@yopmail.com',
              fullName: 'Roshan Soni',
              firstName: 'Singh',
              lastName: 'Rohan',
              recipientId: '123',
              routingOrder: 1,
              tabs: {
                signHereTabs: [
                  {
                    anchorString: 's1',
                    anchorIgnoreIfNotPresent: 'false',
                    anchorUnits: 'inches',
                  },
                ],
                fullNameTabs: [
                  {
                    anchorString: 'n1',
                    anchorIgnoreIfNotPresent: 'false',
                    anchorUnits: 'inches',
                  },
                ],
                dateSignedTabs: [
                  {
                    anchorString: 'd1',
                    anchorIgnoreIfNotPresent: 'false',
                    anchorUnits: 'inches',
                  },
                ],
              },
            },
            {
              name: 'Vishnu',
              email: client,
              fullName: 'Vishnu Soni',
              firstName: 'Singh',
              lastName: 'Vishnu',
              recipientId: '12345',
              routingOrder: 2,
              tabs: {
                signHereTabs: [
                  {
                    anchorString: 's2',
                    anchorIgnoreIfNotPresent: 'false',
                    anchorUnits: 'inches',
                  },
                ],
                dateSignedTabs: [
                  {
                    anchorString: 'd1',
                    anchorIgnoreIfNotPresent: 'false',
                    anchorUnits: 'inches',
                  },
                ],
              },
            },
          ],
        },
        status: 'sent',
      });

      console.log(body, '<==========body, accessToken');
      const access_token = await AsyncStorage.getItem('docusign_token');
      const response = await fetch(sendEnevelopeUri, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': `application/json`,
        },
        body,
      });
      const result = await response.text();
      envelopeStatusList();
      console.log(result, '<====result sendEnevelope');
    } catch (error) {
      console.log(error, '<===sendEnevelope eerror');
    }
  };

  const envelopeStatusList = async () => {
    try {
      var yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // 864e5 == 86400000 == 24*60*60*1000

      const envelopeStatusUri = `${demoAccountUri}/v2.1/accounts/${accuntId}/envelopes/status?from_date=${
        new Date().toISOString().split('T')[0]
      }`;
      //&to_date=${new Date().toISOString().split('T')[0]}
      console.log(envelopeStatusUri, '<==envelopeStatusUri');
      const access_token = await AsyncStorage.getItem('docusign_token');
      const response = await fetch(envelopeStatusUri, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': `application/json`,
        },
      });
      const result = await response.json();
      setState({
        ...state,
        envelopesStatus: result,
        show: false,
      });
      if (result) {
        setList([...result?.envelopes]);
      }
      console.log(result, '<====result envelopeStatusList');
    } catch (error) {
      // await AsyncStorage.removeItem('codeFromUri');
      // setCode('');
      Alert.alert('EnvelopeStatusList Error', error.message);
      console.log(error, '<====error envelopeStatusList');
    }
  };

  // if (logout) {
  //   return (
  //     <WebView
  //       style={{
  //         backgroundColor: 'cyan',
  //       }}
  //       onLoad={() => {}}
  //       startInLoadingState={true}
  //       renderLoading={() =>
  //         !logout && (
  //           <View
  //             style={{
  //               flex: 1,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               position: 'absolute',
  //               height: height,
  //               width: width,
  //             }}>
  //             <ActivityIndicator
  //               size={'large'}
  //               color={useTheme().colors.primary}
  //             />
  //           </View>
  //         )
  //       }
  //       source={{uri: signoutUri}}
  //       onNavigationStateChange={async navState => {
  //         setLogout(false);
  //         setCode('');
  //         console.log(navState.url, '<===url signout changes');
  //         // await AsyncStorage.removeItem('codeFromUri');
  //         // await AsyncStorage.removeItem('docusign_token');
  //         // // .then(() => {

  //         // });
  //         // const code = navState.url.split('code=')[1];
  //         // setState({
  //         //   ...state,
  //         //   code,
  //         // });
  //         // AsyncStorage.setItem('codeFromUri', code).then(() => {});
  //         // setCode(code);
  //         // authWithDocusign();
  //         // Keep track of going back navigation within component
  //       }}
  //     />
  //   );
  // }

  if (!codeFromUri) {
    return (
      <>
        <WebView
          style={{
            backgroundColor: 'rgba(207, 51, 51, 0.73)',
          }}
          onLoad={() => {
            setLogout(false);
          }}
          startInLoadingState={true}
          renderLoading={() =>
            codeFromUri == '' && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  height: height,
                  width: width,
                }}>
                <ActivityIndicator
                  size={'large'}
                  color={useTheme().colors.primary}
                />
              </View>
            )
          }
          source={{uri: url}}
          onNavigationStateChange={navState => {
            console.log(navState.url, '<===url changes');
            if (navState.url.match('code=')) {
              const code = navState.url.split('code=')[1];
              setState({
                ...state,
                code,
              });
              // AsyncStorage.setItem('codeFromUri', code).then(() => {});
              setCode(code);
              authWithDocusign(code);
            }

            // Keep track of going back navigation within component
          }}
        />
      </>
    );
  }

  const signout = async () => {
    try {
      const response = await fetch(signoutUri);
    } catch (error) {
      console.log(error);
    }
  };

  const findEnvelopeRecipeint = async envelopeId => {
    try {
      const envelopeStatusUri = `${demoAccountUri}/v2.1/accounts/${accuntId}/envelopes/${envelopeId}/recipients`;
      const access_token = await AsyncStorage.getItem('docusign_token');
      const response = await fetch(envelopeStatusUri, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': `application/json`,
        },
      });
      const result = await response.json();
      setSelected({envelopeId, signers: result.signers});
    } catch (error) {
      console.log(error, '<== findEnvelopeRecipeint');
    }
  };

  // console.log(list, '<=====list');

  if (list?.length > 0) {
    return (
      <View style={[styles.container, {color: colors.background}]}>
        <ScrollView>
          <View style={styles.cardContainer}>
            {[{}, {}].map((data, i) => (
              <View key={i}>
                <View style={[styles.card, {backgroundColor: colors.card}]}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: colors.text,
                      }}>
                      {i % 2 == 0 ? 'Digital' : 'Mannual'} Sign
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Pressable
                      onPress={() => {
                        setState({...state, show: true});
                      }}
                      style={{
                        padding: 10,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                        borderRadius: 7,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: colors.text,
                        }}>
                        Send Docs
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={async () => {
                        await AsyncStorage.removeItem('codeFromUri');
                        setCode('');
                      }}
                      style={{
                        padding: 10,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                        borderRadius: 7,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: colors.text,
                        }}>
                        Signout Docs
                      </Text>
                    </Pressable>
                  </View>
                </View>
                {
                  i % 2 == 0 &&
                    list
                      .sort(
                        (a, b) =>
                          new Date(b.createdDateTime) -
                          new Date(a.createdDateTime),
                      )
                      .map((item, index) => {
                        return (
                          <View key={index}>
                            <Pressable
                              onPress={() =>
                                findEnvelopeRecipeint(item.envelopeId)
                              }
                              style={{
                                flexDirection: 'row',
                                backgroundColor: colors.card,
                                borderRadius: 7,
                                padding: 7,
                                marginTop: 10,
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: colors.text,
                                  }}>
                                  {item.emailSubject}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: colors.text,
                                  }}>
                                  {item.status}
                                </Text>
                              </View>
                            </Pressable>
                            {selected?.envelopeId == item.envelopeId && (
                              <View
                                style={{
                                  width: '100%',
                                  marginTop: 10,
                                  borderRadius: 7,
                                  backgroundColor: colors.card,
                                  elevation: 0.5,
                                  padding: 7,
                                }}>
                                <Text
                                  style={{
                                    color: colors.text,
                                  }}>
                                  Reciepents
                                </Text>
                                {selected?.signers?.map((element, i) => (
                                  <View
                                    key={i}
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    }}>
                                    <Text
                                      style={{
                                        color: colors.text,
                                      }}>
                                      {element.email}
                                    </Text>
                                    <Text
                                      style={{
                                        color: colors.text,
                                      }}>
                                      {element.status}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )}
                          </View>
                        );
                      })
                  // <FlatList
                  //   data={}
                  //   renderItem={({item}) => (

                  //   )}
                  //   keyExtractor={(item, index) => index.toString()}
                  // />
                }
              </View>
            ))}
          </View>
        </ScrollView>
        <SelectReceipent
          onClose={() => setState({...state, show: false})}
          modalVisible={state.show}
          onDone={data => {
            sendEnevelope(data.client, data.document);
            setState({...state, show: false});
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            setState({...state, show: true});
          }}
          style={{
            padding: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            borderRadius: 7,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: colors.text,
            }}>
            Send Docs
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setLogout(true);
            setCode('');
          }}
          style={{
            padding: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            borderRadius: 7,
            marginTop: 25,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: colors.text,
            }}>
            Send Docs
          </Text>
        </Pressable>

        <SelectReceipent
          onClose={() => setState({...state, show: false})}
          modalVisible={state.show}
          onDone={data => {
            sendEnevelope(data.client, data.document);
            setState({...state, show: false});
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  card: {
    height: height * 0.1,
    borderRadius: 7,
    padding: 7,
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    padding: 10,
  },
});
