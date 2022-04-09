import * as React from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

function AdoptFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [reason, setReason] = React.useState('')
  const [details,setDetails] = React.useState('');

  const button_adopt = () => {
    console.log(reason + details)
    if (reason == '') {
      let toast = Toast.show('Chýbajúce údaje', {
        duration: Toast.durations.LONG,
      });
      return;
    }
    fetch(`http://${HOST}:8000/forms/create?token=${token}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `dog_id=${dog_id}&type=1&details=${details}`
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      Alert.alert(
        "Potvrdenie",
        "Úspešne Ste odoslali adopčný formulár. Ďalšie informácie Vám pošleme emailom.",
        [
          {
            text: "Zavrieť",
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
    <View style={styles.dog_form}>
      <Text style={styles.dog_form_info}>Prečo si myslíte, že je psík pre vás vhodný?</Text>
      <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setReason(value)}}/>

      <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
      <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}}/>

      <TouchableOpacity style={styles.button} onPress={button_adopt}>
        <Text style={styles.button_text}>Požiadať o adopciu</Text>
      </TouchableOpacity>
      
    </View>
  )
}
export default AdoptFormScreen;