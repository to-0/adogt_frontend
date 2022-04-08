import * as React from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from '../styles'
import {HOST} from '../App.js';

function WalkFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [details, setDetails] = React.useState('');

  const [date, setDate] = React.useState('')
  var today = new Date();
  var today_string = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');


  const find_term = () => {
    fetch(`http://${HOST}:8000/terms?token=${token}&dog_id=${dog_id}`, {
          method: 'get',
          headers: {
          'Accept': 'application/json, text/plain, */*', 
          'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((json) => {
           
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const button_walk = () => {
    fetch(`http://${HOST}:8000/forms/create?token=${token}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `dog_id=${dog_id}&type=2&details=${details}&term_id=${term_did}`
    })
    .then((response) => response.json())
    .then((json) => {
      Alert.alert(
        "Potvrdenie",
        "Úspešne Ste odoslali formulár na venčenie. Ďalšie informácie Vám pošleme emailom.",
        [
          {
            text: "Naspäť na domovskú stránku",
            onPress: () => navigation.navigate('Prehľad psov', {token: route.params.token, shelter: false}),
            style: "cancel"
          }
        ]
      );
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <ScrollView>
      <View style={[styles.dog_form, {marginTop: 20}]}>
        <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
        <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}}/>


        <View style={styles.calendar}>
          <Text style={styles.calendar_text}>Termín venčenia</Text>
          <Calendar current={today_string} minDate={today_string}
            hideExtraDays disableAllTouchEventsForDisabledDays firstDay={1}
            markedDates={{
              today_string: {selected: true, marked: true, selectedColor: 'orange'},
            }}
            theme={{
              textSectionTitleColor: 'black',
              textSectionTitleDisabledColor: '#515152',
              dayTextColor: 'black',
              todayTextColor: 'orange',
              selectedDayTextColor: '#f76226',
              monthTextColor: 'black',
              indicatorColor: 'black',
              selectedDayBackgroundColor: '#333248',
              arrowColor: '#f76226',
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 20,
                  marginHorizontal: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }
            }}
            onDayPress={day => {setDate(day); find_term()}} 
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={button_walk}>
          <Text style={styles.button_text}>Požiadať o venčenie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
export default WalkFormScreen;