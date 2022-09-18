import React from 'react';
import Scanner from './screens/scanner';
import ScanList from './screens/scan-list';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          orientation: 'portrait',
        })}>
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="ScanList" component={ScanList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
