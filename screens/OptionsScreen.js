import * as React from 'react';
import { useEffect, useCallback } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';
import {change_host} from '../App.js'

function OptionsScreen({route, navigation}) {
    //toto su tie hodnoty, username je hodnota a setusername je ako keby metoda kde nastavime tu hodnotu, nieco ako premenna a su to nejake hooks... nvm 
    // proste to je hook na state lebo to ma nejaky stav a potom ked sa zmeni stav tak sa to znova vyrenderuje
    const [remote_host, setRemote] = React.useState(HOST)
    const [finalHost, setFinal] = React.useState(HOST)
    return (
    <View styles={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.title}>{finalHost}</Text>
        <TextInput onChangeText={(value)=> setRemote(value)} styles={{backgroundColor: 'white'}}/>
        <TouchableOpacity style={styles.button} onPress={()=> {
            setFinal(remote_host);
            change_host(remote_host);}
            }>
            <Text style={styles.button_text}>
                Zmeniť IP adresu servera
            </Text>
        </TouchableOpacity>
    </View>
    );
  }
  export default OptionsScreen;