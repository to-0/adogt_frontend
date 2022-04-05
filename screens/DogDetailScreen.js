import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles'
const HOST = '192.168.0.124'

function DogDetailScreen({route,navigation}){
    const dog = route.params.dog;
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

    const button_walk = () => {
        navigation.navigate('Formulár na venčenie', {token: route.params.token, id: dog.id})
    };

    const button_adopt = () => {
        navigation.navigate('Adopčný formulár', {token: route.params.token, id: dog.id})
    };

    return (
        <View>
            <Image style={styles.item_image} source={dog.data == '' ? dog_images[dog.id]: {uri: `data:${dog.image_type};base64,${dog.data}`}} />
  
            <View>
  
                <View style={styles.dog_detail}>
                    <Text style={[styles.item_title, {marginBottom: 20}]}>{dog.name}</Text>
                    <Text style={styles.item_text}>Vek: {dog.age} roky</Text>
                    <Text style={[styles.item_text, {marginBottom: 10}]}>Plemeno: {dog.breed}</Text>

                    <TouchableOpacity onPress={()=> navigation.navigate('Detailné informácie', {token: route.params.token, id: dog.id})}>
                        <View>
                            <Text style={[styles.link, {textAlign: 'center'}]}>Ďalšie informácie</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.dog_detail_buttons}>
                        <View style={styles.dog_button}>
                            <Button title="Venčenie" onPress={button_walk} color='#f76226'/>
                        </View>
                        <View style={styles.dog_button}>
                            <Button title="Adopcia" onPress={button_adopt} color='#f76226'/>
                        </View>
                    </View>
                </View>

            </View>
  
        </View>             
    )
}
export default DogDetailScreen;