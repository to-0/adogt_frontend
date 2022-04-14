import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles'
import {Globals} from '../Globals'
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { useFocusEffect } from '@react-navigation/native';

function EditDogScreen({route,navigation}){
  const token = route.params.token;
  const dog_id = route.params.id;
  const [name,setName] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [age,setAge] = React.useState('');
  const [details, setDetails] = React.useState(false);
  const [health, setHealth] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      getDog();
    }, [])
  );
  
  const edit_dog = () => {
    if (name == '' || breed == '' || age == 0 || details == '' || health == '') {
      Toast.show('Chýbajúce údaje', {duration: Toast.durations.LONG});
      return;
    }
    if (isNaN(parseInt(age))) {
      Toast.show('Vek musí byť číslo', {duration: Toast.durations.LONG});
      return;
    }
    var putBody = {
      "name": name,
      "breed": breed,
      "age": age,
      "details": details,
      "health": health
    };

    fetch(`http://${Globals.host}:8000/dogs/editDog?token=${token}&dog_id=${dog_id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(putBody)
    })
    .then(response => response.json())
    .then((json)=>{
      Alert.alert(
        "Potvrdenie",
        "Úspešne Ste upravili psa.",
        [
          {
            text: "Zavrieť",
            onPress: () => navigation.navigate('Prehľad psov', {token: token, shelter: true}),
            style: "cancel"
          }
        ]
      );
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  const getDog = () => {
    fetch(`http://${Globals.host}:8000/dogs/getDog?token=${token}&dog_id=${dog_id}`,{
        method: 'GET'
    })
    .then((response)=>response.json())
    .then((json)=>{
      setName(json.name);
      setBreed(json.breed);
      setAge(json.age);
      setDetails(json.details);
      setHealth(json.health);
    })
    .catch((error)=>{
        alert(error);
    })
  }
  const add_terms = () => {
      fetch(`http://${Globals.host}:8000/terms/create?token=${token}&dog_id=${dog_id}`, {
        method: 'POST',
      })
      .then((response)=>response.json())
      .then((json)=>{
        Alert.alert(
          "Potvrdenie",
          "Úspešne Ste pridali termíny pre psa.",
          [
            {
              text: "Zavrieť",
              onPress: () => navigation.navigate('Prehľad psov', {token: token, shelter: true}),
              style: "cancel"
            }
          ]
        );
      })
      .catch((error)=>{
        alert(error)
      })
  }
  const delete_dog = () => {
    fetch(`http://${Globals.host}:8000/dogs/deleteDog?token=${token}&dog_id=${dog_id}`, {
        method: 'DELETE',
      })
      .then((response)=>response.json())
      .then((json)=>{
        Alert.alert(
          "Potvrdenie",
          json.message,
          [
            {
              text: "Zavrieť",
              onPress: () => navigation.navigate('Prehľad psov', {token: token, shelter: true}),
              style: "cancel"
            }
          ]
        );
      })
      .catch((error)=>{
        alert(error)
      })
  }
  return (
    <RootSiblingParent>
      <KeyboardAvoidingView>
        <ScrollView>
        <View style={[styles.dog_form, {marginTop: 20}]}>
        <Text style={styles.dog_form_info}>Meno</Text>
        <TextInput style={styles.dog_form_item} onChangeText={(value) => {setName(value)}} defaultValue={name.toString()}/>

        <Text style={styles.dog_form_info}>Plemeno</Text>
        <TextInput style={styles.dog_form_item} onChangeText={(value) => {setBreed(value)}} defaultValue={breed.toString()}/>

        <Text style={styles.dog_form_info}>Vek</Text>
        <TextInput style={styles.dog_form_item} onChangeText={(value) => {setAge(value)}} defaultValue={age.toString()}/>

        <Text style={styles.dog_form_info}>Zdravotný stav</Text>
        <TextInput style={styles.dog_form_item} onChangeText={(value) => {setHealth(value)}} defaultValue={health.toString()}/>

        <Text style={styles.dog_form_info}>Ďalšie informácie</Text>
        <TextInput style={[styles.dog_form_item, styles.dog_form_item_multiline]} multiline={true} onChangeText={(value) => {setDetails(value)}} defaultValue={details.toString()}/>

        <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={edit_dog}>
            <Text style={styles.button_text}>Upraviť psa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {marginTop: 0}]} onPress={add_terms}>
            <Text style={styles.button_text}>Pridať termíny pre psa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={delete_dog}>
            <Text style={styles.button_text}>Vymazať psa</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RootSiblingParent>
  )
}
export default EditDogScreen;