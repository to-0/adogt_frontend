import * as React from 'react';
import { AppRegistry, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import styles from './styles'
import LoginScreen from './screens/LoginScreen';
import HomeStackScreen from './HomeScreenStack';
import RegisterScreen from './screens/RegisterScreen';
import FormStackScreen from './FormScreenStack';
import AccountStackScreen from './AccountScreenStack';

const HOST = '192.168.0.124';
export {HOST};

const Tab = createBottomTabNavigator();

function App() {
  const [token, setToken] = React.useState(undefined);
  const [shelter,setShelter] = React.useState(false);
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [dog,setDog] = React.useState(undefined);
  const [dog_id,setDogId] = React.useState(-1);
  const [form_id,setFormId] = React.useState(-1);
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {token == undefined ? (
          <>
          <Tab.Screen name="Prihlásenie" component={LoginScreen} initialParams={{ setToken: setToken, setShelter: setShelter, setUsername: setUsername, setEmail: setEmail, "email": email }}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/loginIcon.jpg')} />},
              headerShown: false
            }}
          />
          <Tab.Screen name="Registrácia" component={RegisterScreen}  initialParams={{ setToken: setToken, setShelter: setShelter, setEmail: setEmail, setUsername: setUsername }}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/registerIcon.jpg')} />},
              headerShown: false
            }}
          />
          </>
        ):(
          <>
          <Tab.Screen name="Psy" component={HomeStackScreen} initialParams={{"token": token, "shelter":shelter, "dog": dog, "id": dog_id}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/dogIcon.png')} />},
              headerShown: false
            }}>
          </Tab.Screen>
    
          <Tab.Screen name="Profil" component={AccountStackScreen} initialParams={{ "token": token, "shelter":shelter, "username":username, "email":email, setToken: setToken}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/accountIcon.png')} />},
              headerShown: false
            }}/>
      
          <Tab.Screen name="Formuláre" component={FormStackScreen} initialParams={{ "token": token, "shelter":shelter, "id": form_id, setFormId: setFormId }}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/formsIcon.jpg')} />},
              headerShown: false
            }}/>
          </>
        )} 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(App, () => App);
export default App;