import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import {HOST} from '../App.js';

function FormUpdateScreen({route,navigation}){
    const [reason, setReason] = React.useState('')
    const [finished,setFinished] = React.useState(false);
    const [details,setDetails] = React.useState('');
    const editForm = ()=>{
      var updatebody = {
        'details': details,
        'finished': finished
      }
      console.log(details, finished);
      console.log(route.params.form_id)
      fetch(`http://${HOST}:8000/forms/edit?token=${route.params.token}&form_id=${route.params.form_id}`,{
        method: "PUT",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `details=${details}&finished=${finished}&reason=${reason}`
      })
      .then((response)=> response.json())
      .then((json) =>{
        console.log(json);
        alert(json.message)
      })
      .catch((error)=>{
        console.log(error);
        alert("something went wrong");
      })
    }
    return(
        <View style={styles.dog_form}>
            <Text style={styles.dog_form_info}>Prečo si myslíte, že je psík pre vás vhodný?</Text>
            <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => setReason(value)}/>

            <Text style={styles.dog_form_info}>Doplňujúce informácie</Text>
            <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => setDetails(value)}/>

            <View style={styles.checkbox_view}>
                <Text style={styles.dog_form_info}>Ukončenie formulára</Text>
                <Checkbox style={styles.checkbox} value={finished} onValueChange={(newValue) => setFinished(newValue)}/>
            </View>

            <TouchableOpacity style={styles.button} onPress={editForm}>
              <Text style={styles.button_text}>Potvrdiť zmeny</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default FormUpdateScreen;