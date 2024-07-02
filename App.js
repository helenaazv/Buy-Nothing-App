import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import PostItemScreen from './components/PostItemScreen';
import ViewItemsScreen from './components/ViewItemsScreen';
import MessagesScreen from './components/MessagesScreen';
import ChatScreen from './components/ChatScreen'; 
import { AuthProvider } from './components/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Post Item" component={PostItemScreen} />
          <Stack.Screen name="View Items" component={ViewItemsScreen} />
          <Stack.Screen name="Messages Screen" component={MessagesScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}


