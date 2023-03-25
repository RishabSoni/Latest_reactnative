import React from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  View,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDown from './DropDown';
import {useTheme} from '@react-navigation/native';

export const InputText = props => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        props.container,
        styles.inputContainer,
        {backgroundColor: '#d3d3d3'},
        props.error
          ? {borderColor: colors.notification}
          : {borderColor: colors.border},
      ]}>
      {props.leftIcon && (
        <View
          style={{
            justifyContent: 'center',
            flex: 0.1,
            alignItems: 'center',
            // backgroundColor: 'orange',
          }}>
          <Icon name={props.leftIcon} color={colors.primary} size={18} />
        </View>
      )}
      <View
        style={{
          flex: props.leftIcon
            ? 0.9
            : props.leftIcon && props.rightIcon
            ? 0.8
            : 1,
          justifyContent: 'center',
        }}>
        <TextInput
          placeholderTextColor={colors.primary}
          style={[
            styles.input,
            {color: colors.primary},
            props.error && {borderColor: 'red'},
          ]}
          {...props}
        />
      </View>
      {props.rightIcon && (
        <Pressable
          onPress={props.onEyePress}
          style={{
            justifyContent: 'center',
            flex: 0.1,
            alignItems: 'center',
            // backgroundColor: 'orange',
          }}>
          <Icon name={props.rightIcon} color={colors.primary} size={18} />
        </Pressable>
      )}
    </View>
  );
};

export const InputSelect = props => {
  const {colors} = useTheme();
  return Platform.OS == 'android' ? (
    <View style={styles.btn}>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
          // backgroundColor: 'orange',
        }}>
        <Icon name={props.leftIcon || 'rocket'} color={colors.primary} size={18} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.9,
          // backgroundColor: 'red',
        }}>
        <Picker
          style={styles.dropdown}
          mode={'dropdown'}
          selectedValue={props.value}
          onValueChange={props.onDone}>
          {props.list.map(item => (
            <Picker.Item
              key={item.title}
              label={item.title}
              value={item.title}
            />
          ))}
        </Picker>
      </View>
    </View>
  ) : (
    <>
      <Pressable
        {...props}
        style={[styles.btn, {backgroundColor: '#d3d3d3'},  {borderColor: props.error ? 'red' : colors.border}]}>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={props.leftIcon} color={colors.primary} size={18} />
        </View>
        <View
          style={{
            flex: 0.8,
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.primary,
            }}>
            {props.value || 'Slect any one'}
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={props.rightIcon} color={colors.primary} size={18} />
        </View>
      </Pressable>
      <DropDown
        modalVisible={props.visible}
        list={props.list}
        onDone={props.onDone}
        value={props.list.value}
      />
    </>
  );
};

export const DateTimeSelect = props =>
  Platform.OS == 'android' ? (
    <View style={styles.btn}>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.1,
          alignItems: 'center',
          // backgroundColor: 'orange',
        }}>
        <Icon name={props.leftIcon} size={18} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.9,
          // backgroundColor: 'red',
        }}>
        <Text>{props.value || 'Slect any one'}</Text>
      </View>
    </View>
  ) : (
    <>
      <Pressable
        {...props}
        style={[styles.btn, props.error && {borderColor: 'red'}]}>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={props.leftIcon} size={18} />
        </View>
        <View
          style={{
            flex: 0.8,
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{props.value || 'Slect any one'}</Text>
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={props.rightIcon} size={18} />
        </View>
      </Pressable>
    </>
  );

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: 25,
    // padding: 10,
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  input: {
    padding: 10,
  },
  btn: {
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  dropdown: {
    // borderTopLeftRadius: 25,
    height: 30,
  },
});
