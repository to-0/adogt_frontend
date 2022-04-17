import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-simple-toast';

import styles from '../styles';
import {Globals} from '../Globals';

function FormUpdateScreen({route,navigation}){
  const token = route.params.token;
  const form_id = route.params.form_id;
  const [reason, setReason] = React.useState('');
  const [finished,setFinished] = React.useState(false);
  const [details,setDetails] = React.useState('');
  const [type,setType] = React.useState('');

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
      setType(json.type);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const editForm = () =>{
    console.log("reason " + reason);
    if (reason == undefined || reason == null || reason == '') {
      console.log(type);
      if (type == 1) {
        Toast.show('Chýbajúce údaje', Toast.LONG);
        return;
      }
      else
        setReason('');
    }

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
      json.message=="OK"? "Úspešne Ste upravili formulár.":json.message,
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
    <KeyboardAvoidingView>
      <ScrollView>
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

          <View style={styles.button_bottom}>
            <TouchableOpacity style={styles.button} onPress={editForm}>
              <Text style={styles.button_text}>Potvrdiť zmeny</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default FormUpdateScreen;