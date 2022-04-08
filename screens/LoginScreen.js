import * as React from 'react';
import { useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

function LoginScreen({route, navigation}) {
    //toto su tie hodnoty, username je hodnota a setusername je ako keby metoda kde nastavime tu hodnotu, nieco ako premenna a su to nejake hooks... nvm 
    // proste to je hook na state lebo to ma nejaky stav a potom ked sa zmeni stav tak sa to znova vyrenderuje
    const [username, setusername] = React.useState('');
    const [pass, setPass] = React.useState('');
    const button_login = () => {    
      if (username == '' || pass == '') {
        let toast = Toast.show('Chýbajúce prihlasovacie údaje', {
          duration: Toast.durations.LONG,
        });
        return;
      }
      // TODO zmenit url na komp lebo potom to nepojde z mobilu 
      fetch(`http://${HOST}:8000/users/signUser?username=${username}&password=${pass}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.message != undefined) {
          let toast = Toast.show('Nesprávne prihlasovacie údaje', {
            duration: Toast.durations.LONG,
          });
        }
        route.params.setShelter(json.shelter);
        route.params.setUsername(username);
        route.params.setEmail(json.email);
        route.params.setToken(json.token);
        console.log(json.email);
        console.log(json.username);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    return (
        <RootSiblingParent>
          <ImageBackground source={require('../img/background.webp')} resizeMode="cover" style={styles.background_image}>
            <KeyboardAvoidingView style={styles.center_view}>
              <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.23}]}>
                Vitajte v Adogt
              </Text>
              <TextInput placeholder='Meno' onChangeText={(value) => setusername(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
              <TextInput placeholder='Heslo' onChangeText={(value) => setPass(value)} secureTextEntry={true} style={styles.form}/>

              <TouchableOpacity style={styles.button} onPress={button_login}>
                  <Text style={styles.button_text}>Prihlásiť sa</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => navigation.navigate('Registrácia',{test:"this is test"}) }>
                <Text style={[styles.link, {marginBottom: (Dimensions.get('window').height) * 0.05}]}>
                  Zaregistrovať sa!
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ImageBackground>
        </RootSiblingParent>
        );
  }
  export default LoginScreen;