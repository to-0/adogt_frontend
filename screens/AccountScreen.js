import * as React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';

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
  };

  const create_call = () => {
    if (roomId == null || roomId == '') {
      Toast.show('Je potrebné vyplniť názov miestnosti', {
        duration: Toast.durations.LONG,
      });
      return;
    }
    navigation.navigate('Videohovor ',{"roomId":roomId});
  };

  const join_call = () => {
    if (roomId == null || roomId == '') {
      Toast.show('Je potrebné vyplniť názov miestnosti', {
        duration: Toast.durations.LONG,
      });
      return;
    }
    navigation.navigate('Videohovor',{"roomId":roomId});
  }


  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={[styles.center_view, {height: (Dimensions.get('window').height * 0.85)}]}>
          <Image style={styles.profile_icon} source={require('../img/profileIcon.png')} />

          <View style={styles.profile_text_fields}>
            <Text style={styles.profile_text}>Meno: {username}</Text>
            <Text style={styles.profile_text}>E-mail: {email}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.form_info}>Názov miestnosti</Text>
            <TextInput style={styles.form_item} placeholder="Zadajte názov miestnosti" onChangeText={(value) => {setRoom(value)}}/>
          </View>
            
          <TouchableOpacity style={[styles.button, {margin: 0, width: Dimensions.get('window').width * 0.8}]} onPress={create_call}>
            <Text style={styles.button_text}>Vytvoriť miestnosť</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {width: Dimensions.get('window').width * 0.8}]} onPress={join_call}>
            <Text style={styles.button_text}>Pridať sa do miestnosti</Text>
          </TouchableOpacity>

          {shelter == true ? (
            <>
            <TouchableOpacity style={[styles.button, {marginBottom: 0, width: Dimensions.get('window').width * 0.8}]} onPress={()=> navigation.navigate('Pridať psa')}>
              <Text style={styles.button_text}>Pridanie psa</Text>
            </TouchableOpacity>
            </>
          ): <></>}

          <TouchableOpacity style={[styles.button, {marginBottom: 30, width: Dimensions.get('window').width * 0.8}]} onPress={logout_function}>
            <Text style={styles.button_text}>Odhlásiť sa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AccountScreen;