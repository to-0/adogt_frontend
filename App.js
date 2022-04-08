import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import styles from './styles'
import LoginScreen from './screens/LoginScreen';
import HomeStackScreen from './HomeScreenStack';
import AccountScreen from './screens/AccountScreen';
import RegisterScreen from './screens/RegisterScreen';
import FormsScreen from './screens/FormsScreen';
import FormStackScreen from './FormScreenStack';

const HOST = '192.168.1.23'
export {HOST}

// toto robi ze sa to stackuje a je tam vzdy moznost ist spat ale da sa to zmenit, potom mozeme dat nejaky tab navigation... 
//https://reactnavigation.org/docs/bottom-tab-navigator toto tam chceme potom ale nejako to o-ifovat aby pokial sa neprihlasi videl len ten login
//stack by sme mohli pouzit ale ked klika zase z psa na detail psa, formular a tak aby sa vzdy mohol vratit naspat a aby tie data boli ulozene a nerobilo sa kazdy krat request na backend len nvm ako este

const Tab = createBottomTabNavigator();

function App() {
  const [token, setToken] = React.useState(undefined);
  const [shelter,setShelter] = React.useState(false);
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [dog,setDog] = React.useState(undefined)
  console.log(HOST);
  
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
          <Tab.Screen name="Psy" component={HomeStackScreen} initialParams={{"token": token, "shelter":shelter}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/dogIcon.png')} />},
              headerShown: false
            }}>
          </Tab.Screen>
    
          <Tab.Screen name="Profil" component={AccountScreen} initialParams={{ "token": token, "shelter":shelter, "username":username, "email":email, setToken: setToken}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/accountIcon.png')} />}
            }}/>
      
          <Tab.Screen name="Formuláre" component={FormStackScreen} initialParams={{ "token": token, "shelter":shelter }}
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