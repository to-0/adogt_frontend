import * as React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';

import styles from '../styles'
import {Globals} from '../Globals'

function AccountScreen({route, navigation}){
  const token = route.params.token;
  const shelter = route.params.shelter;
  const username = route.params.username;
  const email = route.params.email;
  const [roomId, setRoom] = React.useState('');

  const logout_function = ()=> {
    fetch(`http://${Globals.host}:8000/users/logout?token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      route.params.setToken(undefined);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={[styles.center_view, {height: (Dimensions.get('window').height)}]}>
      <Image style={styles.profile_icon} source={require('../img/profileIcon.png')} />

      <View style={styles.profile_text_fields}>
        <Text style={styles.profile_text}>Meno: {username}</Text>
        <Text style={styles.profile_text}>E-mail: {email}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.form_info}>Názov miestnosti</Text>
        <TextInput style={styles.form_item} onChangeText={(value) => {setRoom(value)}}/>
      </View>
        
      <TouchableOpacity style={[styles.button, {margin: 0}]} onPress={() => navigation.navigate('Videohovor ',{"roomId":roomId})}>
        <Text style={styles.button_text}>Vytvoriť miestnosť</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Videohovor',{"roomId":roomId})}>
        <Text style={styles.button_text}>Pridať sa do miestnosti</Text>
      </TouchableOpacity>

      {shelter == true ? (
        <>
        <TouchableOpacity style={[styles.button, {marginBottom: 0}]} onPress={()=> navigation.navigate('Pridať psa')}>
          <Text style={styles.button_text}>Pridanie psa</Text>
        </TouchableOpacity>
        </>
      ): <></>}

      <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={logout_function}>
        <Text style={styles.button_text}>Odhlásiť sa</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen;