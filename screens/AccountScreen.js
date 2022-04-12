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

      {shelter == true ? (
        <>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity style={[styles.button, {marginBottom: 10}]} onPress={()=> navigation.navigate('Pridať psa')}>
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
        <Text> Room ID </Text>
        <TextInput onChangeText={(value) => setRoom(value)} style={{backgroundColor: 'white'}}/>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={() => navigation.navigate('Create',{"roomId":roomId})}>
            <Text style={styles.button_text}>Vytvoriť miestnosť</Text>
          </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={() => navigation.navigate('Join',{"roomId":roomId})}>
            <Text style={styles.button_text}>Pridať sa do miestnosti</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default AccountScreen;