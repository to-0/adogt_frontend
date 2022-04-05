import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';
import Checkbox from 'expo-checkbox';

function RegisterScreen({route,navigation}){
  const [username,setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [sh, setSh] = React.useState(false);
  console.log(route.params);
  const register_user = () => {
    var postBody = {
      "username": username,
      "email": email,
      "password": password,
      "shelter": sh
    }
    fetch(`http://${HOST}:8000/users/register`,{
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
    <ImageBackground source={require('../img/background.webp')} resizeMode="cover" style={styles.background_image}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.15}]}>Registrácia</Text>
      <TextInput placeholder='Meno' onChangeText={(value) => setUsername(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
      <TextInput placeholder='Email' onChangeText={(value) => setPassword(value)} style={[styles.form]}/>
      <TextInput placeholder='Heslo' onChangeText={(value) => setEmail(value)} secureTextEntry={true} style={styles.form}/>
      <Text>Útulok</Text>
      <Checkbox
      value={sh}
      onValueChange={(newValue) => setSh(newValue)}
      style={{marginTop:(Dimensions.get('window').height) * 0.01}}
      />
      <Button style={[styles.button,{marginTop: (Dimensions.get('window').height) * 0.02}]} 
      title='Zaregistrovať sa'
      onPress={register_user}
      color='#f76226'/>
    </View>
    </ImageBackground>
  )
}
export default RegisterScreen;