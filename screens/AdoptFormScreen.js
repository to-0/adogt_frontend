import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';

function AdoptFormScreen({route,navigation}){
  console.log(route.params);
  return (
    <View>
      <Text>Adopt form screen</Text>
    </View>
  )
}
export default AdoptFormScreen;