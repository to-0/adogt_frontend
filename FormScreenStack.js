import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import {HOST} from './App.js';
import FormsList from './screens/FormsScreen';
import FormDetailScreen from './screens/FormDetailScreen';
import FormUpdateScreen from './screens/FormUpdateScreen';

const FormStack = createNativeStackNavigator();
function FormStackScreen({route, navigation}) {
  const token = route.params.token
  return (
    <FormStack.Navigator> 
        <FormStack.Screen name="List formulárov" component={FormsList} initialParams={{"token": route.params.token}} />
        <FormStack.Screen name="Detail formulára" component={FormDetailScreen} initialParams={{"token": route.params.token,"shelter":route.params.shelter}} />
        <FormStack.Screen name="Úprava formulára" component={FormUpdateScreen} initialParams={{"token": route.params.token, "shelter":route.params.shelter}} />
    </FormStack.Navigator>
  )
}
export default FormStackScreen;