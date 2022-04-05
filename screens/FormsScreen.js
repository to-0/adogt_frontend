import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import {HOST} from '../App.js';


function FormsList({route, navigation}) {
  const [forms,setForms] = React.useState([])
    React.useEffect(()=>{
        const token = route.params.token;
        fetch(`http://${HOST}:8000/forms/getAll?token=${token}`, {
          method: 'get',
          headers: {
          'Accept': 'application/json, text/plain, */*', 
          'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((json) => {
          var temp = []
          for(var i=0;i<json.length;i++){
            temp.push(json[i]);
          }
          setForms(temp);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])
      const renderItem = ({ item })=> (
        <View>
          <View style={styles.item}>
          <TouchableOpacity onPress={()=>{navigation.navigate('FormDetail',{data:item})}}>
            <View style={{flex: 3}}>
            
              <Text style={styles.item_title}>Formulár ID: {item.id}</Text>
            
              <Text style={styles.item_text}>Čas: {item.created_at.substring(0,10)}</Text>
            </View>
            </TouchableOpacity>
            
            <View style={{flex: 1}}>
              <Image value={item.id} style={styles.icon} source={require('../img/informationIcon.png')} />
            </View>
    
          </View>             
        </View> 
        );
        return(
            <View>
            <FlatList
            data={forms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} 
            />
        </View>
        )
}

function FormDetail ({route, navigation}){
  const data = route.params.data;
  const token = route.params.token;
  const [details, setDetails]= React.useState('');
  const [finished, setFinished] = React.useState(false);
  const delete_form = ()=> {
    fetch(`http://${HOST}:8000/forms/delete?token=${token}&form_id=${data.id}`,{
      method: 'DELETE'
    })
    .then((response)=>response.json())
    .then((json)=>{
      alert(json.message)
    })
    .catch((error)=>{
      alert(error);
    })
  }
  React.useEffect(()=>{
    const token = route.params.token;
    fetch(`http://${HOST}:8000/forms/detail?token=${token}&form_id=${data.id}`, {
      method: 'get',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setDetails(json.details);
      setFinished(json.finished);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  return (
    <ImageBackground source={require('../img/background.webp')} resizeMode="cover" style={styles.background_image}>
    <View style={{flex: 1,alignItems:'center',justifyContent:'flex-start', height: (Dimensions.get('window').height)}}>
      <Text style={styles.title}>Formulár s ID: {data.id}</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Detaily</Text>
      <Text>{details}</Text>
      <Text>ID psa: {data.dog_id}</Text>
      <Text>Vytvorený {data.created_at.substring(0,10)}</Text>
      <Text>Stav ukončenia {finished}</Text>
      <View>
      {route.params.shelter == false ? (
          <>
          <Button title='Upraviť formulár' 
          style={{margin: 20}} onPress={()=> {navigation.navigate('UpdateForm',{"form_id":data.id})}}
          color='#f76226'
          /> 
          </>
        )
        : (<></>)
      }
      <Button title='Vymazať formulár'  style={{margin: 20}} onPress={delete_form}
      color='#f76226'
      /> 
      </View>
      
    </View>
    </ImageBackground>
  )
}



function UpdateForm({route,navigation}){
  const [finished,setFinished] = React.useState(false);
  const [details,setDetails] = React.useState('');
  const editForm = ()=>{
    var updatebody = {
      'details': details,
      'finished': finished
    }
    console.log(details, finished);
    console.log(route.params.form_id)
    fetch(`http://${HOST}:8000/forms/edit?token=${route.params.token}&form_id=${route.params.form_id}`,{
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        // 'Content-Type':'application/json'
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `details=${details}&finished=${finished}`
    })
    .then((response)=> response.json())
    .then((json) =>{
      console.log(json);
      alert(json.message)
    })
    .catch((error)=>{
      console.log(error);
      alert("something went wrong");
    })
  }
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <TextInput placeholder='Detaily' onChangeText={(value) => setDetails(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
      <Checkbox
      value={finished}
      onValueChange={(newValue) => setFinished(newValue)}
      />
      <Button style={styles.button} title="Upravit" onPress={editForm}/>
    </View>
  )
}
const FormStack = createNativeStackNavigator();
function FormsScreen({route, navigation}) {
  const token = route.params.token
  return (
    <FormStack.Navigator> 
        <FormStack.Screen name="FormList"  options={{ headerShown: false }} component={FormsList} initialParams={{"token": route.params.token}} />
        <FormStack.Screen name="FormDetail" component={FormDetail} initialParams={{"token": route.params.token,"shelter":route.params.shelter}} />
        <FormStack.Screen name="UpdateForm" component={UpdateForm} initialParams={{"token": route.params.token, "shelter":route.params.shelter}} />
    </FormStack.Navigator>
)
}
export default FormsScreen