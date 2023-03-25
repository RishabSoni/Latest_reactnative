import React, {useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

export default ({navigation}) => {
  const [feedbacks, setFeedback] = useState([
    {feedback: 'Hellow Everyone', contact: '+918178165856'},
    {feedback: 'Hellow Body how are you', contact: '+188178165856'},
    {feedback: 'Hellow Body how are you mmmm', contact: '+19978165856'},
  ]);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef();
  return (
    <View style={styles.continaer}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={formattedValue}
        defaultCode="DM"
        layout="first"
        // onChangeText={text => {
        //   setValue(text);
        // }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
      />
      <FlatList
        data={feedbacks}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              const chatLen = item.contact.length;
              const cc = item.contact.substr(0, chatLen - 10);
              console.log(cc, '<====county calling Code');
              const code = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
              phoneInput.current?.onSelect(value)
              console.log(code, '<====county Code');
              phoneInput.current?.onChangeText(item.contact);
            }}
            style={styles.feedbackItem}>
            <Text>{item.feedback}</Text>
            <Text>{item.contact}</Text>
            <Text>{'Edit'}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    justifyContent: 'center',
  },
  feedbackItem: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
