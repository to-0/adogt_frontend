import * as React from 'react';
import { View, TextInput, Text, Dimensions, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from '../styles';
import {Globals} from '../Globals';

function AddDogScreen({route, navigation}){
  const token = route.params.token;
  const [name,setName] = React.useState('');
  const [breed,setBreed] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [health,setHealth] = React.useState('');
  const [age,setAge] = React.useState('');
  let localUri = '';

  const select_image = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (result.cancelled)
      return;
    localUri = result.uri;
  };

  const create_dog = () => {
    var postBody = {
      "name": name,
      "breed": breed,
      "age": age,
      "details": details,
      "health": health
    };

    fetch(`http:/${Globals.host}:8000/dogs/addDog?token=${token}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(postBody)
    })
    .then((response) => response.json())
    .then((json)=> {
      if(json.message == "OK"){
        var dog_id = json.id;
        if (localUri === '') {
          Alert.alert(
            "Potvrdenie",
            "Úspešne Ste pridali nového psa.",
            [
              {
                text: "Zavrieť",
                onPress: () => navigation.navigate('Profil používateľa', {token: token, shelter: true}),
                style: "cancel"
              }
            ]
          );
          return;
        }
        const options = {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
        };
        FileSystem.uploadAsync(`http://${Globals.host}:8000/image/insert?token=${token}&dog_id=${dog_id}`,localUri,options)
        .then((response)=>{
          Alert.alert(
            "Potvrdenie",
            "Úspešne Ste pridali nového psa.",
            [
              {
                text: "Zavrieť",
                onPress: () => navigation.navigate('Profil používateľa', {token: token, shelter: true}),
                style: "cancel"
              }
            ]
          );
        })
        .catch((error)=> {
          console.log(error);
        })
      }
      else
        console.log(json.message);
    })
  }  
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={[styles.form, {marginTop: 20}]}>
          <Text style={styles.form_info}>Meno</Text>
          <TextInput style={styles.form_item} placeholder="Zadajte meno" onChangeText={(value) => {setName(value)}} />

          <Text style={styles.form_info}>Plemeno</Text>
          <TextInput style={styles.form_item} placeholder="Zadajte plemeno" onChangeText={(value) => {setBreed(value)}} />

          <Text style={styles.form_info}>Vek</Text>
          <TextInput style={styles.form_item} placeholder="Zadajte vek" onChangeText={(value) => {setAge(value)}} />

          <Text style={styles.form_info}>Zdravotný stav</Text>
          <TextInput style={styles.form_item} placeholder="Zadajte zdravotný stav" onChangeText={(value) => {setHealth(value)}} />

          <Text style={styles.form_info}>Ďalšie informácie</Text>
          <TextInput style={[styles.form_item, styles.form_item_multiline]} multiline={true} placeholder="Zadajte ďalšie informácie" 
            onChangeText={(value) => {setDetails(value)}} />

          <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={select_image}>
              <Text style={styles.button_text}>Vybrať obrázok</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {marginTop: 0}]} onPress={create_dog}>
              <Text style={styles.button_text}>Pridať psa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddDogScreen;