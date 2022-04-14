import * as React from 'react';
import { View, TextInput, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from '../styles'
import {Globals} from '../Globals';

function AddDogScreen({route}){
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
        var dog_id = json.id

        const options = {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
        }
        FileSystem.uploadAsync(`http://${Globals.host}:8000/image/insert?token=${token}&dog_id=${dog_id}`,localUri,options)
        .then((response)=>{
          Alert.alert(
            "Potvrdenie",
            json.message,
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
        alert(json.message);
    })
  }  
  return (
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

        <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={select_image}>
            <Text style={styles.button_text}>Vybrať obrázok</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {marginTop: 0}]} onPress={create_dog}>
            <Text style={styles.button_text}>Pridať psa</Text>
        </TouchableOpacity>
    </View>
  )
}

const localStyles = StyleSheet.create({
  form: {
    width: (Dimensions.get('window').width) * 0.6,
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
  },
  button: {

  }
})
export default AddDogScreen;