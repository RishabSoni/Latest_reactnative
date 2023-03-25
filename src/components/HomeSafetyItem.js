import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {InputSelect, InputText} from './InputTypes';

export default ({item, index}) => {
  const [optionPicker, setoptionPicker] = useState(false);
  const [reason, setReason] = useState('');
  const [option, setoption] = useState(null);
  return (
    <>
      <View style={styles.container}>
        <Text>question</Text>
      </View>
      {option == 'NO' && <InputText placeholder={'Enter reason'} />}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
          <InputSelect
            leftIcon={'bars'}
            list={[{title: 'YES'}, {title: 'NO'}, {title: 'NA'}]}
            onDone={d => {
              setoption(d);
            }}
            value={option}
          />
        </View>
        <View
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <Pressable style={styles.btn}>
            <Text>Save</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    // padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});
