import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';

function AdoptFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  var details = undefined;
  console.log(token)

  const button_adopt = () => {
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
      Alert.alert(
        "Potvrdenie",
        "Úspešne Ste odoslali adopčný formulár. Ďalšie informácie Vám pošleme emailom.",
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
    <View style={styles.dog_form}>
      <Text style={styles.dog_form_info}>Ulica, číslo domu</Text>
      <TextInput style={styles.dog_form_item}/>

      <Text style={styles.dog_form_info}>Mesto</Text>
      <TextInput style={styles.dog_form_item}/>

      <Text style={styles.dog_form_info}>Telefónne číslo</Text>
      <TextInput style={styles.dog_form_item}/>

      <Text style={styles.dog_form_info}>Prečo si myslíte, že je psík pre vás vhodný?</Text>
      <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true}/>

      <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
      <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {console.log(value); details = value}}/>

      <View style={styles.button}>
        <Button title="Požiadať o adopciu" onPress={button_adopt} color='#f76226'/>
      </View>

    </View>
  )
}
export default AdoptFormScreen;