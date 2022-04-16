import * as React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import styles from '../styles';
import {Globals} from '../Globals';

function HomeScreen({route, navigation}){
  const token = route.params.token;
  const shelter = route.params.shelter;
  const [dogs, setDogs] = React.useState([{}]);
  const [refreshing,setRefreshing] = React.useState(false);
  //Zdroj obrazka: https://wdrfree.com/stock-vector/lazy-dog
  var default_dog_image = require('../img/lazyDog.jpg');

  const get_dogs = () => {
    setRefreshing(true);
    fetch(`http://${Globals.host}:8000/dogs/getAll?token=${token}`, {
      method: 'GET',
      headers: {
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      var temp = [];
      for(var i=0;i<json.length;i++)
        temp.push(json[i]);
      
      setDogs(temp);
      setRefreshing(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  //https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad 
  React.useEffect(()=>{
    get_dogs();
  }, []);
    
  const renderItem = ({ item })=> (
    <TouchableWithoutFeedback onPress={()=> navigation.navigate('Detail psa', {"token": token, "shelter": shelter, "dog": item})}>
      <ScrollView>
        <Image style={styles.item_image} source={item.data == '' ? default_dog_image: {uri: `data:${item.image_type};base64,${item.data}`}} />
        
        <View style={styles.item}>
  
          <View style={{flex: 3}}>
            <Text style={styles.item_title}>{item.name}</Text>
            
            {item.age == 1 ? (
              <>
                <Text style={styles.item_text} on>Vek: {item.age} rok</Text>
              </>
            ):(
              <>
                {item.age < 5 ? (
                  <>
                   <Text style={styles.item_text} on>Vek: {item.age} roky</Text>
                  </>
                ):(
                  <>
                   <Text style={styles.item_text} on>Vek: {item.age} rokov</Text>
                  </>
                )}
              </>
            )}

            <Text style={styles.item_text}>Plemeno: {item.breed}</Text>
          </View>
  
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=> navigation.navigate('Detail psa', {"token": token, "shelter": shelter, "dog": item})}>
              <View pointerEvents="none">
                <Image value={item.id} style={styles.icon} source={require('../img/informationIcon.png')} />
              </View>
            </TouchableOpacity>
          </View>
  
        </View>             
      </ScrollView> 
    </TouchableWithoutFeedback>
    );

    return (
      <View>
        <FlatList
          data={dogs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={get_dogs}
          refreshing={refreshing} 
          />
      </View>
    );
  }

  export default HomeScreen;