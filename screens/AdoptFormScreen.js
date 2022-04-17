import * as React from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';

import styles from '../styles';
import {Globals} from '../Globals';

function AdoptFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [reason, setReason] = React.useState('');
  const [details,setDetails] = React.useState('');

  const button_adopt = () => {
    if (reason == '') {
      Toast.show('Chýbajúce údaje', {duration: Toast.durations.LONG});
      return;
    }

    var postBody = {
      "type": 1,
      "dog_id": dog_id,
      "details": details,
      "reason": reason,
    };

    fetch(`http://${Globals.host}:8000/forms/create?token=${token}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*', 
        'Content-Type':'application/json'
      },
      body: JSON.stringify(postBody)
    })
    .then((response) => response.json())
    .then((json) => {
      Alert.alert(
        "Potvrdenie",
        json.message=='OK' ? 'Úspešne Ste vytvorili formulár na adopciu.':json.message,
        [
          {
            text: "Zavrieť",
            onPress: () => navigation.navigate('Prehľad psov', {token: token, shelter: false}),
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
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.form_info}>Prečo si myslíte, že je psík pre vás vhodný?</Text>
          <TextInput style={[styles.form_item, styles.form_item_multiline]} multiline={true} placeholder="Zadajte dôvod pre adopciu" 
            onChangeText={(value) => {setReason(value)}}/>

          <Text style={styles.form_info}>Doplňujúce informácie</Text>
          <TextInput style={[styles.form_item, styles.form_item_multiline]} multiline={true} placeholder="Zadajte doplňujúce informácie" 
            onChangeText={(value) => {setDetails(value)}}/>

          <View style={styles.button_bottom}>
            <TouchableOpacity style={styles.button} onPress={button_adopt}>
              <Text style={styles.button_text}>Požiadať o adopciu</Text>
            </TouchableOpacity>
          </View>      
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default AdoptFormScreen;