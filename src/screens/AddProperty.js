import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../../../aplushomecare/src/utils/constants';
import {InputSelect, InputText, DateTimeSelect} from '../components/InputTypes';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// import tz from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';

const timezones = [
  {title: 'EST', value: -5 * 3600000},
  {title: 'CST', value: -6 * 3600000},
  {title: 'PST', value: -8 * 3600000},
  {title: 'MST', value: -7 * 3600000},
  {title: 'IST', value: +(5.5 * 3600000)},
];

const {height, width} = Dimensions.get('window');
export default ({}) => {
  const {colors} = useTheme();
  const [zone, setZone] = useState({zone: 'IST'});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // tz.setDefault('Asia/Kolkata');
  const offset = timezones.filter(d => d.title == zone.zone)[0].value;

  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  console.log(new Date(utc), '<====utc');

  // console.log(
  //   moment.utc().format('YYYY/MM/HH hh:mm:ss A'),
  //   '<=====',
  //   moment.utc().format(),
  //   zone.zone,
  //   offset,
  //   moment
  //     .utc(moment.utc().valueOf() + offset)
  //     .local()
  //     .format('YYYY/MM/HH hh:mm:ss A'),
  //   // calcTime('ddd', -330),
  //   date.getTimezoneOffset() * 60 * 1000,
  // );

  function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();

    // get UTC time in msec
    var utc = d.getTime();

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    return 'The local time in ' + city + ' is ' + nd.toLocaleString();
  }

  // console.log(calcTime());

  return (
    <View style={styles.container}>
      <View style={[styles.topContainer, {backgroundColor: colors.background}]}>
        <ScrollView>
          <InputSelect
            leftIcon={'globe'}
            list={[
              {title: 'EST'},
              {title: 'CST'},
              {title: 'PST'},
              {title: 'MST'},
              {title: 'IST'},
            ]}
            value={zone.zone}
            onDone={d => {
              setZone({zone: d});
              console.log(d, '<===zone');
              //  ({zone: d.title});
              // console.log(
              //   moment(
              //     // date.valueOf() +
              //       timezones.filter(d => d.title == zone.zone)[0].value,
              //   ).format('hh:mm'),
              //   // moment(
              //   //   moment(date).utc().valueOf() +
              //   //     parseInt(
              //   //       timezones.filter(d => d.title == zone.zone)[0].value,
              //   //     ),
              //   // ).format('DD/MM/YYYY HH:MM'),
              //   '<===d',
              // );
            }}
          />

          <Pressable onPress={() => setOpen(true)}>
            <DateTimeSelect
              // value={moment(
              //   date.valueOf() +
              //   parseInt(
              //     timezones.filter(d => d.title == zone.zone)[0].value,
              //   ),
              // ).format('DD/MM/YYYY hh:mm A')}
              value={new Date(
                utc + timezones.filter(d => d.title == zone.zone)[0].value,
              ).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})}
              leftIcon={'clock-o'}
              rightIcon={'caret-down'}
            />
          </Pressable>
          <InputText placeholder={'Address'} rightIcon={'map-pin'} />
          <InputSelect list={[{title: 'xyz'}]} />
          <InputText placeholder={'Total Bedrooms'} />
          <InputText placeholder={'Total Bathrooms'} />
          <InputText placeholder={'Living Area'} />
          <InputText
            placeholder={'Public Remark'}
            container={styles.textArea}
          />
          <InputText
            placeholder={'Public Remark (Optional)'}
            container={styles.textArea}
          />

          <DatePicker
            modal
            open={open}
            date={
              new Date(
                utc + timezones.filter(d => d.title == zone.zone)[0].value,
              )
            }
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.9,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    backgroundColor: 'pink',
  },
  textArea: {
    height: height * 0.12,
    textAlignVertical: 'top',
    backgroundColor: 'orange',
    paddingHorizontal: 10,
  },
});
