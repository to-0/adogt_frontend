import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FormsListScreen from './screens/FormsScreen';
import FormDetailScreen from './screens/FormDetailScreen';
import FormUpdateScreen from './screens/FormUpdateScreen';

const FormStack = createNativeStackNavigator();
function FormStackScreen({route}) {
  const token = route.params.token;
  const shelter = route.params.shelter;
  const id = route.params.id;
  const setFormId = route.params.setFormId;

  return (
    <FormStack.Navigator> 
        <FormStack.Screen name="Prehľad formulárov" component={FormsListScreen} initialParams={{"token": token, "shelter": shelter, "id": id, "setFormId": setFormId}} />
        <FormStack.Screen name="Detail formulára" component={FormDetailScreen} initialParams={{"token": token,"shelter": shelter, "setFormId": setFormId}} />
        <FormStack.Screen name="Úprava formulára" component={FormUpdateScreen} initialParams={{"token": token, "shelter": shelter}} />
    </FormStack.Navigator>
  )
}
export default FormStackScreen;