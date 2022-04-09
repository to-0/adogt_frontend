import * as React from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../styles'
import {HOST} from '../App.js';

function WalkFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [details, setDetails] = React.useState('');
  const [dates,setDates] = React.useState([{"date": "2022-07-03", "free": true, "id":7}]);
  const [date, setDate] = React.useState(null)
  const [freedates, setFreeDates] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  var today = new Date();
  var today_string = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  React.useEffect(()=>{
    const token = route.params.token;
    fetch(`http://${HOST}:8000/terms?token=${token}&dog_id=${dog_id}`, {
      method: 'get',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      var temp = []
      var tmp_free = []
      for(var i=0;i<json.length;i++){
        temp.push(json[i]);
        if (json[i].free == true){
          tmp_free.push(json[i]);
        }
      }
      //console.log("Temp",temp)
      setDates(temp);
      setFreeDates(tmp_free);
      console.log(dates);
      console.log(freedates);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  

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
    console.log(date)
    fetch(`http://${HOST}:8000/forms/create?token=${token}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `dog_id=${dog_id}&type=2&details=${details}&term_id=${date}&reason=vencenie`
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
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
    <View>
      <View style={[styles.dog_form, {marginTop: 20}]}>
        <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
        <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}}/>
        {/* <View style={styles.calendar}>
          <Text style={styles.calendar_text}>Termín venčenia</Text>
          <Calendar current={today_string} minDate={today_string} maxDate={dates[dates.length-1].date}
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
        </View> */}
        
        <TouchableOpacity style={styles.button} onPress={button_walk}>
          <Text style={styles.button_text}>Požiadať o venčenie</Text>
        </TouchableOpacity>
      <DropDownPicker
      schema={{
        label: 'date',
        value: 'id'
      }}
      open={open}
      value={date}
      items={freedates}
      setOpen={setOpen}
      setValue={setDate}
    />
      </View>
    </View>
    
  )
}
export default WalkFormScreen;