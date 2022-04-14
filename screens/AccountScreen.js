import * as React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import styles from '../styles'
import {Globals} from '../Globals'

function AccountScreen({route, navigation}){
  const token = route.params.token;
  const shelter = route.params.shelter;
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [roomId, setRoom] = React.useState('');

  const logout_function = ()=> {
    fetch(`http://${Globals.host}:8000/users/logout?token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      route.params.setToken(undefined)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const test = async () => {
    const devices = await mediaDevices.enumerateDevices();
    console.log(devices)
  }
  
  React.useEffect(()=>{
    setUsername(route.params.username);
    setEmail(route.params.email);
  }, []);

  return (
      <View style={[styles.center_view, {height: (Dimensions.get('window').height)}]}>
      <Image style={styles.profile_icon} source={require('../img/profileIcon.png')} />
      <View style={styles.profile_text_fields}>
        <Text style={styles.profile_text}>Meno: {username}</Text>
        <Text style={styles.profile_text}>E-mail: {email}</Text>
      </View>

      <View style={[styles.dog_form, {marginBottom: 0, width: (Dimensions.get('window').width) * 0.7}]}>
        <Text style={styles.dog_form_info}>Názov miestnosti</Text>
        <TextInput style={[styles.dog_form_item, {width: (Dimensions.get('window').width) * 0.6}]} onChangeText={(value) => {setRoom(value)}}/>
      </View>
        
          <TouchableOpacity style={[styles.button, {marginBottom: 0, marginTop: 10}]} onPress={() => navigation.navigate('Videohovor ',{"roomId":roomId})}>
            <Text style={styles.button_text}>Vytvoriť miestnosť</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Videohovor',{"roomId":roomId})}>
            <Text style={styles.button_text}>Pridať sa do miestnosti</Text>
          </TouchableOpacity>

          {shelter == true ? (
        <>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity style={[styles.button, {marginBottom: 0}]} onPress={()=> navigation.navigate('Pridať psa')}>
            <Text style={styles.button_text}>Pridanie psa</Text>
          </TouchableOpacity>
        </View>
        </>
      ): 
      <>
      </>
      }
      <View style={{justifyContent: 'flex-end'}}>
        <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={logout_function}>
          <Text style={styles.button_text}>Odhlásiť sa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AccountScreen;