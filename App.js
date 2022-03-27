
import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen({route, navigation}){
  
  var initialVal = [{id: 0, name:'nic'}]
  const [dogs, setDogs] = React.useState(initialVal)
  const renderImage = (raw_data) => {
      return `data:image/png;base64,${raw_data}`
  }
  //https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad 
  React.useEffect(()=>{
    const token = route.params.token;
    fetch(`http://localhost:8000/dogs/getAll?token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      var temp = []
      console.log(json);
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
    <View style={styles_home.item}>
      <Text style={styles_home.item_title}>{item.name}</Text>
      <Text>{item.age}</Text>
      <Text>{item.breed}</Text>
    </View>
  );
  return (
    <View>
      {/* <Text>${token}</Text>
      {dogs.map((dog) => (
        <Text>{dog.name}</Text>
      ))}
      */}
      <FlatList
        data={dogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        />

    </View>
  );
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
    fetch(`http://localhost:8000/users/signUser?username=${username}&password=${pass}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      route.params.setToken(json.token)
      // navigation.navigate({
      //   name: 'Home',
      //   params: { "token": json.token },
      //   merge: true,
      // });
      
    })
    .catch((error) => {
      console.error(error);
    });

  }
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles2.title}>Vitajte v Adogt</Text>
      <Text> Meno </Text>
      <TextInput placeholder='Meno' onChangeText={(value) => setusername(value)} style={styles2.form}/>
      <Text> Heslo </Text>
      <TextInput placeholder='Heslo' onChangeText={(value) => setPass(value)} style={styles2.form}/>
      <Button title="Login" onPress={button_login} style={styles2.butt}/>
      <Text style={{color:'blue'}} onPress={ () => navigation.navigate('Register',{test:"this is test"}) } > Zaregistrovat sa!</Text>
    </View>
      );
}
// toto robi ze sa to stackuje a je tam vzdy moznost ist spat ale da sa to zmenit, potom mozeme dat nejaky tab navigation... 
//https://reactnavigation.org/docs/bottom-tab-navigator toto tam chceme potom ale nejako to o-ifovat aby pokial sa neprihlasi videl len ten login
//stack by sme mohli pouzit ale ked klika zase z psa na detail psa, formular a tak aby sa vzdy mohol vratit naspat a aby tie data boli ulozene a nerobilo sa kazdy krat request na backend len nvm ako este
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [token, setToken] = React.useState(undefined);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {token == undefined ? (
          <>
          <Tab.Screen name="Login" component={LoginScreen} initialParams={{ setToken: setToken }}/>
          <Tab.Screen name="Register" component={RegisterScreen}  initialParams={{ setToken: setToken }}/>
          </>
          
        ):(
          <>
          <Tab.Screen name="Home" component={HomeScreen} initialParams={{ "token": token }}/>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles2 = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    borderColor: 'black',
    border:1,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
  },
  butt:{
    margin:20,
  }
});
const styles_home = StyleSheet.create({
  item: {
    backgroundColor: '#5cd8fa',
    padding: 20,
    marginVertical:8,
    marginHorizontal:10
  },
  item_title: {
    fontSize: 25,
    fontFamily: 'bold'
  }
});

export default App;