import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';

import styles from '../styles';
import {Globals} from '../Globals';

function FormUpdateScreen({route,navigation}){
  const token = route.params.token;
  const form_id = route.params.form_id;
  const [reason, setReason] = React.useState('');
  const [finished,setFinished] = React.useState(false);
  const [details,setDetails] = React.useState('');

  React.useEffect(()=>{
    fetch(`http://${Globals.host}:8000/forms/detail?token=${token}&form_id=${form_id}`, {
      method: 'GET',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.details == null)
        setDetails('');
      else
        setDetails(json.details);
      setFinished(json.finished);
      setReason(json.reason);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const editForm = () =>{
    if (reason == undefined || reason == null)
      setReason('');

    var putBody = {
      'details': details,
      'finished': finished,
      'reason': reason,
    };

    fetch(`http://${Globals.host}:8000/forms/edit?token=${token}&form_id=${form_id}`,{
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(putBody)
    })
    .then((response)=> response.json())
    .then((json) =>{
      Alert.alert(
      "Potvrdenie",
      "Úspešne Ste upravili formulár.",
      [
        {
          text: "Zavrieť",
          onPress: () => navigation.navigate('Prehľad formulárov', {"token": token, "shelter": false}),
          style: "cancel"
        }
      ]
    );
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  return(
    <View style={styles.form}>
      {reason != null ? (
        <>
          <Text style={styles.form_info}>Prečo si myslíte, že je psík pre vás vhodný?</Text>
          <TextInput style={[styles.form_item, styles.form_item_multiline]} multiline={true} onChangeText={(value) => {setReason(value)}} defaultValue={reason.toString()}/>
        </>
        ):(<></>)}

      <Text style={styles.form_info}>Doplňujúce informácie</Text>
      <TextInput style={[styles.form_item, styles.form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}} defaultValue={details.toString()}/>

      <View style={styles.checkbox_view}>
          <Text style={styles.form_info}>Ukončenie formulára</Text>
          <Checkbox style={styles.checkbox} value={finished} onValueChange={(newValue) => setFinished(newValue)}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={editForm}>
        <Text style={styles.button_text}>Potvrdiť zmeny</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FormUpdateScreen;