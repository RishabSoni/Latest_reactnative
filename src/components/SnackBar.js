import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
export default ({icon, modalVisible, onClose, message}) => {
  //   const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      onClose();
    }
  }, [modalVisible]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.snack}>
          <Pressable onPress={onClose} style={styles.left}>
            <Icon name={icon} color={'#fff'} size={25} />
          </Pressable>
          <View style={styles.right}>
            <Text style={{color: '#fff'}}>{message}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.3,
    justifyContent: 'flex-start',
    margin: 0,
    // backgroundColor: 'rgba(15, 4, 4, 0.35)',
  },
  snack: {
    height: height * 0.07,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 15,
    backgroundColor: 'red',
  },
  left: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 0.9,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
