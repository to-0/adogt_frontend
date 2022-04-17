import * as React from 'react';
import { Text, TextInput, Dimensions, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-simple-toast';

import styles from '../styles';
import {Globals} from '../Globals';

function LoginScreen({route, navigation}) {
    const [username, setusername] = React.useState('');
    const [pass, setPass] = React.useState('');

    const button_login = () => {    
      if (username == '' || pass == '') {
        Toast.show('Chýbajúce prihlasovacie údaje', Toast.LONG);
        return;
      }
      
      fetch(`http://${Globals.host}:8000/users/signUser?username=${username}&password=${pass}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.message != "OK") {
          Toast.show('Nesprávne prihlasovacie údaje', Toast.LONG);
        }

        route.params.setShelter(json.shelter);
        route.params.setUsername(username);
        route.params.setEmail(json.email);
        route.params.setToken(json.token);
        console.log(json.email);
        console.log(json.username);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    
    return (
      <RootSiblingParent>
        <ImageBackground source={require('../img/background.webp')} resizeMode="cover" style={styles.background_image}>
          {/*Zdroj obrazku: https://cutewallpaper.org/download.php?file=/22/dog-drawings-wallpapers/2326221784.jpg */}
          <KeyboardAvoidingView style={styles.center_view}>

            <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.23}]}>
              Vitajte v Adogt
            </Text>
            <TextInput placeholder='Meno' onChangeText={(value) => setusername(value)} style={[styles.login_form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
            <TextInput placeholder='Heslo' onChangeText={(value) => setPass(value)} secureTextEntry={true} style={styles.login_form}/>

            <TouchableOpacity style={styles.button} onPress={button_login}>
                <Text style={styles.button_text}>Prihlásiť sa</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => navigation.navigate('Registrácia') }>
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