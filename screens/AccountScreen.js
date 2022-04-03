import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
const HOST = '192.168.1.18'

function AccountScreen({route, navigation}) {
    const logout_function = ()=> {
      fetch(`http://${HOST}:8000/users/logout?token=${route.params.token}`)
      .then((response) => response.json())
      .then((json) => {
        route.params.setToken(undefined)
      })
      .catch((error) => {
        console.error(error);
      });
    }
    const [username,setUsername] = React.useState('')
    const [email,setEmail] = React.useState('')
    React.useEffect(()=>{
      setUsername(route.params.username);
      setEmail(route.params.email);
      console.log("params" + route.params.email);
      console.log(username);
    }, [])
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', height: (Dimensions.get('window').height)}}>
  
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style={styles.profile_icon} source={require('../img/profileIcon.png')} />
  
          <View style={styles.profile_text_fields}>
            <Text style={styles.profile_text}>{username}</Text>
            <Text style={styles.profile_text}>{email}</Text>
          </View>
  
        </View>
  
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={[styles.button, {marginBottom: 30}]} >
            <Button title='Logout' onPress={logout_function} color='#f76226' />
          </View>
        </View>
        
      </View>
    )
  }
  export default AccountScreen