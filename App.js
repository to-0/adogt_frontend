
import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react/cjs/react.production.min';

// toto sa ale ze uplne zosypalo ked som to skusal tak nvm,
// class HomeScreen extends React.Component{
//   constructor(navigation, ){
//     const { navigation } = this.props;
    //nvm ako dostat token
//     const token = this.props.route.params;
//   }
//   componentDidMount(){
//     fetch(`http://localhost:8000/dogs/getAll?token=${token}`)
//     .then((response) => response.json())
//     .then((json) => {
//       for(var i=0;i<json.length;i++){
//         dogs.push(json[i]);
//       }
//       console.log(json)
//       console.log("woof ", dogs)
      
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//     }
//   render(){
//     <View>
//       <Text>${this.token}</Text>
//     </View>
//   }
// }
// class RegisterScreen extends React.Component{
//   render(){
//     const {navigation} = this.props;
//     return (
//       <View>
//         {navigation.getParam('test')}
//       </View>
//     );
//   }
// }

function HomeScreen({route, navigation}){
  console.log(route.params);
  const token = route.params.token;
  var data = "KOKOT"
  const [dogs, setDogs] = React.useState([])
  React.useEffect(()=>{
    fetch(`http://localhost:8000/dogs/getAll?token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      for(var i=0;i<json.length;i++){
        dogs.push(json[i]);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, )
    
  return (
    <View>
      <Text>${token}</Text>
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


function LoginScreen({navigation}) {
  //toto su tie hodnoty, username je hodnota a setusername je ako keby metoda kde nastavime tu hodnotu, nieco ako premenna a su to nejake hooks... nvm 
  const [username, setusername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const button_login = () => {    
    // TODO zmenit url na komp lebo potom to nepojde z mobilu 
    fetch(`http://localhost:8000/users/signUser?username=${username}&password=${pass}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      navigation.navigate('Home',{"token":json.token});
    })
    .catch((error) => {
      console.error(error);
    });

  }
  const test_press = () =>{
    console.log('Stlacil ma')
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
const Stack = createNativeStackNavigator();

function App() {
  //const [token, setToken] = React.useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
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

export default App;