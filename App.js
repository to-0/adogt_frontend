import * as React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import styles from './styles';
import LoginScreen from './screens/LoginScreen';
import HomeStackScreen from './HomeScreenStack';
import RegisterScreen from './screens/RegisterScreen';
import FormStackScreen from './FormScreenStack';
import AccountStackScreen from './AccountScreenStack';
import OptionsScreen from './screens/OptionsScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Each child in a list should have a unique "key" prop.',
  'Possible Unhandled Promise Rejection',
  'Can\'t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.'
]);
const Tab = createBottomTabNavigator();

function App() {
  const [token, setToken] = React.useState(undefined);
  const [shelter,setShelter] = React.useState(false);
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const dog = undefined;
  const dog_id = -1;
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {token == undefined ? (
          <>
          <Tab.Screen name="Prihlásenie" component={LoginScreen} initialParams={{ setToken: setToken, setShelter: setShelter, setUsername: setUsername, setEmail: setEmail, "email": email }}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Prihlásenie</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/loginIcon.jpg')} />},
              headerShown: false
            }}
          />
          <Tab.Screen name="Registrácia" component={RegisterScreen}  initialParams={{ setToken: setToken, setShelter: setShelter, setEmail: setEmail, setUsername: setUsername }}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Registrácia</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/registerIcon.jpg')} />},
              headerShown: false
            }}
          />
          <Tab.Screen name="Nastavenia" component={OptionsScreen}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Nastavenia</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/settings.png')} />},
              headerShown: false
            }}
          />
          </>
        ):(
          <>
          <Tab.Screen name="Psy" component={HomeStackScreen} initialParams={{"token": token, "shelter":shelter, "dog": dog, "id": dog_id}}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Psy</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/dogIcon.png')} />},
              headerShown: false
            }}>
          </Tab.Screen>
    
          <Tab.Screen name="Profil" component={AccountStackScreen} initialParams={{ "token": token, "shelter":shelter, "username":username, "email":email, setToken: setToken}}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Profil</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/accountIcon.png')} />},
              headerShown: false
            }}/>
      
          <Tab.Screen name="Formuláre" component={FormStackScreen} initialParams={{ "token": token, "shelter":shelter }}
            options={{
              tabBarLabel:({ focused })=>(<Text style={{color:focused?"#f76226":"black", fontSize: 11}}>Formuláre</Text>),
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/formsIcon.jpg')} />},
              headerShown: false
            }}/>
          </>
        )} 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;