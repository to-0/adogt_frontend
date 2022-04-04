import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles'
const HOST = '192.168.1.14'
function FormsScreen({route, navigation}) {
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
          //console.log(json)
          var temp = []
          for(var i=0;i<json.length;i++){
            temp.push(json[i]);
          }
          //console.log("Temp",temp)
          setForms(temp);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])
      const renderItem = ({ item })=> (
        <View>
          <View style={styles.item}>
            <View style={{flex: 3}}>
              <Text style={styles.item_title}>ID: {item.id}</Text>
              <Text style={styles.item_text}>Cas: {item.created_at}</Text>
            </View>
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
export default FormsScreen