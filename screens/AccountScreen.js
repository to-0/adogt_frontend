import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
const HOST = '192.168.1.14'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();
function AddDog({route}){
  const [name,setName] = React.useState('');
  const [breed,setBreed] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [health,setHealth] = React.useState('');
  const [age,setAge] = React.useState('');
  let localUri = '';
  const select_image = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    if (result.cancelled) {
      return;
    }
    localUri = result.uri;
  };
  const create_dog = () => {
    fetch(`http:/${HOST}:8000/dogs/addDog?token=${route.params.token}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `name=${name}&breed=${breed}&age=${age}&health=${health}&details=${details}`
      // JSON.stringify({
      //   "name": name,
      //   "breed": breed,
      //   "age": age,
      //   "health": health,
      //   "details": details,
      // })
    })
    .then((response) => response.json())
    .then((json)=> {
      if(json.message == "OK"){
        console.log(json)
        dog_id = json.id
        const options = {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
          }
        FileSystem.uploadAsync(`http://${HOST}:8000/image/insert?token=${route.params.token}&dog_id=${dog_id}`,localUri,options)
        .then((response)=>{
          console.log(response.body);
          alert(response.body);
        })
        .catch((error)=> {
          console.log(error);
        })
      }
      else{
        alert(json.message);
      }
      
    })
  }
    
    
    // todo zmenit dog id, mozno prerobit na backende call
    
  
  return (
    <View>
       <TextInput placeholder='Meno' onChangeText={(value) => setName(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
       <TextInput placeholder='Plemeno' onChangeText={(value) => setBreed(value)}  style={styles.form}/>
       <TextInput placeholder='Vek' onChangeText={(value) => setAge(value)}  style={styles.form}/>
       <TextInput placeholder='Zdravotny stav' onChangeText={(value) => setHealth(value)}  style={styles.form}/>
       <TextInput placeholder='Detaily o' onChangeText={(value) => setDetails(value)}  style={styles.form}/>
       <Button  style={styles.button} title='Vybrat obrazok' onPress={select_image}/>
       <Button  style={styles.button} title='Pridat psa do databazy' onPress={create_dog}/>
    </View>
  )
}
function Profil_info({route, navigation}){
  console.log("Profil info")
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
  const shelter = route.params.shelter;
  React.useEffect(()=>{
    setUsername(route.params.username);
    setEmail(route.params.email);
    console.log("params" + route.params.email);
  }, [])
    console.log("Pred return");
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', height: (Dimensions.get('window').height)}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style={styles.profile_icon} source={require('../img/profileIcon.png')} />
          <View style={styles.profile_text_fields}>
            <Text style={styles.profile_text}>{username}</Text>
            <Text style={styles.profile_text}>{email}</Text>
          </View>
        </View>
        {shelter == true ? (
          <>
          <Button title="Pridat psa" onPress={()=> navigation.navigate('Pridat psa')}></Button>
          </>
        ): 
        <>
        </>
        }
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={[styles.button, {marginBottom: 30}]} >
            <Button title='Logout' onPress={logout_function} color='#f76226' />
          </View>
        </View>
        <Text>TU</Text>
      </View>
      )
}

function AccountScreen({route, navigation}) {
  const shelter = route.params.shelter;
    return (
        <Stack.Navigator> 
            <Stack.Screen name="Profil_info" options={{ headerShown: false }} component={Profil_info} initialParams={{setToken: route.params.setToken, "token": route.params.token, "shelter": route.params.shelter, "email": route.params.email, "username": route.params.username}} />
        {shelter == true ? (
          <>
          <Stack.Screen
                name="Pridat psa"
                component={AddDog}
                initialParams={{setToken: route.params.setToken, "token": route.params.token, "shelter": route.params.shelter, "email": route.params.email, "username": route.params.username}}
              />
          </>
        ): 
        <>
        </>
        }
        </Stack.Navigator>
    )
  }
  export default AccountScreen