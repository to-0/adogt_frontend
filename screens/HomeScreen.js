import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
import styles from '../styles'
const HOST = '192.168.1.18'

function HomeScreen({route, navigation}){
    var initialVal = [{id: 0, name:'nic'}]
    const [dogs, setDogs] = React.useState(initialVal)
    var dog_images = {
      1: require('../img/baset.jpg'),
      2: require('../img/bigl.jpg'),
      3: require('../img/dobermann.jpg'),
      4: require('../img/jackRussel.jpg'),
      5: require('../img/vlciak.jpg'),
      6: require('../img/jazvecik.jpg'),
      7: require('../img/bulldog.jpg'),
      8: require('../img/mops.jpg'),
      9: require('../img/doga.jpg'),
      10: require('../img/labrador.jpg')
    };
    const info_click = (dog_id) => {
      alert(dog_id);
      console.log(dog_id)
      // fetch(`http://${HOST}:8000/dogs/getDog?token=${token}&dog_id=${dog_id}`)
      // .then((response) => response.json())
      // .then((json) => {

      // })
    }
    //https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad 
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
        //console.log(json)
        var temp = []
        for(var i=0;i<json.length;i++){
          temp.push(json[i]);
        }
        //console.log("Temp",temp)
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
          <Image onPress={()=> console.log('cau',item.id)} style={styles.item_image} source={item.data == '' ? dog_images[item.id]: {uri: `data:${item.image_type};base64,${item.data}`}} />
  
        <View style={styles.item}>
  
          <View style={{flex: 3}}>
            <Text style={styles.item_title}>{item.name}</Text>
            <Text style={styles.item_text}>Vek: {item.age} roky</Text>
            <Text style={styles.item_text}>Plemeno: {item.breed}</Text>
          </View>
  
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={()=> info_click(item_id)}>
            <Image value={item.id} style={styles.icon} source={require('../img/informationIcon.png')} />
            </TouchableWithoutFeedback>
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
  export default HomeScreen