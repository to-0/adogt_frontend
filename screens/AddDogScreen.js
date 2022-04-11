import * as React from 'react';
import { View, TextInput, Button, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from '../styles'
import {HOST} from '../App.js';
import HomeScreen from './HomeScreen';

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

    fetch(`http:/${HOST}:8000/dogs/addDog?token=${token}`, {
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
        dog_id = json.id

        const options = {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
        }
        FileSystem.uploadAsync(`http://${HOST}:8000/image/insert?token=${token}&dog_id=${dog_id}`,localUri,options)
        .then((response)=>{
          alert(response.body);
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
    <View>
        <TextInput placeholder='Meno' onChangeText={(value) => setName(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
        <TextInput placeholder='Plemeno' onChangeText={(value) => setBreed(value)} style={styles.form}/>
        <TextInput placeholder='Vek' onChangeText={(value) => setAge(value)}  style={styles.form}/>
        <TextInput placeholder='Zdravotny stav' onChangeText={(value) => setHealth(value)}  style={styles.form}/>
        <TextInput placeholder='Detaily o' onChangeText={(value) => setDetails(value)}  style={styles.form}/>
        <Button  style={styles.button} title='Vybrat obrazok' onPress={select_image}/>
        <Button  style={styles.button} title='Pridat psa do databazy' onPress={create_dog}/>
    </View>
  )
}
export default AddDogScreen;