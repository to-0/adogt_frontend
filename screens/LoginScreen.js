import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
const HOST = '192.168.1.14'

function LoginScreen({route, navigation}) {
    //toto su tie hodnoty, username je hodnota a setusername je ako keby metoda kde nastavime tu hodnotu, nieco ako premenna a su to nejake hooks... nvm 
    // proste to je hook na state lebo to ma nejaky stav a potom ked sa zmeni stav tak sa to znova vyrenderuje
    const [username, setusername] = React.useState('');
    const [pass, setPass] = React.useState('');
    const button_login = () => {    
      // TODO zmenit url na komp lebo potom to nepojde z mobilu 
      fetch(`http://${HOST}:8000/users/signUser?username=${username}&password=${pass}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
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
        <ImageBackground source={require('../img/background.webp')} resizeMode="cover" style={styles.background_image}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.15}]}>
              Vitajte v Adogt
            </Text>
            <TextInput placeholder='Meno' onChangeText={(value) => setusername(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
            <TextInput placeholder='Heslo' onChangeText={(value) => setPass(value)} secureTextEntry={true} style={styles.form}/>
            <View style={styles.button}>
              <Button title="Prihlásiť sa" onPress={button_login} color='#f76226'/>
            </View>
            <Text style={[styles.link, {marginBottom: (Dimensions.get('window').height) * 0.05}]} onPress={ () => navigation.navigate('Register',{test:"this is test"}) }>
              Zaregistrovať sa!
            </Text>
          </View>
        </ImageBackground>
        );
  }
  export default LoginScreen;