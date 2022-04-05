import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import {HOST} from '../App.js';
import { useFocusEffect } from '@react-navigation/native';

function FormDetailScreen ({route, navigation}){
    const data = route.params.data;
    const token = route.params.token;
    const [details, setDetails]= React.useState('');
    const [finished, setFinished] = React.useState(false);
    const [dog_name, setDogName] = React.useState(undefined)
    
    useFocusEffect(
        React.useCallback(() => {
          getDog();
        }, [])
    );

    const delete_form = ()=> {
      console.log(token, data.id)
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

    const getDog = () => {
        fetch(`http://${HOST}:8000/dogs/getDog?token=${token}&dog_id=${data.dog_id}`,{
            method: 'get'
        })
        .then((response)=>response.json())
        .then((json)=>{
            setDogName(json.name);
        })
        .catch((error)=>{
            alert(error);
        })
    }
    return (
      <ImageBackground source={require('../img/doggo.jpg')} resizeMode="cover" style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.85}}>
        <View style={styles.form_detail}>
          {data.type == 1 ? (
              <>
              <Text style={[styles.title, {fontSize: 32}]}>Adopčný formulár</Text>
              </>
          ):(
              <>
              <Text style={[styles.title, {fontSize: 32}]}>Formulár na venčenie</Text>
              </>
          )}
          
          <View style={styles.form_info_detail}>
              <Text style={styles.detail_info}>Pes:</Text>
              <Text style={styles.detail_text}>{dog_name}</Text>
          </View>

          <View style={styles.form_info_detail}>
              <Text style={styles.detail_info}>Dátum vytvorenia:</Text>
              <Text style={styles.detail_text}>{data.created_at.substring(8,10)}.{data.created_at.substring(5,7)}.{data.created_at.substring(0, 4)}</Text>
          </View>

          <View style={styles.form_info_detail}>
              <Text style={styles.detail_info}>Stav ukončenia:</Text>
              {finished == true ? (
                  <>
                  <Text style={[styles.form_finished, {color: 'green'}]}>ukončené</Text>
                  </>
              ):(
                  <>
                  <Text style={[styles.form_finished, {color: 'red'}]}>neukončené</Text>
                  </>
              )}
          </View>
          
          <View style={[styles.form_info_detail, {flexDirection: 'column'}]}>
              <Text style={styles.detail_info}>Detaily:</Text>
              <Text style={styles.detail_text}>{details}</Text>
          </View>
          
          <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
          {route.params.shelter == false ? (
              <>
              <View style={styles.button}>
                <Button title="Upraviť formulár" onPress={() => navigation.navigate('Úprava formulára',{"form_id":data.id})} color='#f76226'/>
              </View>
              </>
            )
            : (<></>)
          }
          <View style={[styles.button, {marginTop: 0}]}>
              <Button title="Vymazať formulár" onPress={delete_form} color='#f76226'/>
          </View>
          </View>
          
        </View>
      </ImageBackground>
    )
  }

export default FormDetailScreen;
  