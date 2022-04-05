import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import styles from '../styles'
import {HOST} from '../App.js';

function WalkFormScreen({route,navigation}){
  console.log(route.params);
  return (
    <View>
      <Text>Walk form screen</Text>
    </View>
  )
}
export default WalkFormScreen;