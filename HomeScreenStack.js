import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import DogDetailScreen from './screens/DogDetailScreen';
import DetailsScreen from './screens/DetailsScreen';
import WalkFormScreen from './screens/WalkFormScreen';
import AdoptFormScreen from './screens/AdoptFormScreen';
import EditDogScreen from './screens/EditDogScreen.js';

import {HOST} from './App.js';

const HomeStack = createStackNavigator();

function HomeStackScreen({route}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  const dog = route.params.dog;
  const dog_id = route.params.id;

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Prehľad psov" component={HomeScreen} initialParams={{"token": token, "shelter": shelter}} />
      <HomeStack.Screen name="Detail psa" component={DogDetailScreen} initialParams={{"token": token, "dog": dog}} />
      <HomeStack.Screen name="Detailné informácie" component={DetailsScreen} initialParams={{"token": token, "dog": dog}} />
      <HomeStack.Screen name="Formulár na venčenie" component={WalkFormScreen} initialParams={{"token": token, "id": dog_id}} />
      <HomeStack.Screen name="Adopčný formulár" component={AdoptFormScreen} initialParams={{"token": token, "id": dog_id}} />
      <HomeStack.Screen name="Upravenie psa" component={EditDogScreen} initialParams={{"token": token, "id": dog_id}} />
    </HomeStack.Navigator>
  );
}
export default HomeStackScreen;