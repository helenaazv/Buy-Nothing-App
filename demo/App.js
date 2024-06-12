import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import PostItemScreen from './components/PostItemScreen';
import ViewItemsScreen from './components/ViewItemsScreen';
import MessagesScreen from './components/MessagesScreen';
import AboutScreen from './components/AboutScreen';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post Item" component={PostItemScreen} />
        <Stack.Screen name="View Items" component={ViewItemsScreen} />
        <Stack.Screen name="Messages Screen" component={MessagesScreen} />
        <Stack.Screen name="About" component={AboutScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
