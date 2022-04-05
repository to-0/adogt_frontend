import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';

function RegisterScreen({route,navigation}){
  console.log(route.params);
  return (
    <View>
      <Text>Register</Text>
    </View>
  )
}
export default RegisterScreen;