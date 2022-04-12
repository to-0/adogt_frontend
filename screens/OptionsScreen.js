import * as React from 'react';
import { useEffect, useCallback } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions,KeyboardAvoidingView} from 'react-native';
import styles from '../styles'
import {Globals} from '../Globals'

function OptionsScreen({route, navigation}) {
    //toto su tie hodnoty, username je hodnota a setusername je ako keby metoda kde nastavime tu hodnotu, nieco ako premenna a su to nejake hooks... nvm 
    // proste to je hook na state lebo to ma nejaky stav a potom ked sa zmeni stav tak sa to znova vyrenderuje
    const [remote_host, setRemote] = React.useState(Globals.host)
    const [finalHost, setFinal] = React.useState(Globals.host)
    return (
    <KeyboardAvoidingView style={styles.center_view}>
    <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.23}]}>
      {finalHost}
    </Text>
    <TextInput placeholder='Backend IP' onChangeText={(value) => setRemote(value)} style={[styles.form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>

    <TouchableOpacity style={styles.button} onPress={()=>{
        setFinal(remote_host)
        Globals.host = remote_host;
    }}>
        <Text style={styles.button_text}>Zmeniť IP</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>


    );
  }
  export default OptionsScreen;