import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FormsScreen from './screens/FormsScreen';
import FormDetailScreen from './screens/FormDetailScreen';
import FormUpdateScreen from './screens/FormUpdateScreen';

const FormStack = createNativeStackNavigator();
function FormStackScreen({route}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  const data = route.params.item;

  return (
    <FormStack.Navigator> 
        <FormStack.Screen name="Prehľad formulárov" component={FormsScreen} initialParams={{"token": token, "shelter": shelter}} />
        <FormStack.Screen name="Detail formulára" component={FormDetailScreen} initialParams={{"token": token,"shelter": shelter, "data": data}} />
        <FormStack.Screen name="Úprava formulára" component={FormUpdateScreen} initialParams={{"token": token, "shelter": shelter}} />
    </FormStack.Navigator>
  )
}
export default FormStackScreen;