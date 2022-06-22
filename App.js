import * as React from 'react';
// import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './screens'
import { NewPage } from './screens/NewPage';
import { EditPage } from './screens/EditPage';

import {firebaseConfig} from "./Core/config"

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modall from './componants/modal';

const Stack = createNativeStackNavigator();


export default function App() {
  //const firebase = initializeApp(firebaseConfig)
  //const db = getFirestore(firebase)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewPage" component={NewPage} />
        <Stack.Screen name="EditPage" component={EditPage} />
        <Stack.Screen name="Modall" component={Modall} />
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}


