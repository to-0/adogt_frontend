import * as React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles'
import {Globals} from '../Globals'

function DetailsScreen({route}){
    const token = route.params.token;
    const dog_id = route.params.id;
    const [details, setDetails] = React.useState([{}]);
    const [year_format, setYearFormat] = React.useState('');

    React.useEffect(()=>{
        fetch(`http://${Globals.host}:8000/dogs/getDog?token=${token}&dog_id=${dog_id}`, {
          method: 'get',
          headers: {
          'Accept': 'application/json, text/plain, */*', 
          'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((json) => {
            setDetails(json);

            if (json.age == 1)
                setYearFormat('rok');
            else if (json.age < 5)
                setYearFormat('roky');
            else
                setYearFormat('rokov');
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
                <Text style={[styles.detail_text, {fontSize: 18}]}>{details.age} {year_format}</Text>
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