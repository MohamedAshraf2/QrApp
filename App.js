import * as React from 'react';
// import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './screens'
import { NewPage } from './screens/NewPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewPage" component={NewPage} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}