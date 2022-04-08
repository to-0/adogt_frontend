import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles'
import {HOST} from '../App.js';

function DogDetailScreen({route,navigation}){
    console.log(route.params.shelter);
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

    const button_edit = () => {
        navigation.navigate('Upravenie psa', {token: route.params.token, id: dog.id})
    };

    return (
        <View>
            <Image style={styles.item_image} source={dog.data == '' ? dog_images[dog.id]: {uri: `data:${dog.image_type};base64,${dog.data}`}} />
  
            <View>
  
                <View style={styles.dog_detail}>
                    <Text style={[styles.item_title, {marginBottom: 20}]}>{dog.name}</Text>
                    <Text style={styles.item_text}>Vek: {dog.age} roky</Text>
                    <Text style={[styles.item_text, {marginBottom: 20}]}>Plemeno: {dog.breed}</Text>

                    <TouchableOpacity onPress={()=> navigation.navigate('Detailné informácie', {token: route.params.token, id: dog.id})}>
                        <Text style={[styles.link, {textAlign: 'center'}]}>Ďalšie informácie</Text>
                    </TouchableOpacity>

                    {route.params.shelter == false ? (
                        <>
                        <View style={styles.dog_detail_buttons}>
                            <TouchableOpacity style={styles.dog_button} onPress={button_walk}>
                                <Text style={styles.button_text}>Venčenie</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.dog_button} onPress={button_adopt}>
                                <Text style={styles.button_text}>Adopcia</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    ):(
                        <>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity style={styles.button} onPress={button_edit}>
                                <Text style={styles.button_text}>Úprava psa</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    )}
                </View>

            </View>
  
        </View>             
    )
}
export default DogDetailScreen;