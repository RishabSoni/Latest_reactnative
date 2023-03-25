import React, {useState, useRef, createRef, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

export default ({
  modalVisible,
  list,
  setModalVisible,
  onClose,
  index,
  onDone,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  let flatlistRef = useRef(null);
  const {width} = Dimensions.get('window');

  const {colors} = useTheme();

  useEffect(() => {
    if (modalVisible) {
      console.log('animated');
      flatlistRef.current?.scrollToIndex({
        animated: true,
        index: selectedLanguage.index,
        // viewPosition: 0.5,
        // viewOffset: 10,
      });
    }
  }, [modalVisible]);

  console.log(selectedLanguage);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={{height: 300, backgroundColor: colors.border}}>
          <View style={styles.header}>
            <Pressable
              style={[styles.btn, {backgroundColor: colors.notification}]}
              onPress={onClose}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, {backgroundColor: colors.primary}]}
              onPress={() => onDone(selectedLanguage)}>
              <Text>Done</Text>
            </Pressable>
          </View>
          {Platform.OS == 'ios' ? (
            <Picker
              ViewStyleProp={{
                borderRadius: 25,
                borderWidth: 0.5,
              }}
              mode={'dropdown'}
              selectedValue={selectedLanguage?.value}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage({value: itemValue, index: itemIndex})
              }>
              {list.map(item => (
                <Picker.Item
                  key={item.title}
                  label={item.title}
                  value={item.title}
                />
              ))}
            </Picker>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: '#ddd',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btn: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  item: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // item: 50,
  },
});
