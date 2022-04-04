import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
const HOST = '192.168.1.14'


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
            
              <Text style={styles.item_title}>ID: {item.id}</Text>
            
              <Text style={styles.item_text}>Cas: {item.created_at}</Text>
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
  return (
    <View style={{flex: 1,alignItems:'center',justifyContent:'flex-start', height: (Dimensions.get('window').height)}}>
      <Text>ID formulara: {data.id}</Text>
      <Text>ID psa: {data.dog_id}</Text>
      <Text>Detaily</Text>
      <Text>{data.details}</Text>
      <Text>Vytvoreny {data.details}</Text>
      <Text>Ukonceny {data.finished}</Text>
      {route.params.shelter == false ? (
        <>
         <Button title='Upravit formular' style={styles.button} onPress={()=> {navigation.navigate('UpdateForm')}}> </Button>
        </>
      )
      : (<></>)
    }
    <Button title='Vymazat formular'  style={styles.button}> </Button>
     

    </View>
  )
}

const Stack = createNativeStackNavigator();

function UpdateForm({route,navigation}){
  const [finished,setFinished] = React.useState(false);
  const [details,setDetails] = React.useState('');
  const editForm = ()=>{
    var updatebody = {
      'details': details,
      'finished': finished
    }
    fetch(`http://${HOST}:8000/forms/edit?token=${route.params.token}&form_id=${route.params.form_id}`,{
      method: "UPDATE",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(updatebody)
    })
  }
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <TextInput placeholder='Detaily' onChangeText={(value) => setDetails(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>
      <Checkbox
      disabled
      value={finished}
      onValueChange={(newValue) => setFinished(newValue)}
      />
      <Button style={styles.button} title="Upravit" onPress={editForm}/>
    </View>
  )
}

function FormsScreen({route, navigation}) {
  const token = route.params.token
  return (
    <Stack.Navigator> 
        <Stack.Screen name="FormList" options={{ headerShown: false }} component={FormsList} initialParams={{"token": route.params.token}} />
        <Stack.Screen name="FormDetail" component={FormDetail} initialParams={{"token": route.params.token,"shelter":route.params.shelter}} />
        <Stack.Screen name="UpdateForm" component={UpdateForm} initialParams={{"token": route.params.token, "shelter":route.params.shelter}} />
    </Stack.Navigator>
)
}
export default FormsScreen