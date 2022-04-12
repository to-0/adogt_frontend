import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-root-toast';

import styles from '../styles'
import {Globals} from '../Globals'

function WalkFormScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [details, setDetails] = React.useState('');
  const [dates,setDates] = React.useState([{}]);
  const [date, setDate] = React.useState(null);
  const [freedates, setFreeDates] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(()=>{
    fetch(`http://${Globals.host}:8000/terms?token=${token}&dog_id=${dog_id}`, {
      method: 'get',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      var temp = [];
      var tmp_free = [];

      for(var i=0;i<json.length;i++){
        var date_format = json[i].date.substring(8, 10) + "." + json[i].date.substring(5, 7) + "." + json[i].date.substring(0, 4);
        json[i].date = date_format;
        temp.push(json[i]);

        if (json[i].free == true)
          tmp_free.push(json[i]);
      }
      console.log(temp);
      console.log(tmp_free);
      //setDates(temp);
      setFreeDates(tmp_free);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  
  const button_walk = () => {
    if (date == null) {
      Toast.show('Chýbajúci dátum venčenia', {duration: Toast.durations.LONG});
      return;
    }

    var postBody = {
      "type": 2,
      "dog_id": dog_id,
      "details": details,
      "term_id": date,
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
        "Úspešne Ste odoslali formulár na venčenie. Ďalšie informácie Vám pošleme emailom.",
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
    <View>
      <View style={[styles.dog_form, {marginTop: 20}]}>
        <View style={styles.dropdown}>
          <DropDownPicker open={open} value={date} items={freedates} setOpen={setOpen} setValue={setDate} placeholder="Výber dátumu"
            schema={{label: 'date', value: 'id'}} />
        </View>

        <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
        <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}}/>

        <TouchableOpacity style={styles.button} onPress={button_walk}>
          <Text style={styles.button_text}>Požiadať o venčenie</Text>
        </TouchableOpacity>

      </View>
    </View>
    
  )
}
export default WalkFormScreen;