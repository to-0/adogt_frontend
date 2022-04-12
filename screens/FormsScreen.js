import * as React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import styles from '../styles'
import {HOST} from '../App.js';

function FormsScreen({route, navigation}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  const form_id = route.params.id;
  const [forms,setForms] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      
    }, [])
  );
  const get_forms = () => {
    setRefreshing(true);
    fetch(`http://${HOST}:8000/forms/getAll?token=${token}`, {
      method: 'GET',
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
      setRefreshing(false);
    })
    .catch((error) => {
      console.error(error);
      setRefreshing(false);
    });
  }
  React.useEffect(()=>{
    get_forms();
  }, []);

  const renderItem = ({ item })=> (
    <TouchableOpacity onPress={()=>{navigation.navigate('Detail formulára',{token: token, shelter:shelter, data:item})}}>
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
        onRefresh={get_forms}
        refreshing={refreshing} 
      />
    </View>
  )
}

export default FormsScreen;
