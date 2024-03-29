import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../styles';

function DogDetailScreen({route,navigation}){
    const token = route.params.token;
    const dog = route.params.dog;
    //Zdroj obrazka: https://wdrfree.com/stock-vector/lazy-dog
    var default_dog_image = require('../img/lazyDog.jpg');

    var year_format = '';
    if (dog.age == 1)
      year_format = 'rok';
    else if (dog.age < 5)
      year_format = 'roky';
    else
      year_format = 'rokov';

    return (
        <View>
            <Image style={styles.item_image} source={dog.data == '' ? default_dog_image: {uri: `data:${dog.image_type};base64,${dog.data}`}} />
  
            <View>
                <View style={styles.dog_detail}>
                    <Text style={[styles.item_title, {marginBottom: 20}]}>{dog.name}</Text>
                    <Text style={styles.item_text}>Vek: {dog.age} {year_format}</Text>
                    <Text style={[styles.item_text, {marginBottom: 20}]}>Plemeno: {dog.breed}</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Detailné informácie', {"token": token, "id": dog.id})}>
                        <Text style={[styles.link, {textAlign: 'center'}]}>Ďalšie informácie</Text>
                    </TouchableOpacity>

                    {route.params.shelter == false ? (
                        <>
                        <View style={styles.side_buttons_view}>
                            <TouchableOpacity style={styles.side_button} onPress={() => navigation.navigate('Formulár na venčenie', {"token": token, "id": dog.id})}>
                                <Text style={styles.button_text}>Venčenie</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.side_button} onPress={() => navigation.navigate('Adopčný formulár', {"token": token, "id": dog.id})}>
                                <Text style={styles.button_text}>Adopcia</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    ):(
                        <>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upravenie psa', {"token": token, "id": dog.id})}>
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