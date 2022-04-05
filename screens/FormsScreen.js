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
        <TouchableOpacity onPress={()=>{navigation.navigate('Detail formulára',{data:item})}}>
          <View>
            <View style={styles.item}>
              <View style={{flex: 3}}>
              
                <Text style={styles.item_title}>Formulár č.{item.id}</Text>
              
                <Text style={styles.item_text}>Vytvorenie: {item.created_at.substring(8,10)}.{item.created_at.substring(5,7)}.{item.created_at.substring(0, 4)}</Text>
              </View>
              
              <View style={{flex: 1}}>
                <Image value={item.id} style={styles.icon} source={require('../img/informationIcon.png')} />
              </View>
      
            </View>             
          </View> 
        </TouchableOpacity>
        
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

export default FormsList;
