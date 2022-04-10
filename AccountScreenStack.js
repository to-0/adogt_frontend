import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from './screens/AccountScreen.js';
import AddDogScreen from './screens/AddDogScreen.js';
import RoomJoinScreen from './screens/RoomJoinScreen.js';
import RoomCreateScreen from './screens/RoomCreateScreen.js';

const AccountStack = createNativeStackNavigator();
function AccountStackScreen({route}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  const email = route.params.email;
  const username = route.params.username;

  return (
    <AccountStack.Navigator> 
        <AccountStack.Screen name="Profil používateľa" component={AccountScreen}
            initialParams={{setToken: route.params.setToken, "token": token, "shelter": shelter, "email": email, "username": username}}
              />
        <AccountStack.Screen name="Pridať psa" component={AddDogScreen}
            initialParams={{setToken: route.params.setToken, "token": token, "shelter": shelter, "email": email, "username": username}} />
        <AccountStack.Screen name='Join' component={RoomJoinScreen}
          initialParams={{setToken: route.params.setToken, "token": token, "shelter": shelter, "email": email, "username": username}} />
        <AccountStack.Screen name='Create' component={RoomCreateScreen}
          initialParams={{setToken: route.params.setToken, "token": token, "shelter": shelter, "email": email, "username": username}} />
    </AccountStack.Navigator>
  )
}
export default AccountStackScreen;