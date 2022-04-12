import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'
// import {HOST} from '../App.js';
import Checkbox from 'expo-checkbox';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import {Globals} from '../Globals'

function RegisterScreen({route,navigation}){
  const [username,setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [sh, setSh] = React.useState(false);
  
  const register_user = () => {
    if (username == '' || password == '' || email == '') {
      let toast = Toast.show('Chýbajúce údaje', {
        duration: Toast.durations.LONG,
      });
      return;
    }
    var postBody = {
      "username": username,
      "email": email,
      "password": password,
      "shelter": sh
    }
    fetch(`http://${Globals.host}:8000/users/register`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(postBody)
    })
    .then(response => response.json())
    .then((json)=>{
      route.params.setShelter(sh);
      route.params.setUsername(username);
      route.params.setEmail(email);
      route.params.setToken(json.token);
      alert(json.message);
    })
    .catch((error)=> {
      console.log(error);
      alert("Something went wrong.")
  })
  }

  return (
    <RootSiblingParent>
      <ImageBackground source={require('../img/registrationDoggo.png')} resizeMode="cover" style={styles.small_background_image_full_height}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.12}]}>Registrácia</Text>
          <TextInput placeholder='Meno' onChangeText={(value) => setUsername(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
          <TextInput placeholder='Email' onChangeText={(value) => setPassword(value)} style={[styles.form]}/>
          <TextInput placeholder='Heslo' onChangeText={(value) => setEmail(value)} secureTextEntry={true} style={styles.form}/>

          <View style={styles.registration_checkbox_view}>
            <Text>Ste útulok?</Text>
            <Checkbox
            value={sh}
            onValueChange={(newValue) => setSh(newValue)}
            style={styles.checkbox}
            />
          </View>
          
          <TouchableOpacity style={[styles.button, {marginTop: (Dimensions.get('window').height) * 0.02}]} onPress={register_user}>
            <Text style={styles.button_text}>Zaregistrovať sa</Text>
          </TouchableOpacity>
          
        </View>
      </ImageBackground>
    </RootSiblingParent>
  )
}
export default RegisterScreen;