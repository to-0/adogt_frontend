import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './styles'


const HOST = '192.168.1.18'
function HomeScreen({route, navigation}){
  var initialVal = [{id: 0, name:'nic'}]
  const [dogs, setDogs] = React.useState(initialVal)
  const renderImage = (raw_data) => {
      return `data:image/png;base64,${raw_data}`
  }
  var dog_images = {
    1: require('./img/baset.jpg'),
    2: require('./img/bigl.jpg'),
    3: require('./img/dobermann.jpg'),
    4: require('./img/jackRussel.jpg'),
    5: require('./img/vlciak.jpg'),
    6: require('./img/jazvecik.jpg'),
    7: require('./img/bulldog.jpg'),
    8: require('./img/mops.jpg'),
    9: require('./img/doga.jpg'),
    10: require('./img/labrador.jpg')
  };
  //https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad 
  const get_dog_image = (dog_id) => {
    fetch(`http://${HOST}:8000/images?token=${token}&dog_id=${dog_id}`,)
    .then((response) => response.json())
    .then((json)=> {
      if(json.message === "ok"){
        console.log(json.data);
        return json.data;
      }
      else {
        return '';
      }
    })
  }
  React.useEffect(()=>{
    const token = route.params.token;
    fetch(`http://${HOST}:8000/dogs/getAll?token=${token}`, {
      method: 'get',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      var temp = []
      for(var i=0;i<json.length;i++){
        temp.push(json[i]);
      }
      console.log("Temp",temp)
      setDogs(temp);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  // tu musi byt item nie dog lebo tak funguje ten flatlist...
  const renderItem = ({ item })=> (
    <View>
      {/* <Image style={styles.item_image} source={dog_images[item.id]} /> */}
        <Image style={styles.item_image} source={item.data == '' ? dog_images[item.id]: {uri: `data:${item.image_type};base64,${item.data}`}} />

      <View style={styles.item}>

        <View style={{flex: 3}}>
          <Text style={styles.item_title}>{item.name}</Text>
          <Text style={styles.item_text}>Vek: {item.age} roky</Text>
          <Text style={styles.item_text}>Plemeno: {item.breed}</Text>
        </View>

        <View style={{flex: 1}}>
          <Image style={styles.icon} source={require('./img/informationIcon.png')} />
        </View>

      </View>             
    </View>
     
  );
  return (
    <View>
      <FlatList
        data={dogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        />

    </View>
  );
}

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
        <Image style={styles.profile_icon} source={require('./img/profileIcon.png')} />

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

function FormsScreen({route, navigation}) {

}

function RegisterScreen({route,navigation}){
  console.log(route.params);
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
}


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
      <ImageBackground source={require('./img/background.webp')} resizeMode="cover" style={styles.background_image}>
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
// toto robi ze sa to stackuje a je tam vzdy moznost ist spat ale da sa to zmenit, potom mozeme dat nejaky tab navigation... 
//https://reactnavigation.org/docs/bottom-tab-navigator toto tam chceme potom ale nejako to o-ifovat aby pokial sa neprihlasi videl len ten login
//stack by sme mohli pouzit ale ked klika zase z psa na detail psa, formular a tak aby sa vzdy mohol vratit naspat a aby tie data boli ulozene a nerobilo sa kazdy krat request na backend len nvm ako este
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [token, setToken] = React.useState(undefined);
  const [shelter,setShelter] = React.useState(false);
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  console.log(HOST);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {token == undefined ? (
          <>
          <Tab.Screen name="Login" component={LoginScreen} initialParams={{ setToken: setToken, setShelter: setShelter, setUsername: setUsername, setEmail: setEmail, "email": email }}/>
          <Tab.Screen name="Register" component={RegisterScreen}  initialParams={{ setToken: setToken, setShelter: setShelter, setEmail: setEmail }}/>
          </>
          
        ):(
          <>
          <Tab.Screen name="Prehľad psov" component={HomeScreen} initialParams={{ "token": token, "shelter":shelter}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/dogIcon.png')} />}
            }}/>
    
          <Tab.Screen name="Profil" component={AccountScreen} initialParams={{ "token": token, "shelter":shelter, "username":username, "email":email, setToken: setToken}}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/accountIcon.png')} />}
            }}/>
      
          <Tab.Screen name="Formuláre" component={FormsScreen} initialParams={{ "token": token }}
            options={{
              tabBarIcon: () => {return <Image style={styles.navigation_icon} source={require('./img/formsIcon.jpg')} />}
            }}/>
          </>
        )} 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(App, () => App);
export default App;