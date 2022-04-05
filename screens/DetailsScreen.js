import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles'
import {HOST} from '../App.js';

function DetailsScreen({route,navigation}){
    var initialVal = [{id: 0, name:'nic'}]
    const [details, setDetails] = React.useState(initialVal)

    React.useEffect(()=>{
        const token = route.params.token;
        const dog_id = route.params.id;
        
        fetch(`http://${HOST}:8000/dogs/getDog?token=${token}&dog_id=${dog_id}`, {
          method: 'get',
          headers: {
          'Accept': 'application/json, text/plain, */*', 
          'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((json) => {
            setDetails(json);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])

    return (
        <View style={styles.dog_detail}>
            <View style={styles.detail}>
                <Text style={styles.detail_info}>Meno:</Text>
                <Text style={[styles.detail_text, {fontSize: 18}]}>{details.name}</Text>
            </View>
            
            <View style={styles.detail}>
                <Text style={styles.detail_info}>Vek:</Text>
                <Text style={[styles.detail_text, {fontSize: 18}]}>{details.age}</Text>
            </View>

            <View style={styles.detail}>
                <Text style={styles.detail_info}>Plemeno:</Text>
                <Text style={styles.detail_text}>{details.breed}</Text>
            </View>

            <View style={styles.detail}>
                <Text style={styles.detail_info}>Zdravotný stav:</Text>
                <Text style={styles.detail_text}>{details.health}</Text>
            </View>

            <View style={styles.detail}>
                <Text style={styles.detail_info}>Ďalšie informácie:</Text>
                <Text style={styles.detail_text}>{details.details}</Text>
            </View>
            
        </View>            
    );
}
export default DetailsScreen;