import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {InputSelect} from './InputTypes';
const {height} = Dimensions.get('window');

const clients = [
  {title: 'demo@yopmail.com'},
  {title: 'demo1@yopmail.com'},
  {title: 'demo2@yopmail.com'},
  {title: 'demo3@yopmail.com'},
  {title: 'demo4@yopmail.com'},
  {title: 'demo5@yopmail.com'},
];

export default ({modalVisible, onDone, onClose}) => {
  const [state, setState] = useState({
    client: null,
    document: null,
  });

  const onDonePress = () => {
    const {client, document} = state;
    if (!(client && document)) {
      Alert.alert('Select all fields');
    } else {
      onDone(state);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.close}>
              <Text>Close</Text>
            </Pressable>
            <Pressable onPress={onDonePress} style={styles.done}>
              <Text>Done</Text>
            </Pressable>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 0.9,
            }}>
            <InputSelect
              value={state.client}
              rightIcon={'caret-down'}
              leftIcon={'rocket'}
              list={clients}
              onDone={data => {
                setState({
                  ...state,
                  client: data,
                });
                console.log(data, '<==data caregiver');
              }}
            />

            <InputSelect
              value={state.document}
              rightIcon={'caret-down'}
              leftIcon={'rocket'}
              list={[
                {title: 'Document 1'},
                {title: 'Document 2'},
                {title: 'Document 3'},
              ]}
              onDone={data => {
                setState({
                  ...state,
                  document: data,
                });
                console.log(data, '<==data documents');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'flex-end',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  close: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f3f3f3',
  },
  done: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f3f3f3',
  },
  card: {
    height: height * 0.5,
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
  },
});
