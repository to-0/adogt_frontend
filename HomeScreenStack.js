import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {HOST} from './App.js';
import HomeScreen from './screens/HomeScreen';
import DogDetailScreen from './screens/DogDetailScreen';
import DetailsScreen from './screens/DetailsScreen';
import WalkFormScreen from './screens/WalkFormScreen';
import AdoptFormScreen from './screens/AdoptFormScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen({route, navigation}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Prehľad psov" component={HomeScreen} initialParams={{token: token, shelter: shelter}}/>
      <HomeStack.Screen name="Detail psa" component={DogDetailScreen} />
      <HomeStack.Screen name="Detailné informácie" component={DetailsScreen} />
      <HomeStack.Screen name="Formulár na venčenie" component={WalkFormScreen} />
      <HomeStack.Screen name="Adopčný formulár" component={AdoptFormScreen} />
    </HomeStack.Navigator>
  );
}
export default HomeStackScreen;